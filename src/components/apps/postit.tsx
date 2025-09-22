"use client";
import {
  useState,
  useRef,
  useEffect,
  MouseEvent as ReactMouseEvent,
  KeyboardEvent,
} from "react";

// Tipos de dados
interface Note {
  id: number;
  content: string;
  x: number;
  y: number;
  rotation: number;
  color: string;
  sectionId: string;
  textAlign: "left" | "center" | "right" | "justify";
}

interface Section {
  id: string;
  name: string;
  color: string;
  borderColor: string;
}

// Cores das notas
const COLORS = ["#FFFD75", "#FF9E9E", "#A0E7A0", "#9ED1FF", "#D4A5FF"];

// Cores das seções (fundo e borda)
const SECTION_COLORS = [
  { bg: "bg-yellow-400", border: "border-yellow-400" },
  { bg: "bg-blue-400", border: "border-blue-400" },
  { bg: "bg-red-400", border: "border-red-400" },
  { bg: "bg-purple-400", border: "border-purple-400" },
  { bg: "bg-green-400", border: "border-green-400" },
];

export default function StickyNoteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Notas e seções
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [sections, setSections] = useState<Section[]>(() => {
    const savedSections = localStorage.getItem("sections");
    return savedSections
      ? JSON.parse(savedSections)
      : [
          {
            id: "general",
            name: "Geral",
            color: SECTION_COLORS[0].bg,
            borderColor: SECTION_COLORS[0].border,
          },
        ];
  });
  const [currentSection, setCurrentSection] = useState("general");

  // Estados de interação
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [initialAngle, setInitialAngle] = useState(0);

  // Modais
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [newSectionColor, setNewSectionColor] = useState(SECTION_COLORS[0]);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const notesContainerRef = useRef<HTMLDivElement>(null);
  const sectionNameInputRef = useRef<HTMLInputElement>(null);

  // Scroll
  const [scrollPosition, setScrollPosition] = useState({ y: 0 });

  // Limites do contêiner para não sair da tela
  const getContainerBounds = () => {
    const container = notesContainerRef.current;
    if (!container) return { minX: 0, maxX: 0, minY: 0, maxY: 2000 };

    const { width } = container.getBoundingClientRect();
    return {
      minX: 0,
      maxX: width - 256, // Largura da nota
      minY: 0,
      maxY: container.scrollHeight - 256,
    };
  };

  // Captura o scroll atual
  const handleScroll = () => {
    const container = notesContainerRef.current;
    if (container) {
      setScrollPosition({ y: container.scrollTop });
    }
  };

  // Cria uma nova nota na posição inicial (ajustada pelo scroll)
  const addNote = () => {
    const { minX, maxX, minY, maxY } = getContainerBounds();
    const newNote: Note = {
      id: Date.now(),
      content: "",
      x: Math.max(minX, Math.min(maxX, 100)),
      y: Math.max(minY, Math.min(maxY, 100 + scrollPosition.y)),
      rotation: 0,
      color: COLORS[0],
      sectionId: currentSection,
      textAlign: "left",
    };

    setNotes((prev) => {
      const updatedNotes = [...prev, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
    setSelectedId(newNote.id);
  };

  // Duplica uma nota
  const duplicateNote = (id: number) => {
    const noteToDuplicate = notes.find((n) => n.id === id);
    if (!noteToDuplicate) return;

    const { minX, maxX, minY, maxY } = getContainerBounds();
    const newNote: Note = {
      ...noteToDuplicate,
      id: Date.now(),
      x: Math.max(minX, Math.min(maxX, noteToDuplicate.x + 20)),
      y: Math.max(minY, Math.min(maxY, noteToDuplicate.y + 20)),
    };

    setNotes((prev) => {
      const updatedNotes = [...prev, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
    setSelectedId(newNote.id);
  };

  // Abre o modal de nova seção
  const addSection = () => {
    setShowSectionModal(true);
    setTimeout(() => sectionNameInputRef.current?.focus(), 0);
  };

  // Limpa todas as notas da seção atual
  const clearSectionNotes = () => {
    setNotes((prev) => {
      const updatedNotes = prev.filter((n) => n.sectionId !== currentSection);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
    setShowClearModal(false);
  };

  // Cria uma nova seção
  const createSection = () => {
    if (!newSectionName.trim()) return;

    const newSection: Section = {
      id: `section-${Date.now()}`,
      name: newSectionName,
      color: newSectionColor.bg,
      borderColor: newSectionColor.border,
    };

    setSections((prev) => {
      const updatedSections = [...prev, newSection];
      localStorage.setItem("sections", JSON.stringify(updatedSections));
      return updatedSections;
    });
    setCurrentSection(newSection.id);
    setShowSectionModal(false);
    setNewSectionName("");
  };

  // Exclui uma seção (exceto a Geral) e suas notas
  const deleteSection = (sectionId: string) => {
    if (sectionId === "general") return;

    setSections((prev) => {
      const updatedSections = prev.filter((s) => s.id !== sectionId);
      localStorage.setItem("sections", JSON.stringify(updatedSections));
      return updatedSections;
    });
    setNotes((prev) => {
      const updatedNotes = prev.filter((n) => n.sectionId !== sectionId);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });

    if (currentSection === sectionId) {
      setCurrentSection("general");
    }
  };

  // Atualiza o conteúdo da nota
  const updateContent = (id: number, content: string) => {
    setNotes((prev) => {
      const updatedNotes = prev.map((note) =>
        note.id === id ? { ...note, content } : note
      );
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  // Troca a cor da nota para a próxima da lista
  const changeColor = (id: number) => {
    setNotes((prev) => {
      const updatedNotes = prev.map((note) => {
        if (note.id !== id) return note;
        const nextColor =
          COLORS[(COLORS.indexOf(note.color) + 1) % COLORS.length];
        return { ...note, color: nextColor };
      });
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  // Muda o alinhamento do texto
  const changeTextAlign = (id: number) => {
    setNotes((prev) => {
      const updatedNotes = prev.map((note) => {
        if (note.id !== id) return note;
        const alignments: ("left" | "center" | "right" | "justify")[] = [
          "left",
          "center",
          "right",
          "justify",
        ];
        const currentIndex = alignments.indexOf(note.textAlign);
        const nextIndex = (currentIndex + 1) % alignments.length;
        return { ...note, textAlign: alignments[nextIndex] };
      });
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  // Inicia o arraste
  const startDrag = (e: ReactMouseEvent, id: number) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    setIsDragging(true);
    setSelectedId(id);
    setDragOffset({
      x: e.clientX - note.x,
      y: e.clientY - note.y,
    });
  };

  // Move a nota com o mouse
  const handleDrag = (e: MouseEvent) => {
    if (!isDragging || selectedId === null || !notesContainerRef.current)
      return;

    const { minX, maxX, minY, maxY } = getContainerBounds();
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;

    newX = Math.max(minX, Math.min(maxX, newX));
    newY = Math.max(minY, Math.min(maxY, newY));

    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedId ? { ...note, x: newX, y: newY } : note
      )
    );
  };

  const stopDrag = () => setIsDragging(false);

  // Inicia a rotação
  const startRotation = (e: ReactMouseEvent, id: number) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    setIsRotating(true);
    setSelectedId(id);

    const angle =
      Math.atan2(e.clientY - (note.y + 128), e.clientX - (note.x + 128)) *
      (180 / Math.PI);

    setInitialAngle(angle);
  };

  // Gira a nota de acordo com o mouse
  const handleRotation = (e: MouseEvent) => {
    if (!isRotating || selectedId === null) return;

    const note = notes.find((n) => n.id === selectedId);
    if (!note) return;

    const newAngle =
      Math.atan2(e.clientY - (note.y + 128), e.clientX - (note.x + 128)) *
      (180 / Math.PI);

    let rotation = note.rotation;

    if (Math.abs(newAngle - initialAngle) > 270) {
      rotation +=
        newAngle > initialAngle
          ? newAngle - initialAngle - 360
          : newAngle - initialAngle + 360;
    } else {
      rotation += newAngle - initialAngle;
    }

    rotation = ((((rotation + 180) % 360) + 360) % 360) - 180;
    rotation = note.rotation + (rotation - note.rotation) * 0.3;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedId ? { ...note, rotation } : note
      )
    );

    setInitialAngle(newAngle);
  };

  const stopRotation = () => setIsRotating(false);

  // Exclui uma nota
  const deleteNote = (id: number) => {
    setNotes((prev) => {
      const updatedNotes = prev.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
    if (selectedId === id) setSelectedId(null);
  };

  // Manipulador de teclado
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedId) return;

    if (e.key === "Delete" || e.key === "Del") {
      deleteNote(selectedId);
    } else if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      duplicateNote(selectedId);
    }
  };

  // Manipulador de teclado para o modal de seção
  const handleSectionModalKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      createSection();
    } else if (e.key === "Escape") {
      setShowSectionModal(false);
    }
  };

  // Deselect note when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setSelectedId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown as any);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [selectedId]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      handleDrag(e);
      handleRotation(e);
    };
    const onUp = () => {
      stopDrag();
      stopRotation();
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, isRotating, selectedId, dragOffset, initialAngle]);

  useEffect(() => {
    const container = notesContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isOpen) return null;

  const currentNotes = notes.filter(
    (note) => note.sectionId === currentSection
  );

  const getAlignmentIcon = (align: Note["textAlign"]) => {
    switch (align) {
      case "left":
        return "la-align-left";
      case "center":
        return "la-align-center";
      case "right":
        return "la-align-right";
      case "justify":
        return "la-align-justify";
      default:
        return "la-align-left";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="backdrop-blur-sm shadow-2xl bg-white/80 border-3 border-b-7 border-blue-500/20 p-6 rounded-2xl w-[90%] h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Seções */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {sections.map((section) => (
            <div key={section.id} className="relative group">
              <button
                className={`px-4 py-2 rounded-2xl font-medium flex items-center gap-2 min-w-max ${
                  currentSection === section.id
                    ? `${section.color} border-b-3 border-r-3 border-1 ${section.borderColor} text-white`
                    : `bg-white hover:bg-white/70 border-b-3 border-r-3 border-1 ${section.borderColor}`
                }`}
                onClick={() => setCurrentSection(section.id)}
              >
                <span>{section.name}</span>
              </button>

              {section.id !== "general" && (
                <button
                  className="absolute -right-2 -top-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSection(section.id);
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Botões: Adicionar Divisão / Limpar Notas / Adicionar Nota */}
        <div className="absolute top-5 right-5 flex gap-2 z-10">
          <button
            className="backdrop-blur-sm shadow-2xl bg-white/80 border-1 border-b-3 border-blue-500/20 px-4 py-2 text-blue-500 rounded-2xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              addSection();
            }}
          >
            <i className="las la-folder-plus"></i> Adicionar Divisão
          </button>
          <button
            className="backdrop-blur-sm shadow-2xl bg-white/80 border-1 border-b-3 border-blue-500/20 px-4 py-2 text-red-500 rounded-2xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowClearModal(true);
            }}
          >
            <i className="las la-trash"></i> Limpar Notas
          </button>
          <button
            className="backdrop-blur-sm shadow-2xl bg-white/80 border-1 border-b-3 border-blue-500/20 px-4 py-2 text-yellow-400 rounded-2xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              addNote();
            }}
          >
            <i className="las la-plus"></i> Adicionar Nota
          </button>
        </div>

        {/* Container que segura todas as notas */}
        <div
          ref={notesContainerRef}
          className="relative w-full h-[calc(100%-60px)] overflow-y-auto overflow-x-hidden"
        >
          <div className="relative" style={{ minHeight: "2000px" }}>
            {currentNotes.map((note) => (
              <div
                key={note.id}
                className={`absolute w-64 h-64 p-3 shadow-lg cursor-move transition-transform ${
                  selectedId === note.id ? "ring-2 ring-blue-500 z-10" : "z-0"
                }`}
                style={{
                  left: `${note.x}px`,
                  top: `${note.y}px`,
                  transform: `rotate(${note.rotation}deg)`,
                  backgroundColor: note.color,
                  transition: isRotating ? "none" : "transform 0.1s ease",
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  startDrag(e, note.id);
                }}
              >
                {/* Área de texto da nota */}
                <textarea
                  className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-${note.textAlign}`}
                  placeholder="Escreva sua anotação..."
                  value={note.content}
                  onChange={(e) => updateContent(note.id, e.target.value)}
                  onMouseDown={(e) => e.stopPropagation()}
                  style={{ textAlign: note.textAlign }}
                />

                {/* Botões de ações flutuantes (apenas se estiver selecionada) */}
                {selectedId === note.id && (
                  <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                    {/* Girar */}
                    <div
                      className="w-8 h-8 backdrop-blur-sm shadow-2xl bg-white/80 border-1 border-b-3 border-blue-500/20 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startRotation(e, note.id);
                      }}
                    >
                      <i className="las la-redo-alt"></i>
                    </div>

                    {/* Mudar cor */}
                    <button
                      className="w-8 h-8 backdrop-blur-sm shadow-2xl bg-white/80 border-1 border-b-3 border-blue-500/20 rounded-full flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        changeColor(note.id);
                      }}
                    >
                      <i className="las la-palette"></i>
                    </button>

                    {/* Alinhamento de texto */}
                    <button
                      className="w-8 h-8 backdrop-blur-sm shadow-2xl bg-white/80 border-1 border-b-3 border-blue-500/20 rounded-full flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        changeTextAlign(note.id);
                      }}
                    >
                      <i
                        className={`las ${getAlignmentIcon(note.textAlign)}`}
                      ></i>
                    </button>

                    {/* Excluir */}
                    <button
                      className="w-8 h-8 backdrop-blur-sm shadow-2xl bg-white/80 border-1 border-b-3 border-blue-500/20 rounded-full flex items-center justify-center text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                    >
                      <i className="las la-trash"></i>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal de nova seção */}
        {showSectionModal && (
          <div className="fixed inset-0 flex justify-end items-start z-20 mt-20 mx-5">
            <div
              className="shadow-2xl bg-white border-1 border-b-3 border-blue-500/20 p-6 rounded-lg w-94"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-lg font-medium mb-4 text-blue-500 tracking-tight">
                Criar nova separação
              </p>

              {/* Nome da divisão */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-black/50">
                  Nome da Divisão
                </label>
                <input
                  ref={sectionNameInputRef}
                  type="text"
                  className="w-full p-2 border-1 rounded-2xl rounded-tl-none border-blue-500"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  onKeyDown={handleSectionModalKeyDown}
                  placeholder="Ex: Linguagens"
                />
              </div>

              {/* Cores disponíveis */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Cor da Divisão
                </label>
                <div className="flex gap-2">
                  {SECTION_COLORS.map((color) => (
                    <div
                      key={color.bg}
                      className={`w-8 h-8 rounded-full cursor-pointer ${
                        color.bg
                      } ${
                        newSectionColor.bg === color.bg
                          ? "ring-2 ring-offset-2"
                          : ""
                      }`}
                      onClick={() => setNewSectionColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-xl"
                  onClick={() => setShowSectionModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl"
                  onClick={createSection}
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de limpar notas */}
        {showClearModal && (
          <div className="fixed inset-0 flex justify-end items-start z-20 mt-20 mx-5">
            <div
              className="shadow-2xl bg-white border-1 border-b-3 border-blue-500/20 p-6 rounded-lg w-94"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-lg font-medium mb-4 text-red-500 tracking-tight">
                Limpar todas as notas desta seção?
              </p>
              <p className="mb-6 text-sm text-gray-600">
                Esta ação irá remover permanentemente todas as notas da seção
                atual e não pode ser desfeita.
              </p>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-xl"
                  onClick={() => setShowClearModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl"
                  onClick={clearSectionNotes}
                >
                  Limpar Notas
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
