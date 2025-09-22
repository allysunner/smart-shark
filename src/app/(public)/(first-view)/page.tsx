"use client";

import HeaderPublic from "@/components/menu/public-header";
import { useRouter } from "next/navigation";

export default function FirstView() {
  const router = useRouter();

  return (
    <div>
      <div className="mt-20 relative w-full h-screen bg-retrowhite">
        <div className="relative z-20 w-full h-screen flex justify-center items-center gap-32 -top-12">
          <HeaderPublic />

          <div className="w-2xl text-retrobrown text-7xl tracking-tighter text-left leading-none">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className="bg-white border-retrobrown text-retrobrown border-2 shadow-border h-1/2 flex flex-col justify-center items-center gap-5 rounded-2xl">
            <button
              onClick={() => router.push("/login")}
              className="font-semibold tracking-tight text-2xl h-20 w-4/5 text-center rounded-sm border-2 bg-retrowhite shadow-border text-retrobrown hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              Voltar ao Jogo
            </button>

            <div className="flex w-4/5 items-center">
              <p className="p-2.5 font-normal">
                Para aqueles que já entraram e conseguiram usufruir 100% do seu
                cerébro
              </p>
            </div>
            <button
              onClick={() => router.push("/register")}
              className="font-semibold tracking-tight text-2xl h-20 w-4/5 text-center rounded-sm border-2 bg-retrowhite shadow-border text-retrobrown hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              Entrar Para o Time
            </button>

            <div className="flex w-4/5 items-center">
              <p className="p-2.5 font-normal">
                Para os que estão prestes a se sentir no controle do aprendizado
                novamente
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full h-24">
          <div className="mt-20 w-full h-screen flex flex-col justify-end z-10 opacity-[1] bottom-0 "></div>
          <div className="mt-20 w-full h-screen flex flex-col justify-end -z-10 opacity-[0.2] bottom-3.5 "></div>
          <div className="mt-20 w-full h-screen flex flex-col justify-end -z-20 opacity-[0.5] bottom-2.5 "></div>
          <div className="mt-20 w-full h-screen flex flex-col justify-end -z-10 opacity-[0.7] bottom-5 "></div>
        </div>
      </div>
    </div>
  );
}
