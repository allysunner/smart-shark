"use client";

import { useState } from "react";
import { createComponentClient } from "@/lib/supabase";
import Link from "next/link";

export default function Page() {
  const supabase = createComponentClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email as string,
      password: password as string,
      options: {
        data: { username },
      },
    });

    if (error) {
      if (error.message.includes("duplicate key")) {
        alert("Esse nome de usuário já está em uso, escolha outro");
      } else {
        alert("Erro ao registrar: " + error.message);
      }
    }
  };

  return (
    <main className="min-h-screen bg-retrowhite">
      <section className="flex min-h-screen">
        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          <form className="flex flex-col space-y-5 w-1/2">
            <div className="flex gap-3 items-center text-retrobrown border-2 border-retrobrown p-3 rounded-sm shadow-border">
              <i className="las la-signature text-3xl"></i>
              <input
                type="text"
                name="user"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Usuário"
                className="placeholder:text-retrobrown w-full font-medium"
              />
            </div>

            <div className="flex items-center text-retrobrown border-2 border-retrobrown p-3 rounded-sm shadow-border gap-3">
              <i className="las la-user-plus text-3xl"></i>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                className="placeholder:text-retrobrown w-full font-medium"
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
                className="placeholder:text-retrobrown w-full font-medium"
              />
            </div>
          </form>

          <button
            onClick={handleRegister}
            className="border flex w-1/2 bg-retrored items-center justify-center translate-x-[-1px] translate-y-[-1px]
            shadow-border hover:bg-red-500 duration-300
            p-2 rounded-sm cursor-pointer text-retrobrown transition-all gap-0.5"
          >
            <p className="text-xl font-medium text-retrowhite">Registrar</p>
          </button>

          <p className="text-center text-retrobrown font-semibold tracking-[-1px]">
            Se já possui uma conta, {' '}
            <Link
              href={"/login"}
              className="underlinecss text-blue underline font-bold cursor-pointer"
            >
              entre aqui.
            </Link>
          </p>
        </div>

        <div className="bg-retrored w-2/5 h-screen border-l-3 border-retroyellow flex flex-col justify-center items-center">
          <div className="absolute left-0 w-24 h-24 rotate-9">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-12 h-40 bg-retroyellow rounded-full"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                }}
              />
            ))}
          </div>
          <div className="absolute grid grid-cols-2 gap-0 w-32 h-32 bg-retroyellow right-0">
            <div className="bg-retrored rounded-br-full" />
            <div className="bg-retrored rounded-bl-full" />
            <div className="bg-retrored rounded-tr-full" />
            <div className="bg-retrored rounded-tl-full" />
          </div>
          <p className="text-retrowhite text-stroke text-7xl font-extrabold tracking-tighter drop-shadow-[6px_6px_0_black]">
            Primeira vez <br />
            por aqui?
          </p>
        </div>
      </section>
    </main>
  );
}
