interface CardProps{
    category: string
    color: string
    onClickRight: () => void
    onClickLeft: () => void
}

export default function CategoryCard({ category, color, onClickRight, onClickLeft }: CardProps) {
  return (
    <div className="flex w-full h-60 justify-center p-3">
      <div className="w-full relative h-auto bg-white border-2 shadow-border rounded-md">
        <div className="absolute bottom-0 border-t-2 w-full h-1/3">
          <p className={`text-4xl font-extrabold text-${color} p-3 text-stroke drop-shadow-[2px_2px_0_black]`}>
            {category}
          </p>
        </div>
        <button className="absolute cursor-pointer top-2 left-2 bg-retroyellow rounded w-10 h-8 flex items-center justify-center border-1 hover:bg-yellow-500 transition-all"
        onClick={onClickLeft}>
          <i className="las la-angle-left text-xl"></i>
        </button>
        <button className="absolute cursor-pointer top-2 right-2 bg-retroyellow rounded w-10 h-8 flex items-center justify-center border-1 hover:bg-yellow-500 transition-all"
        onClick={onClickRight}>
          <i className="las la-angle-right text-xl"></i>
        </button>
      </div>
    </div>
  );
}
