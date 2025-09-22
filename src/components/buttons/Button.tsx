import { ReactNode } from "react";

interface ButtonProps {
  title?: string;
  icon?: ReactNode;
  textColor: string;
  bgColor?: string;
  onClick?: () => void;
  border?: boolean;
  rounded?: boolean;
}

export default function Button({
  title,
  icon,
  textColor,
  bgColor,
  onClick,
  border,
  rounded,
}: ButtonProps) {
  return (
    <button
      className={`${bgColor} text-${textColor} font-medium cursor-pointer transition-all hover:brightness-75 
            ${
              border
                ? "border shadow-border"
                : ""
            }
            ${title ? (border ? "py-2 px-4" : "py-2.5 px-4") : "py-2.5 px-3"}
            ${rounded ? "rounded-4xl" : "rounded"}`}
      onClick={onClick}
    >
      {icon ? (
        <span
          className={`flex justify-center items-center ${title ? "gap-2" : ""}`}
        >
          <span className={`${title ? "text-2xl" : "text-3xl"}`}>{icon}</span>
          {title && <span>{title}</span>}
        </span>
      ) : (
        <span>{title}</span>
      )}
    </button>
  );
}
