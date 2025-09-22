"use client";

import { createComponentClient } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const supabase = createComponentClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data, email, password);

    if (error){
      alert("erro");
      console.log(error);
      return;
    }

    return router.push("/home");
  };

  return (
    <main className="min-h-screen bg-retrowhite">
      <section className="flex min-h-screen">
        <div className="bg-retroyellow w-2/5 h-screen border-r-3   border-r-retrored flex flex-col justify-center items-center ">
          <div className="absolute left-0 w-24 h-24 rotate-9">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-12 h-40 bg-retrored rounded-full"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                }}
              />
            ))}
          </div>
          <div className="absolute grid grid-cols-2 gap-0 w-32 h-32 bg-retrored right-0">
            <div className="bg-retrowhite rounded-br-full" />
            <div className="bg-retrored rounded-bl-full" />
            <div className="bg-retrowhite rounded-tr-full" />
            <div className="bg-retrored rounded-tl-full" />
          </div>
          <p className="text-retrowhite text-stroke text-7xl font-extrabold tracking-tighter drop-shadow-[6px_6px_0_black]">
            Bem vindo <br></br>de volta!
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          <form className="flex flex-col space-y-5 w-1/2">
            <div className="flex items-center text-retrobrown border-2 border-retrobrown p-3 rounded-sm shadow-border gap-3">
              <i className="las la-user text-3xl"></i>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                className=" placeholder:text-retrobrown w-full font-medium"
              />
            </div>
            <div className="flex items-center text-retrobrown border-2 border-retrobrown p-3 rounded-sm shadow-border gap-3">
              <i className="las la-lock text-3xl"></i>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className=" placeholder:text-retrobrown w-full font-medium"
              />
            </div>
          </form>
          <button
            type="submit"
            onClick={handleLogin}
            className="border flex w-1/2 bg-retroyellow items-center justify-center translate-x-[-1px] translate-y-[-1px]
            shadow-border hover:bg-yellow-500 duration-300
            p-2 rounded-sm cursor-pointer text-retrobrown transition-all gap-0.5"
          >
            <p className="text-xl font-semibold">Entrar</p>{" "}
          </button>

          <p className="text-center text-retrobrown font-semibold tracking-[-1px]">
            Se não possui,&nbsp;
            <Link
              href={"/register"}
              className="underlinecss text-blue underline font-bold cursor-pointer"
            >
              registre-se aqui.
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
