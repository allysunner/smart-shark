'use client'

import SubjectCard from "@/components/card/subject-card";
import SearchField from "@/components/ui/search-field";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";

const data = {
  linguaportuguesa: {
    title: 'portugues',
    subjects: {
      fonetica: {
        sequence: 1,
        fonema: {
          sequence: 1,
          title: 'fonema e letra',
          img: 'haha'
        },
        digrafo: {
          sequence: 4,
          title: 'dígrafo',
          img: 'teu cu'
        },
        gramatica: {
          sequence: 2,
          title: 'gramatica',
          img: 'haha'
        },
        funcoes: {
          sequence: 3,
          title: 'funcoes de linguagem',
          img: 'jaja'
        }
      },
      comunicacao: {
        sequence: 2,
        linguagem: {
          sequence: 5,
          title: 'linguagem, lingua e fala',
          img: 'kk'
        },
        fonema: {
          sequence: 1,
          title: 'fonema e letra',
          img: 'haha'
        },
        digrafo: {
          sequence: 4,
          title: 'dígrafo',
          img: 'teu cu'
        },
        gramatica: {
          sequence: 2,
          title: 'gramatica',
          img: 'haha'
        },
        funcoes: {
          sequence: 3,
          title: 'funcoes de linguagem',
          img: 'jaja'
        }
      }
    }
  }
}

export default function MateriaPage() {
  const params = useParams();
  const matter = data[String(params?.name) as keyof typeof data];

  const orderedSubjects = useMemo(() => {
    const arr: { sequence: number; title: string; img: string }[] = [];

    Object.values(matter.subjects).sort((a, b) => a.sequence - b.sequence) 
      .forEach((sub: any) => {
        Object.values(sub)
          .filter((x: any) => x?.sequence) 
          .sort((a: any, b: any) => a.sequence - b.sequence) 
          .forEach((subsub: any) => arr.push(subsub as any));
      });

    return arr;
  }, [matter]);

  const itemsPerPage = 5;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(orderedSubjects.length / itemsPerPage);

  const currentItems = orderedSubjects.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <main className="w-full min-h-screen">
      <section>
        <div className="flex">
          <div className="flex w-full h-auto flex-col gap-5 bg-[#c4c3e3] border-[#504e76] text-[#504e76] border-2 shadow-border m-5 rounded">
            <div className="flex w-full h-7 items-center bg-[#f791c3] rounded border-b-2">
              <p className="text-md font-pixel p-1 text-[#504e76]/80">
                <span className="font-extrabold">... </span>
                {matter.title}/assuntos.exe
              </p>
              <i className="las la-otter ml-auto text-2xl px-2"></i>
            </div>

            <div className="flex gap-5 px-5 pb-5">
              <button className="min-w-12 h-12 bg-[#f791c3] border-2 rounded-md flex items-center justify-center cursor-pointer">
                <i className="las la-angle-left text-2xl"></i>
              </button>

              <SearchField />

              <button className="w-13 h-12 bg-[#b6ace4] border-2 rounded-md shadow-border cursor-pointer">
                <i className="las la-headphones text-3xl"></i>
              </button>
              <button className="w-13 h-12 bg-[#ff552e]  border-2 rounded-md shadow-border cursor-pointer">
                <i className="las la-hand-rock text-3xl"></i>
              </button>
              <button className="w-13 h-12 bg-[#9bccdd] border-2 rounded-md shadow-border cursor-pointer">
                <i className="las la-eye text-3xl"></i>
              </button>
              <button className="w-13 h-12 bg-[#fed170] border-2 rounded-md shadow-border cursor-pointer">
                <i className="las la-book text-3xl"></i>
              </button>
            </div>

            <div className="flex w-full h-auto px-5 justify-between">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="bg-[#f791c3] tracking-tighter border-2 shadow-border py-2 px-4 text-lg font-medium rounded-md cursor-pointer disabled:grayscale"
              >
                Anterior
              </button>

              <div className="relative flex mx-5 w-full h-auto items-center justify-center">
                <div className="w-full h-0.5 bg-[#504e76] rounded-full"></div>
                <div className="absolute w-full flex justify-around items-center">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 border-2 rounded-full ${
                        i === page
                          ? "bg-[#f791c3] border-[#504e76]"
                          : "bg-[#504e76] border-[#504e76]"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="bg-[#f791c3] tracking-tighter border-2 shadow-border py-2 px-4 text-lg font-medium rounded-md cursor-pointer disabled:grayscale"
              >
                Posterior
              </button>
            </div>

            <div className="flex justify-between gap-5 px-5 pb-5">
              {currentItems.map((sub, idx) => (
                <SubjectCard key={idx} title={sub.title} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
