export default function Page() {
  return (
    <main className="w-full min-h-screen py-5 px-4 sm:pr-5">
      <article className="bg-gray-back w-full mt-5 px-4 sm:px-8 py-5 rounded-xl h-auto flex gap-10">
        <section className="w-full h-auto">
          <div className="bg-white w-full h-auto p-10 rounded-2xl flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <p className="font-semibold text-md">QUESTÃO 1 - Linguagens</p>
                <button>
                  <i className="las la-edit text-black/50 text-2xl hover:cursor-pointer hover:text-black"></i>
                </button>
              </div>
              <p className="text-md text-justify ">
                É fundamentalmente no Minho, norte de Portugal, que o cavaquinho
                aparece como instrumento tipicamente popular, ligado às formas
                essenciais da música característica dessa província. O
                cavaquinho minhoto tem escala rasa com o tampo, o que facilita a
                prática do “rasqueado”. O cavaquinho chega ao Brasil diretamente
                de Portugal, e o modelo brasileiro é maior do que a sua versão
                portuguesa, com uma caixa de ressonância mais funda. Semelhante
                ao cavaquinho minhoto, o machete, ou machetinho madeirense, é um
                pequeno cordófono de corda dedilhada, que faz parte da grande e
                diversificada família das violas de mão portuguesas. O ukulele
                tem a sua origem no século XIX, tendo como ancestrais o
                braguinha (ou machete) e o rajão, instrumentos levados pelos
                madeirenses quando eles emigraram para o Havaí.
              </p>
              <p className="text-sm text-right text-black/80">
                OLIVEIRA, E. V. Cavaquinhos e família. Disponível em:
                https://casadaguitarra.pt. Acesso em: 18 nov. 2021 (adaptado).
              </p>
            </div>
            <div className="QuestaoEAlternativas">
              <p className="py-2">
                O conjunto dessas práticas musicais demonstra que os
                instrumentos mencionados no texto
              </p>

              <div className="Alternativas flex gap-1.5 items-center my-2">
                <button className="Alternativa">
                  <p className="w-9 h-9 flex items-center justify-center text-black/50 border-black/50 border text-xl rounded-full hover:cursor-pointer hover:border-black hover:text-black">
                    <i className="las la-socks"></i>
                  </p>
                </button>
                <button className="Alternativa">
                  <p className="w-9 h-9 flex items-center justify-center text-black text-xl rounded-full border border-black hover:cursor-pointer hover:bg-black hover:text-white">
                    A
                  </p>
                </button>

                <p className="m-1">
                  refletem a dependência da utilização de matéria-prima
                  europeia.
                </p>
                <button className="cut">
                  <i className="las la-cut p-1.5 border-1 border-white hover:rounded-full text-black/50 text-2xl hover:border-black hover:border-1 hover:cursor-pointer hover:text-black"></i>
                </button>
              </div>

              <div className="Alternativas my-2 flex gap-1.5 items-center">
                <button className="Alternativa">
                  <p className="w-9 h-9 flex items-center justify-center text-black/50 border-black/50 border text-xl rounded-full hover:cursor-pointer hover:border-black hover:text-black">
                    <i className="las la-socks"></i>
                  </p>
                </button>
                <button className="Alternativa">
                  <p className="w-9 h-9 flex items-center justify-center text-black text-xl rounded-full border border-black hover:cursor-pointer hover:bg-black hover:text-white">
                    B
                  </p>
                </button>
                <p className="m-1">
                  adaptam suas características a cada cultura, assumindo nova
                  identidade.
                </p>
                <button className="cut">
                  <i className="las la-cut p-1.5 border-1 border-white hover:rounded-full text-black/50 text-2xl hover:border-black hover:border-1 hover:cursor-pointer hover:text-black"></i>
                </button>
              </div>

              <div className="Alternativas my-2 flex gap-1.5 items-center">
                <button className="Alternativa">
                  <p className="w-9 h-9 flex items-center justify-center text-black/50 border-black/50 border text-xl rounded-full hover:cursor-pointer hover:border-black hover:text-black">
                    <i className="las la-socks"></i>
                  </p>
                </button>
                <button className="Alternativa">
                  <p className="w-9 h-9 flex items-center justify-center text-black text-xl rounded-full border border-black hover:cursor-pointer hover:bg-black hover:text-white">
                    C
                  </p>
                </button>

                <p className="m-1">
                  comprovam a hegemonia portuguesa na invenção de cordófonos
                  dedilhados.
                </p>
                <button className="cut">
                  <i className="las la-cut p-1.5 border-1 border-white hover:rounded-full text-black/50 text-2xl hover:border-black hover:border-1 hover:cursor-pointer hover:text-black"></i>
                </button>
              </div>

              <div className="Alternativas my-2 flex gap-1.5 items-center">
                <button className="Alternativa">
                  <p className="w-9 h-9 flex items-center justify-center text-black/50 border-black/50 border text-xl rounded-full hover:cursor-pointer hover:border-black hover:text-black">
                    <i className="las la-socks"></i>
                  </p>
                </button>
                <button className="Alternativa">
                  <p className="w-9 h-9 flex items-center justify-center text-black text-xl rounded-full border border-black hover:cursor-pointer hover:bg-black hover:text-white">
                    D
                  </p>
                </button>
                <p className="m-1">
                  ilustram processos de dominação cultural, evidenciando
                  situações de choque cultural.
                </p>
                <button className="cut">
                  <i className="las la-cut p-1.5 border-1 border-white hover:rounded-full text-black/50 text-2xl hover:border-black hover:border-1 hover:cursor-pointer hover:text-black"></i>
                </button>
              </div>

              <div className="Alternativas my-2 flex gap-1.5 items-center">
                <button className="Alternativa">
                  <p className="w-9 h-9 flex items-center justify-center text-black/50 border-black/50 border text-xl rounded-full hover:cursor-pointer hover:border-black hover:text-black">
                    <i className="las la-socks"></i>
                  </p>
                </button>
                <button className="Alternativa">
                  <p className="w-9 h-9 flex items-center justify-center text-black text-xl rounded-full border border-black hover:cursor-pointer hover:bg-black hover:text-white">
                    E
                  </p>
                </button>
                <p className="m-1">
                  mantêm nomenclatura própria para garantir a fidelidade às
                  formas originais de confecção.
                </p>
                <button className="cut">
                  <i className="las la-cut p-1.5 border-1 border-white hover:rounded-full text-black/50 text-2xl hover:border-black hover:border-1 hover:cursor-pointer hover:text-black"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="h-auto rounded-2xl flex flex-col gap-5">
          <div className=" p-10 rounded-xl bg-white">
            <p className="font-semibold mb-3">ENEM 2024 - Simulado</p>
            <p>Progresso</p>
            <div className="w-full rounded-full bg-gray-200 h-6 my-1 "></div>
            <p className="text-sm text-black/80">0/45 questoes respondidas</p>
            <div className="flex mt-2 justify-center gap-x-2">
              <button className="w-14 h-8 flex items-center justify-center rounded-md border border-black text-sm text-white bg-black">
                01-05
              </button>
              <button className="w-14 h-8 flex items-center justify-center rounded-md border border-black text-sm">
                06-10
              </button>
              <button className="w-14 h-8 flex items-center justify-center rounded-md border border-black text-sm">
                11-15
              </button>
              <button className="w-14 h-8 flex items-center justify-center rounded-md border border-black text-sm">
                16-20
              </button>
              <button className="w-14 h-8 flex items-center justify-center rounded-md border border-black text-sm">
                21-25
              </button>
              <button className="w-14 h-8 flex items-center justify-center rounded-md border border-black text-sm">
                26-30
              </button>
              <button className="w-14 h-8 flex items-center justify-center rounded-md border border-black text-sm">
                31-35
              </button>
              <button className="w-14 h-8 flex items-center justify-center rounded-md border border-black text-sm">
                36-40
              </button>
              <button className="w-14 h-8 flex items-center justify-center rounded-md border border-black text-sm">
                41-45
              </button>
            </div>
            <div className="flex mt-3">
              <div>
                <p className="font-semibold mb-2">Gabarito sessao 01-05</p>
                <div className="flex gap-2">
                  <div className="flex w-8 rounded-md flex-col items-center justify-center border-black border-1 space-y-[-5px] bg-black text-white">
                    <p>A</p>
                    <p className="text-sm text-white/60">01</p>
                  </div>
                  <div className="flex w-8 rounded-md flex-col items-center justify-center border-black border-1 space-y-[-5px]">
                    <p>?</p>
                    <p className="text-sm text-black/60">02</p>
                  </div>
                  <div className="flex w-8 rounded-md flex-col items-center justify-center border-black border-1 space-y-[-5px]">
                    <p>?</p>
                    <p className="text-sm text-black/60">03</p>
                  </div>
                  <div className="flex w-8 rounded-md flex-col items-center justify-center border-black border-1 space-y-[-5px]">
                    <p>?</p>
                    <p className="text-sm text-black/60">04</p>
                  </div>
                  <div className="flex w-8 rounded-md flex-col items-center justify-center border-black border-1 space-y-[-5px]">
                    <p>?</p>
                    <p className="text-sm text-black/60">05</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2  ml-auto">
                <div className="flex items-center gap-2 text-lg  ml-auto">
                  <p className="border-b-1">Meta</p>
                  <div className="flex w-25 text-lg rounded-md justify-center items-center gap-1 border-1 border-black">
                    <p>1:45:00</p>
                    <i className="las la-eye-slash"></i>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-lg  ml-auto">
                  <p className="border-b-1">Seu</p>
                  <div className="flex w-25 text-lg rounded-md justify-center items-center gap-1 border-1 border-black">
                    <p>*:**:**</p>
                    <i className="las la-eye"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-full h-120 p-10 rounded-2xl flex flex-col gap-5">
            <div className="flex items-center justify-evenly">
              <div className="flex gap-1 items-center">
                <i className="las la-edit text-2xl"></i>
                <p>Riscar</p>
                <i className="las la-question-circle text-xl"></i>
              </div>
              <div className="flex gap-1 items-center">
                <i className="las la-cut text-2xl"></i>
                <p>Cortar</p>
                <i className="las la-question-circle text-xl"></i>
              </div>
              <div className="flex gap-1 items-center">
                <i className="las la-socks text-2xl"></i>
                <p>Chutar</p>
                <i className="las la-question-circle text-xl"></i>
              </div>
              <div className="flex gap-1 items-center">
                <i className="las la-chalkboard text-2xl"></i>
                <p>Rascunho</p>
                <i className="las la-question-circle text-xl"></i>
              </div>
            </div>
            <div className="w-full h-full border-4 rounded-2xl border-gray-300">
              <i className="las la-chalkboard p-2 text-2xl"></i>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
