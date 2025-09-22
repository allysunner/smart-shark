interface CardProps{
    img?: string
    title: string
    viewed?: boolean
}

export default function SubjectCard({ img, title, viewed }: CardProps){
  return (
    <div className="relative bg-white w-60 h-80 border-2 shadow-border rounded-xl">
      <div className="absolute bg-[#f791c3] border-2 rounded-full m-2">
        <div className="p-1">{img}</div>
      </div>
      <div className="absolute bottom-0 w-full h-15 border-t-2">
        <p className="p-2 font-semibold text-md">{title}</p>
      </div>
    </div>
  );
}
