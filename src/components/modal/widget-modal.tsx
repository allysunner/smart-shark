'use client';

import { useState } from "react"

interface WidgetProps{
  onClose: () => void;
}

export default function Widget({ onClose }: WidgetProps){
    const [ fullscren, setFullscreen ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(true);

    return(
        <div className={`fixed inset-0 z-[999] bg-black/20 flex items-center justify-center transition-opacity duration-200 ${
          modalVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}>
            <div className={`backdrop-blur-sm shadow-border overflow-y-auto border-2 bg-white ${fullscren ? 'w-[90%] h-[98%]' : 'w-2/4 h-3/4' } relative transition-all duration-200 ${
            modalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}>
                <div className={`w-full flex justify-end p-1 border-b font-pixel text-xl gap-1 bg-retrogreen transition-all duration-300 `}>               
                    <span className="cursor-pointer shadow-[1px_1px_0px_0px_black] h-5 w-5 border flex items-center justify-center bg-zinc-300 hover:bg-zinc-400"
                    onClick={() => setFullscreen(false)}>-</span>
                    <span className="cursor-pointer shadow-[1px_1px_0px_0px_black] h-5 w-5 border flex items-center justify-center bg-zinc-300 hover:bg-zinc-400"
                    onClick={() => setFullscreen(true)}>o</span>
                    <span className="cursor-pointer shadow-[1px_1px_0px_0px_black] h-5 w-5 border flex items-center justify-center bg-retrored hover:bg-red-600"
                    onClick={onClose}>x</span>
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}