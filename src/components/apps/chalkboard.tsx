"use client";

import { useState, useRef, useEffect } from "react";

type BoardType = "white" | "black" | "green";
type BoardStyle = {
  bg: string;
  border: string;
  text: string;
  defaultColor: string;
};

type SavedBoard = {
  id: string;
  name: string;
  dataUrl: string;
  date: string;
  boardType: BoardType;
};

export default function ChalkboardModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const boardStyles = {
    white: {
      bg: "bg-white",
      border: "border-gray-300",
      text: "text-gray-800",
      defaultColor: "#000000",
    },
    black: {
      bg: "bg-slate-900",
      border: "border-orange-200",
      text: "text-orange-200",
      defaultColor: "#FFFFFF",
    },
    green: {
      bg: "bg-green-900",
      border: "border-amber-950",
      text: "text-white",
      defaultColor: "#FFFFFF",
    },
  };

  const [drawing, setDrawing] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(10);
  const [boardType, setBoardType] = useState<BoardType>("white");
  const [showBoardOptions, setShowBoardOptions] = useState(false);
  const [useChalkEffect, setUseChalkEffect] = useState(false);
  const [color, setColor] = useState(boardStyles.white.defaultColor);
  const [savedBoards, setSavedBoards] = useState<SavedBoard[]>([]);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showReplaceWarning, setShowReplaceWarning] = useState(false);
  const [boardToLoad, setBoardToLoad] = useState<SavedBoard | null>(null);
  const [drawHistory, setDrawHistory] = useState<string[]>([]);
  const [undoActive, setUndoActive] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardOptionsRef = useRef<HTMLDivElement>(null);
  const saveModalRef = useRef<HTMLDivElement>(null);
  const storageModalRef = useRef<HTMLDivElement>(null);
  const clearModalRef = useRef<HTMLDivElement>(null);
  const replaceWarningRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const newBoardNameInputRef = useRef<HTMLInputElement>(null);
  const undoButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("savedBoards");
    if (saved) setSavedBoards(JSON.parse(saved));
  }, []);

  useEffect(() => {
    setColor(boardStyles[boardType].defaultColor);
  }, [boardType]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgColor =
      boardType === "white"
        ? "#ffffff"
        : boardType === "black"
        ? "#1a1a1a"
        : "#1a3a1a";
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const savedDrawing = localStorage.getItem(`chalkboardDrawing-${boardType}`);
    if (savedDrawing) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        setDrawHistory([canvas.toDataURL()]);
      };
      img.src = savedDrawing;
    } else {
      setDrawHistory([canvas.toDataURL()]);
    }
  }, [isOpen, boardType, brushSize, color]);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const cursorColor = boardType === "white" ? "black" : "white";
    const cursorSVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${
      eraserSize * 2
    }' height='${eraserSize * 2}' viewBox='0 0 ${eraserSize * 2} ${
      eraserSize * 2
    }'><circle cx='${eraserSize}' cy='${eraserSize}' r='${eraserSize}' fill='${cursorColor}' stroke='${
      cursorColor === "white" ? "black" : "white"
    }' stroke-width='1'/></svg>") ${eraserSize} ${eraserSize}, auto`;
    canvasRef.current.style.cursor = erasing
      ? cursorSVG
      : "url('/chalk-cursor.png') 0 24, auto";
  }, [isOpen, erasing, eraserSize, boardType]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen) return;
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        onClose();
      if (
        boardOptionsRef.current &&
        !boardOptionsRef.current.contains(e.target as Node)
      )
        setShowBoardOptions(false);
      if (
        saveModalRef.current &&
        !saveModalRef.current.contains(e.target as Node)
      )
        setShowSaveModal(false);
      if (
        storageModalRef.current &&
        !storageModalRef.current.contains(e.target as Node)
      )
        setShowStorageModal(false);
      if (
        clearModalRef.current &&
        !clearModalRef.current.contains(e.target as Node)
      )
        setShowClearModal(false);
      if (
        replaceWarningRef.current &&
        !replaceWarningRef.current.contains(e.target as Node)
      )
        setShowReplaceWarning(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        setShowSaveModal(true);
        setTimeout(() => newBoardNameInputRef.current?.focus(), 0);
      } else if (e.ctrlKey && e.key === "g") {
        e.preventDefault();
        setUseChalkEffect(!useChalkEffect);
      } else if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        setErasing(!erasing);
      } else if (e.key === "Delete") {
        e.preventDefault();
        setShowClearModal(true);
      } else if (e.ctrlKey && e.key === "q") {
        e.preventDefault();
        setShowBoardOptions(!showBoardOptions);
      } else if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        if (undoButtonRef.current && drawHistory.length > 1) {
          undoButtonRef.current.click();
          setUndoActive(true);
          setTimeout(() => setUndoActive(false), 200);
        }
      } else if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        setShowStorageModal(!showStorageModal);
      } else if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        e.preventDefault();
        const change = e.key === "ArrowUp" || e.key === "ArrowRight" ? 1 : -1;
        if (erasing) {
          setEraserSize((prev) => Math.max(1, Math.min(20, prev + change)));
        } else {
          setBrushSize((prev) => Math.max(1, Math.min(20, prev + change)));
        }
      } else if (e.key === "Enter" && showSaveModal && newBoardName.trim()) {
        e.preventDefault();
        saveCurrentBoard();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    useChalkEffect,
    erasing,
    showSaveModal,
    newBoardName,
    showBoardOptions,
    showStorageModal,
    drawHistory,
  ]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDrawHistory((prev) => [...prev, canvas.toDataURL()]);
  };

  const undoLastAction = () => {
    if (drawHistory.length <= 1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newHistory = [...drawHistory];
    newHistory.pop();
    setDrawHistory(newHistory);

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      localStorage.setItem(
        `chalkboardDrawing-${boardType}`,
        canvas.toDataURL()
      );
    };
    img.src = newHistory[newHistory.length - 1];
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setDrawing(true);
    saveToHistory();

    if (erasing) {
      eraseAtPosition(x, y);
    } else if (useChalkEffect) {
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (erasing) {
      eraseAtPosition(x, y);
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      if (useChalkEffect) {
        const density = Math.max(1, Math.floor(brushSize / 2));
        for (let i = 0; i < density; i++) {
          const offsetX = (Math.random() - 0.5) * (brushSize / 2);
          const offsetY = (Math.random() - 0.5) * (brushSize / 2);
          const radius = (Math.random() * brushSize) / 4 + brushSize / 4;
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const eraseAtPosition = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgColor =
      boardType === "white"
        ? "#ffffff"
        : boardType === "black"
        ? "#1a1a1a"
        : "#1a3a1a";
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, eraserSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  const stopDrawing = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.closePath();
    setDrawing(false);
    localStorage.setItem(
      `chalkboardDrawing-${boardType}`,
      canvasRef.current.toDataURL()
    );
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const bgColor =
      boardType === "white"
        ? "#ffffff"
        : boardType === "black"
        ? "#1a1a1a"
        : "#1a3a1a";
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    localStorage.removeItem(`chalkboardDrawing-${boardType}`);
    setShowClearModal(false);
    setDrawHistory([canvasRef.current.toDataURL()]);
  };

  const changeBoardType = (type: BoardType) => {
    setBoardType(type);
    setShowBoardOptions(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setDrawHistory([canvas.toDataURL()]);
    }
  };

  const saveCurrentBoard = () => {
    if (!canvasRef.current || !newBoardName.trim()) return;

    const newBoard = {
      id: Date.now().toString(),
      name: newBoardName,
      dataUrl: canvasRef.current.toDataURL(),
      date: new Date().toLocaleString(),
      boardType: boardType,
    };

    const updatedBoards = [...savedBoards, newBoard];
    setSavedBoards(updatedBoards);
    localStorage.setItem("savedBoards", JSON.stringify(updatedBoards));
    setShowSaveModal(false);
    setNewBoardName("");
  };

  const confirmLoadBoard = (board: SavedBoard) => {
    if (board.boardType === boardType) {
      setBoardToLoad(board);
      setShowReplaceWarning(true);
    } else {
      loadBoard(board);
    }
  };

  const loadBoard = (board: SavedBoard) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setBoardType(board.boardType);
    setColor(boardStyles[board.boardType].defaultColor);

    const bgColor =
      board.boardType === "white"
        ? "#ffffff"
        : board.boardType === "black"
        ? "#1a1a1a"
        : "#1a3a1a";
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      localStorage.setItem(
        `chalkboardDrawing-${board.boardType}`,
        board.dataUrl
      );
      setDrawHistory([canvas.toDataURL()]);
    };
    img.src = board.dataUrl;

    setShowStorageModal(false);
    setShowReplaceWarning(false);
  };

  const deleteSavedBoard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedBoards = savedBoards.filter((board) => board.id !== id);
    setSavedBoards(updatedBoards);
    localStorage.setItem("savedBoards", JSON.stringify(updatedBoards));
  };

  const filteredBoards = savedBoards.filter((board) =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBoardTypeName = (type: BoardType) => {
    switch (type) {
      case "white":
        return "Quadro Branco";
      case "black":
        return "Quadro Preto";
      case "green":
        return "Quadro Negro";
      default:
        return "";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="backdrop-blur-sm shadow-2xl bg-white/80 border-3 border-b-7 border-blue-500/20 p-6 rounded-2xl w-[90%] h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium flex gap-1 justify-center items-center">
                <i className="las la-marker text-2xl"></i> Cor:
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium flex gap-1 justify-center items-center">
                <i className="las la-arrows-alt-h text-2xl"></i>
                {erasing ? "Borracha:" : "Espessura:"}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={erasing ? eraserSize : brushSize}
                onChange={(e) =>
                  erasing
                    ? setEraserSize(parseInt(e.target.value))
                    : setBrushSize(parseInt(e.target.value))
                }
                className="w-24"
              />
              <span className="text-sm">
                {erasing ? eraserSize : brushSize}px
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium flex gap-1 items-center justify-center">
                <i className="las la-pen-square text-2xl"></i>Giz:
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useChalkEffect}
                  onChange={() => setUseChalkEffect(!useChalkEffect)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium flex gap-1 items-center justify-center">
                <i className="las la-eraser text-2xl"></i>Borracha:
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={erasing}
                  onChange={() => setErasing(!erasing)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                ref={undoButtonRef}
                onClick={undoLastAction}
                disabled={drawHistory.length <= 1}
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  drawHistory.length <= 1
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-purple-500 text-purple-500 hover:bg-purple-100"
                } ${undoActive ? "bg-purple-200" : ""}`}
              >
                <i className="las la-undo"></i>
              </button>
            </div>

            <div className="relative ml-auto" ref={boardOptionsRef}>
              <button
                onClick={() => setShowBoardOptions(!showBoardOptions)}
                className={`px-4 py-2 rounded-2xl font-medium flex items-center gap-2 border-b-4 border-r-4 border-2 ${boardStyles[boardType].border} ${boardStyles[boardType].bg} ${boardStyles[boardType].text}`}
              >
                {boardType === "white" && "Quadro Branco"}
                {boardType === "black" && "Quadro Preto"}
                {boardType === "green" && "Quadro Negro"}
                <i
                  className={`las la-angle-down transition-transform ${
                    showBoardOptions ? "rotate-180" : ""
                  }`}
                ></i>
              </button>

              {showBoardOptions && (
                <div className="absolute top-full left-0 mt-2 w-full backdrop-blur-sm shadow-2xl bg-white/80 border-3 border-b-7 border-blue-500/20 rounded-2xl z-20 overflow-hidden animate-fadeIn">
                  <button
                    onClick={() => changeBoardType("white")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 border-b border-gray-200"
                  >
                    <div className="w-4 h-4 bg-white border border-gray-300 rounded-sm"></div>
                    Quadro Branco
                  </button>
                  <button
                    onClick={() => changeBoardType("black")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 border-b border-gray-200"
                  >
                    <div className="w-4 h-4 bg-slate-900 border border-orange-200 rounded-sm"></div>
                    Quadro Preto
                  </button>
                  <button
                    onClick={() => changeBoardType("green")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                  >
                    <div className="w-4 h-4 bg-green-900 border border-amber-950 rounded-sm"></div>
                    Quadro Negro
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setShowSaveModal(!showSaveModal);
                  setTimeout(() => newBoardNameInputRef.current?.focus(), 0);
                }}
                className="px-4 py-2 bg-white border-b-4 border-r-4 border-2 border-blue-500 text-blue-500 rounded-2xl text-md rounded-tl-none cursor-pointer"
              >
                Salvar
                <i className="las la-save pl-1"></i>
              </button>

              {showSaveModal && (
                <div
                  ref={saveModalRef}
                  className="absolute top-full right-0 mt-2 w-64 backdrop-blur-sm shadow-2xl bg-white/80 border-3 border-b-7 border-blue-500/20 p-4 rounded-2xl z-20"
                >
                  <h3 className="text-lg font-bold mb-3 text-blue-500">
                    Salvar Quadro
                  </h3>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">
                      Nome
                    </label>
                    <input
                      ref={newBoardNameInputRef}
                      type="text"
                      value={newBoardName}
                      onChange={(e) => setNewBoardName(e.target.value)}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg"
                      placeholder="Nome do quadro"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newBoardName.trim()) {
                          saveCurrentBoard();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={saveCurrentBoard}
                    disabled={!newBoardName.trim()}
                    className={`w-full py-2 rounded-lg text-white ${
                      newBoardName.trim()
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Salvar
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowStorageModal(!showStorageModal)}
                className="px-4 py-2 bg-white border-b-4 border-r-4 border-2 border-purple-500 text-purple-500 rounded-2xl text-md rounded-tl-none cursor-pointer"
              >
                Armazenamento
                <i className="las la-archive pl-1"></i>
              </button>

              {showStorageModal && (
                <div
                  ref={storageModalRef}
                  className="absolute top-full right-0 mt-2 w-64 backdrop-blur-sm shadow-2xl bg-white/80 border-3 border-b-7 border-blue-500/20 p-4 rounded-2xl z-20 max-h-96 flex flex-col"
                >
                  <h3 className="text-lg font-bold mb-3 text-purple-500">
                    Quadros Salvos
                  </h3>
                  <div className="mb-3 relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 pl-8 border-2 border-gray-300 rounded-lg"
                      placeholder="Pesquisar..."
                    />
                    <i className="las la-search absolute left-2 top-3 text-gray-400"></i>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {filteredBoards.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        {searchTerm
                          ? "Nenhum resultado"
                          : "Nenhum quadro salvo"}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredBoards.map((board) => (
                          <div
                            key={board.id}
                            onClick={() => confirmLoadBoard(board)}
                            className={`p-2 rounded-lg cursor-pointer flex justify-between items-center border-b-4 border-r-4 border-2 ${
                              boardStyles[board.boardType].border
                            } ${boardStyles[board.boardType].bg} ${
                              boardStyles[board.boardType].text
                            }`}
                          >
                            <div>
                              <div className="font-medium">{board.name}</div>
                              <div className="text-xs">
                                {getBoardTypeName(board.boardType)}
                              </div>
                              <div className="text-xs opacity-80">
                                {board.date}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSavedBoard(board.id, e);
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <i className="las la-trash"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowClearModal(!showClearModal)}
                className="px-4 py-2 bg-white border-b-4 border-r-4 border-2 border-red-500 text-red-500 rounded-2xl text-md rounded-tl-none cursor-pointer"
              >
                Limpar
                <i className="las la-trash pl-1"></i>
              </button>

              {showClearModal && (
                <div
                  ref={clearModalRef}
                  className="absolute top-full right-0 mt-2 w-64 backdrop-blur-sm shadow-2xl bg-white/80 border-3 border-b-7 border-blue-500/20 p-4 rounded-2xl z-20"
                >
                  <h3 className="text-lg font-bold mb-3 text-red-500">
                    Limpar Quadro
                  </h3>
                  <p className="mb-3">
                    Tem certeza que deseja limpar o quadro atual?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowClearModal(false)}
                      className="flex-1 py-2 bg-red-500 text-white rounded-xl"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={clearCanvas}
                      className="flex-1 py-2 bg-blue-500 text-white rounded-xl"
                    >
                      Limpar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`flex-1 rounded-2xl overflow-hidden border-4 ${boardStyles[boardType].border}`}
          >
            <canvas
              ref={canvasRef}
              width={1200}
              height={600}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className={`w-full h-full ${boardStyles[boardType].bg}`}
            />
          </div>
        </div>

        {showReplaceWarning && boardToLoad && (
          <div className="fixed inset-0 flex justify-center items-center z-[1001]">
            <div
              ref={replaceWarningRef}
              className="backdrop-blur-sm shadow-2xl bg-white/80 border-3 border-b-7 border-blue-500/20 p-6 rounded-2xl w-96 relative"
            >
              <h3 className="text-xl font-medium mb-4 text-red-500">Atenção</h3>
              <p className="mb-4">
                Isso substituirá permanentemente o quadro atual. Deseja
                continuar?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReplaceWarning(false)}
                  className="flex-1 py-2 bg-red-500 text-white rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    loadBoard(boardToLoad);
                    setShowReplaceWarning(false);
                  }}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-xl"
                >
                  Substituir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
