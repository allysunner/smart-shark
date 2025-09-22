export default function SearchField(){
    return(
        <div className="flex w-258 border shadow-border bg-retrowhite gap-3 rounded-md overflow-hidden">
            <div className="bg-retrogreen py-2 px-3 flex items-center border-r">
                <i className="las la-search text-2xl text-white"></i>
            </div>

            <input className="font-medium w-full" type="text" placeholder="Pesquise aqui..." />
        </div>
    )
}