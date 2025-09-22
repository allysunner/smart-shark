import { ReactNode } from "react";

interface CardProps {
  icon?: ReactNode;
  title: string;
  color: string
  description: string
  questionTotal: number
  questionsAsked: number
  onClick: () => void
}

export default function MaterialCard({ icon, title, color, description, questionTotal, questionsAsked, onClick }: CardProps) {
  const progress =questionTotal > 0 ? (questionsAsked / questionTotal) * 100 : 0;
  
  return (
    <div className="flex flex-col w-full bg-white border-2 shadow-border rounded-md p-4"
        onClick={onClick}>
      <div className="flex w-full">
        <div className={`w-20 aspect-square bg-${color} rounded-md border-2 flex-shrink-0`}>
            {icon}
        </div>
        <div className="ml-4 w-full">
          <p className="mt-0 font-medium">{title}</p>
          <p className="text-sm black/90">{description}</p>
          <p className="text-black/70 text-right text-sm mt-1.5">{questionsAsked}/{questionTotal}</p>
          <div className={`w-full h-2.5 bg-${color}/30 rounded-full border-2`}>
            <div className={`h-full transition-all bg-${color}`}
                style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
