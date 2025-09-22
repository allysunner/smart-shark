"use client";
import {
  useState,
  useRef,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from "react";

interface CalculatorModalProps {
  onClose: () => void;
}

type TrigonometricFunction = "sin" | "cos" | "tan" | "sec" | "csc" | "cot";

export default function CalculatorModal({ onClose }: CalculatorModalProps) {
  // Estados para o arraste
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // Estados da calculadora
  const [radDeg, setRadDeg] = useState<"rad" | "deg">("rad");
  const [secondMode, setSecondMode] = useState(false);
  const [operationDisplay, setOperationDisplay] = useState("");
  const [resultDisplay, setResultDisplay] = useState("0");
  const [calculatorData, setCalculatorData] = useState({
    formats: [] as string[],
    operations: [] as string[],
    result: 0,
    resultformat: [] as string[],
    staging: [] as string[],
  });

  // Funções de arraste
  const startDrag = (e: ReactMouseEvent) => {
    if (!modalRef.current) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleDrag = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    setPosition({ x: newX, y: newY });
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", stopDrag);
    } else {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", stopDrag);
    }

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", stopDrag);
    };
  }, [isDragging]);

  // Funções da calculadora (mantidas do código original)
  const clearData = () => {
    setCalculatorData({
      formats: [],
      operations: [],
      result: 0,
      resultformat: [],
      staging: [],
    });
    setOperationDisplay("");
    setResultDisplay("0");
  };

  const toggleRadDeg = () => {
    setRadDeg(radDeg === "rad" ? "deg" : "rad");
  };

  const toggleSecond = () => {
    setSecondMode(!secondMode);
  };

  const handleNumber = (value: string) => {
    const newStaging = [...calculatorData.staging];
    if (calculatorData.resultformat.includes("active")) {
      newStaging.length = 0;
      setCalculatorData({
        ...calculatorData,
        resultformat: [],
        staging: newStaging,
      });
    }
    newStaging.push(value);
    setCalculatorData({
      ...calculatorData,
      staging: newStaging,
    });
    setResultDisplay(newStaging.join(""));
  };

  const handleConstant = (constant: "π" | "e") => {
    const value = constant === "π" ? Math.PI : Math.E;
    setCalculatorData({
      ...calculatorData,
      result: value,
      formats: [...calculatorData.formats, constant],
      resultformat: ["active"],
      staging: [],
    });
    setOperationDisplay([...calculatorData.formats, constant].join(""));
    setResultDisplay(value.toString());
  };

  const handleOperator = (operator: string, display: string) => {
    let newData = { ...calculatorData };
    const lastOp = newData.operations[newData.operations.length - 1];

    if (newData.staging.length > 0 && isNaN(parseFloat(lastOp))) {
      if (
        newData.formats.length === 0 ||
        !newData.formats[newData.formats.length - 1].includes(")")
      ) {
        const stagingStr = newData.staging.join("");
        newData.operations.push(stagingStr);
        newData.formats.push(stagingStr);
        newData.staging = [];
        const formulaStr = balanceParentheses(newData.operations);
        try {
          newData.result = eval(formulaStr.join(""));
        } catch (e) {
          newData.result = 0;
        }
        setOperationDisplay(newData.formats.join(""));
        setResultDisplay(newData.result.toString());
      }
    } else {
      if (
        newData.operations.length > 0 &&
        newData.resultformat.length === 0 &&
        isNaN(parseFloat(lastOp)) &&
        lastOp !== "(" &&
        lastOp !== ")"
      ) {
        newData.operations.pop();
        newData.formats.pop();
      } else {
        if (
          newData.staging.length > 0 &&
          newData.operations[newData.operations.length - 1] !== ")"
        ) {
          const stagingStr = newData.staging.join("");
          newData.operations.push(stagingStr);
          newData.formats.push(stagingStr);
          newData.result = parseFloat(stagingStr);
          newData.staging = [];
        } else if (newData.operations[newData.operations.length - 1] !== ")") {
          newData.operations = [
            ...newData.operations,
            newData.result.toString(),
          ];
          if (newData.resultformat.length === 0) {
            newData.formats = [...newData.formats, newData.result.toString()];
          } else {
            newData.resultformat = [];
          }
        }
      }
    }

    newData.resultformat = [];
    newData.operations.push(operator);
    newData.formats.push(display);
    setCalculatorData(newData);
    setOperationDisplay(newData.formats.join(""));
  };

  const handlePercentage = () => {
    let percentage = 0;
    if (calculatorData.staging.length > 0) {
      percentage = parseFloat(calculatorData.staging.join("")) * 0.01;
      setCalculatorData({
        ...calculatorData,
        staging: [],
        result: percentage,
      });
    } else if (calculatorData.result !== 0) {
      percentage = calculatorData.result * 0.01;
      setCalculatorData({
        ...calculatorData,
        result: percentage,
      });
    }
    setResultDisplay(percentage.toString());
  };

  const handleMathFunction = (func: "log" | "ln" | "fact" | "sqrt") => {
    const operations: Record<
      "log" | "ln" | "fact" | "sqrt",
      (x: number) => number
    > = {
      log: (x: number) => Math.log10(x),
      ln: (x: number) => Math.log(x),
      fact: (x: number) => factorialCalculation(x),
      sqrt: (x: number) => Math.sqrt(x),
    };

    const formatMap: Record<
      "log" | "ln" | "fact" | "sqrt",
      (i: string) => string
    > = {
      log: (i: string) => `log(${i})`,
      ln: (i: string) => `ln(${i})`,
      fact: (i: string) => `fact(${i})`,
      sqrt: (i: string) => `√(${i})`,
    };

    let newData = { ...calculatorData };
    let inputValue: string;
    let resultValue: number;

    if (newData.staging.length > 0) {
      inputValue = newData.staging.join("");
      resultValue = operations[func](parseFloat(inputValue));
      newData.formats.push(formatMap[func](inputValue));
      newData.resultformat = ["active"];
      newData.result = resultValue;
      newData.staging = [];
    } else if (newData.result !== 0 || newData.result === 0) {
      inputValue = newData.result.toString();
      resultValue = operations[func](newData.result);
      if (
        newData.formats.length > 0 &&
        newData.resultformat.includes("active")
      ) {
        const lastFormat = newData.formats[newData.formats.length - 1];
        newData.formats.pop();
        newData.formats.push(formatMap[func](lastFormat));
      } else {
        newData.formats.push(formatMap[func](inputValue));
      }
      newData.resultformat = ["active"];
      newData.result = resultValue;
    }

    setCalculatorData(newData);
    setOperationDisplay(newData.formats.join(""));
    setResultDisplay(newData.result.toString());
  };

  const factorialCalculation = (value: number): number => {
    if (value < 0) return NaN;
    if (value === 0) return 1;
    return value * factorialCalculation(value - 1);
  };

  const handleTrigonometric = (func: TrigonometricFunction) => {
    const operations: Record<TrigonometricFunction, (x: number) => number> = {
      sin: (x: number) => Math.sin(x),
      cos: (x: number) => Math.cos(x),
      tan: (x: number) => Math.tan(x),
      sec: (x: number) => 1 / Math.cos(x),
      csc: (x: number) => 1 / Math.sin(x),
      cot: (x: number) => 1 / Math.tan(x),
    };

    const formats: Record<
      TrigonometricFunction,
      (i: string, unit: string) => string
    > = {
      sin: (i: string, unit: string) =>
        unit === "deg" ? `sin₀(${i})` : `sinᵣ(${i})`,
      cos: (i: string, unit: string) =>
        unit === "deg" ? `cos₀(${i})` : `cosᵣ(${i})`,
      tan: (i: string, unit: string) =>
        unit === "deg" ? `tan₀(${i})` : `tanᵣ(${i})`,
      sec: (i: string, unit: string) =>
        unit === "deg" ? `sec₀(${i})` : `secᵣ(${i})`,
      csc: (i: string, unit: string) =>
        unit === "deg" ? `csc₀(${i})` : `cscᵣ(${i})`,
      cot: (i: string, unit: string) =>
        unit === "deg" ? `cot₀(${i})` : `cotᵣ(${i})`,
    };

    let newData = { ...calculatorData };
    let inputValue: string;
    let resultValue: number;

    if (newData.staging.length > 0) {
      inputValue = newData.staging.join("");
      let angle = parseFloat(inputValue);
      if (radDeg === "deg") angle = (angle * Math.PI) / 180;
      resultValue = operations[func](angle);
      newData.formats.push(formats[func](inputValue, radDeg));
      newData.resultformat = ["active"];
      newData.result = resultValue;
      newData.staging = [];
    } else if (newData.result !== 0 || newData.result === 0) {
      inputValue = newData.result.toString();
      let angle = newData.result;
      if (radDeg === "deg") angle = (angle * Math.PI) / 180;
      resultValue = operations[func](angle);
      if (
        newData.formats.length > 0 &&
        newData.resultformat.includes("active")
      ) {
        const lastFormat = newData.formats[newData.formats.length - 1];
        newData.formats.pop();
        newData.formats.push(formats[func](lastFormat, radDeg));
      } else {
        newData.formats.push(formats[func](inputValue, radDeg));
      }
      newData.resultformat = ["active"];
      newData.result = resultValue;
    }

    setCalculatorData(newData);
    setOperationDisplay(newData.formats.join(""));
    setResultDisplay(newData.result.toString());
  };

  const handleParenthesesOpen = () => {
    let newData = { ...calculatorData };
    const lastOp = newData.operations[newData.operations.length - 1];

    if (newData.staging.length > 0 && isNaN(parseFloat(lastOp))) {
      const stagingStr = newData.staging.join("");
      newData.operations.push(stagingStr, "*", "(");
      newData.formats.push(stagingStr, "×", "(");
      const formulaStr = balanceParentheses(newData.operations);
      try {
        newData.result = eval(formulaStr.join(""));
      } catch (e) {
        newData.result = 0;
      }
    } else if (
      newData.staging.length === 0 &&
      newData.resultformat.includes("active")
    ) {
      newData.operations.push(newData.result.toString(), "*", "(");
      newData.formats.push("×", "(");
    } else if (
      newData.staging.length === 0 &&
      newData.operations[newData.operations.length - 1] === ")"
    ) {
      newData.operations.push("*", "(");
      newData.formats.push("×", "(");
    } else if (newData.staging.length === 0 && isNaN(parseFloat(lastOp))) {
      newData.operations.push("(");
      newData.formats.push("(");
    }

    newData.staging = [];
    newData.resultformat = [];
    setCalculatorData(newData);
    setOperationDisplay(newData.formats.join(""));
    setResultDisplay(newData.result.toString());
  };

  const handleParenthesesClose = () => {
    const openCount = calculatorData.operations.filter(
      (item) => item === "("
    ).length;
    const closeCount = calculatorData.operations.filter(
      (item) => item === ")"
    ).length;
    const diff = openCount - closeCount;

    if (diff > 0) {
      let newData = { ...calculatorData };
      if (newData.resultformat.includes("active")) {
        newData.operations.push(newData.result.toString(), ")");
        newData.formats.push(")");
      } else if (newData.staging.length > 0) {
        newData.operations.push(newData.staging.join(""), ")");
        newData.formats.push(newData.staging.join(""), ")");
      } else if (newData.staging.length === 0) {
        newData.operations.push(newData.result.toString(), ")");
        newData.formats.push(newData.result.toString(), ")");
      }

      const formulaStr = balanceParentheses(newData.operations);
      try {
        newData.result = eval(formulaStr.join(""));
      } catch (e) {
        newData.result = 0;
      }
      newData.staging = [];
      newData.resultformat = [];
      setCalculatorData(newData);
      setOperationDisplay(newData.formats.join(""));
      setResultDisplay(newData.result.toString());
    }
  };

  const balanceParentheses = (operations: string[]): string[] => {
    const temp = [...operations];
    if (temp.length === 0) return temp;

    const openCount = temp.filter((item) => item === "(").length;
    const closeCount = temp.filter((item) => item === ")").length;
    const diff = openCount - closeCount;

    if (
      isNaN(parseFloat(temp[temp.length - 1])) &&
      !temp[temp.length - 1].includes(")")
    ) {
      temp.push("1");
      for (let i = 0; i < diff; i++) {
        temp.push(")");
      }
    } else {
      for (let i = 0; i < diff; i++) {
        temp.push(")");
      }
    }

    return temp;
  };

  const calculateResult = () => {
    let newData = { ...calculatorData };
    const lastOp = newData.operations[newData.operations.length - 1];

    if (lastOp !== ")") {
      if (newData.staging.length > 0) {
        newData.operations = [...newData.operations, newData.staging.join("")];
        newData.formats = [...newData.formats, newData.staging.join("")];
      } else {
        newData.operations = [...newData.operations, newData.result.toString()];
        if (newData.resultformat.length === 0) {
          newData.formats = [...newData.formats, newData.result.toString()];
        } else {
          newData.resultformat = [];
        }
      }
    }

    newData.staging = [];
    const formulaStr = balanceParentheses(newData.operations);

    try {
      newData.result = eval(formulaStr.join(""));
      newData.operations.push("=");
      newData.formats.push("=");
      setOperationDisplay(newData.formats.join(""));
      setResultDisplay(newData.result.toString());
      newData.operations = [];
      newData.formats = [];
    } catch (error) {
      setResultDisplay("Syntax Error!");
      return;
    }

    setCalculatorData(newData);
  };

  const getTrigonometricFunction = () => {
    if (secondMode) {
      return {
        sin: { func: "sec" as TrigonometricFunction, text: "sec" },
        cos: { func: "csc" as TrigonometricFunction, text: "csc" },
        tan: { func: "cot" as TrigonometricFunction, text: "cot" },
      };
    } else {
      return {
        sin: { func: "sin" as TrigonometricFunction, text: "sin" },
        cos: { func: "cos" as TrigonometricFunction, text: "cos" },
        tan: { func: "tan" as TrigonometricFunction, text: "tan" },
      };
    }
  };

  const trigFunctions = getTrigonometricFunction();

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="flex flex-col backdrop-blur-sm bg-white/80 shadow-2xl w-85 p-5 border-b-5 border-r-5 border-2 border-blue-500/20 rounded-2xl m-5"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={startDrag}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>
        <div className="mb-3 bg-green-100 rounded p-2">
          <div className="text-right text-sm text-gray-600 h-5 overflow-hidden">
            {operationDisplay}
          </div>
          <div className="text-right text-2xl font-mono overflow-hidden">
            {resultDisplay}
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5 mb-3">
          <button
            className="btn bg-gray-200 hover:bg-gray-300 p-1 text-xs border-b-3 border-1 border-black/80 rounded-xl"
            onClick={toggleRadDeg}
          >
            {radDeg}
          </button>
          <button
            className="btn bg-gray-200 hover:bg-gray-300 p-1 text-xs border-b-3 border-1 border-black/80 rounded-xl"
            onClick={toggleSecond}
          >
            2nd
          </button>
          <button
            className="btn bg-gray-200 hover:bg-gray-300 p-1 text-xs border-b-3 border-1 border-black/80 rounded-xl"
            onClick={() => handleMathFunction("log")}
          >
            log
          </button>
          <button
            className="btn bg-gray-200 hover:bg-gray-300 p-1 text-xs border-b-3 border-1 border-black/80 rounded-xl"
            onClick={() => handleMathFunction("ln")}
          >
            ln
          </button>
          <button
            className="btn bg-gray-200 hover:bg-gray-300 p-1 text-xs border-b-3 border-1 border-black/80 rounded-xl"
            onClick={() => handleMathFunction("sqrt")}
          >
            √
          </button>
          <button
            className="btn bg-gray-200 hover:bg-gray-300 p-1 text-xs border-b-3 border-1 border-black/80 rounded-xl"
            onClick={() => handleMathFunction("fact")}
          >
            x!
          </button>
          <button
            className="btn bg-red-200 hover:bg-red-300 p-1 text-xs border-b-3 border-1 border-red-500 rounded-xl"
            onClick={clearData}
          >
            AC
          </button>

          <button
            className="btn bg-blue-100 hover:bg-blue-200 p-1 text-xs border-b-3 border-1 border-blue-400 rounded-xl"
            onClick={() => handleTrigonometric(trigFunctions.sin.func)}
          >
            {trigFunctions.sin.text}
          </button>
          <button
            className="btn bg-blue-100 hover:bg-blue-200 p-1 text-xs border-b-3 border-1 border-blue-400 rounded-xl"
            onClick={() => handleTrigonometric(trigFunctions.cos.func)}
          >
            {trigFunctions.cos.text}
          </button>
          <button
            className="btn bg-blue-100 hover:bg-blue-200 p-1 text-xs border-b-3 border-1 border-blue-400 rounded-xl"
            onClick={() => handleTrigonometric(trigFunctions.tan.func)}
          >
            {trigFunctions.tan.text}
          </button>
          <button
            className="btn bg-gray-200 hover:bg-gray-300 p-1 text-xs border-b-3 border-1 border-black/80 rounded-xl"
            onClick={handleParenthesesOpen}
          >
            (
          </button>
          <button
            className="btn bg-gray-200 hover:bg-gray-300 p-1 text-xs border-b-3 border-1 border-black/80 rounded-xl"
            onClick={handleParenthesesClose}
          >
            )
          </button>
          <button
            className="btn bg-gray-200 hover:bg-gray-300 p-1 text-xs border-b-3 border-1 border-black/80 rounded-xl"
            onClick={handlePercentage}
          >
            %
          </button>
          <button
            className="btn bg-purple-100 hover:bg-purple-200 p-1 text-xs border-b-3 border-1 border-violet-500 rounded-xl"
            onClick={() => handleConstant("π")}
          >
            π
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-3">
          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber("7")}
          >
            7
          </button>
          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber("8")}
          >
            8
          </button>
          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber("9")}
          >
            9
          </button>
          <button
            className="btn bg-gray-300 hover:bg-gray-400 p-3 text-lg border-b-3 border-1 border-gray-500 rounded-2xl"
            onClick={() => handleOperator("/", "÷")}
          >
            ÷
          </button>

          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber("4")}
          >
            4
          </button>
          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber("5")}
          >
            5
          </button>
          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber("6")}
          >
            6
          </button>
          <button
            className="btn bg-gray-300 hover:bg-gray-400 p-3 text-lg border-b-3 border-1 border-gray-500 rounded-2xl"
            onClick={() => handleOperator("*", "×")}
          >
            ×
          </button>

          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber("1")}
          >
            1
          </button>
          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber("2")}
          >
            2
          </button>
          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber("3")}
          >
            3
          </button>
          <button
            className="btn bg-gray-300 hover:bg-gray-400 p-3 text-lg border-b-3 border-1 border-gray-500 rounded-2xl"
            onClick={() => handleOperator("-", "-")}
          >
            -
          </button>

          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber("0")}
          >
            0
          </button>
          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleNumber(".")}
          >
            .
          </button>
          <button
            className="btn bg-gray-100 hover:bg-gray-200 p-3 text-lg border-b-3 border-1 border-black/80 rounded-2xl"
            onClick={() => handleOperator("**", "^")}
          >
            ^
          </button>
          <button
            className="btn bg-blue-400 hover:bg-blue-500 text-white p-3 text-lg border-b-3 border-1 border-blue-500 rounded-2xl"
            onClick={() => handleOperator("+", "+")}
          >
            +
          </button>
        </div>
        <button
          className="btn bg-green-500 mx-1 mb-1 hover:bg-green-600 text-white p-2 text-lg border-b-3 border-1 border-green-300 rounded-2xl"
          onClick={calculateResult}
        >
          =
        </button>
      </div>
    </div>
  );
}
