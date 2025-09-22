"use client";

import CategoryCard from "@/components/card/category-card";
import MaterialCard from "@/components/card/material-card";
import SearchField from "@/components/ui/search-field";
import WidgetModal from "@/components/modal/widget-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const materials: MaterialsByCategory = {
  linguagens: {
    portugues: { 
      title: 'Língua Portuguesa', 
      description: 'volta lily', 
      color: 'retroblue', 
      questionTotal: 24, 
      questionAsked: 12,
      href: 'linguaportuguesa'
    },
    artes: { 
      title: 'Artes', 
      description: 'volta vida volta', 
      color: 'retroblue', 
      questionTotal: 23, 
      questionAsked: 0,
      href: 'artes'
    },
    linguaEstrangeira: { 
      title: 'Língua Estrangeira', 
      description: 'aprenda idiomas', 
      color: 'retroblue', 
      questionTotal: 20, 
      questionAsked: 0,
      href: 'linguaestrangeira'
    },
    educacaoFisica: { 
      title: 'Educação Física', 
      description: 'movimente-se', 
      color: 'retroblue', 
      questionTotal: 15, 
      questionAsked: 0,
      href: 'educacaofisica'
    },
    matematica: { 
      title: 'Matemática', 
      description: 'números e lógica', 
      color: 'retroblue', 
      questionTotal: 25, 
      questionAsked: 0,
      href: 'matematica'
    },
  },
  exatas: {
    fisica: { 
      title: 'Física', 
      description: 'leis do universo', 
      color: 'retrogreen', 
      questionTotal: 20, 
      questionAsked: 0,
      href: 'fisica'
    },
    quimica: { 
      title: 'Química', 
      description: 'transformações e reações', 
      color: 'retrogreen', 
      questionTotal: 18, 
      questionAsked: 0,
      href: 'quimica'
    },
    biologia: { 
      title: 'Biologia', 
      description: 'vida e natureza', 
      color: 'retrogreen', 
      questionTotal: 22, 
      questionAsked: 0,
      href: 'biologia'
    }
  },
  humanas: {
    geografia: { 
      title: 'Geografia', 
      description: 'mapas e lugares', 
      color: 'retrored', 
      questionTotal: 20, 
      questionAsked: 0,
      href: 'geografia'
    },
    sociologia: { 
      title: 'Sociologia', 
      description: 'sociedade e cultura', 
      color: 'retrored', 
      questionTotal: 18, 
      questionAsked: 0,
      href: 'sociologia'
    },
    historia: { 
      title: 'História', 
      description: 'passado e presente', 
      color: 'retrored', 
      questionTotal: 23, 
      questionAsked: 0,
      href: 'historia'
    },
    filosofia: { 
      title: 'Filosofia', 
      description: 'reflexão e pensamento', 
      color: 'retrored', 
      questionTotal: 16, 
      questionAsked: 0,
      href: 'filosofia'
    }
  }
};

interface Material {
  title: string;
  description: string;
  color: string;
  questionTotal: number;
  questionAsked: number;
  href: string;
}

interface MaterialsByCategory {
  [category: string]: {
    [key: string]: Material;
  };
}

export default function Home() {
const router = useRouter();
const categories = Object.keys(materials) as (keyof MaterialsByCategory)[];
const [activeIndex, setActiveIndex] = useState<number>(0);
const [ modalOpen, setModalOpen ] = useState(false)

const activeCategory = categories[activeIndex]; 
const activeMaterials = Object.values(materials[activeCategory]); 


  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
    <main className="w-full min-h-screen">
      <div className="flex min-h-full">
        <div className="flex-1 p-5">
          <SearchField />

          <button onClick={() => setModalOpen(!modalOpen)}>Modal</button>
        </div>

        <aside className="w-2/7 min-h-full border-l border-retrobrown p-4 overflow-auto">
          <div className="flex justify-between p-3 items-center">
            <div>
              <button className="flex items-center p-2 rounded bg-retroblue border shadow-[1.5px_1.5px_0px_0px_black] cursor-pointer">
                <i className="las la-bell text-retrowhite text-2xl"></i>
              </button>
            </div>
            <div className="flex text-right gap-2 items-center">
              <div className="flex flex-col">
                <span className="font-medium">ally gostoso</span>
                <span className="text-xs">andersonparentes020@gmail.com</span>
              </div>
              <div className="rounded-full w-14 h-14 border-1 border-black bg-retrogreen"></div>
            </div>
          </div>

          <CategoryCard category={String(activeCategory)} color={'retroyellow'} onClickLeft={handlePrev} onClickRight={handleNext}/>

          <div className="flex flex-col gap-3 p-3 w-full">
            {activeMaterials.map((mat, i) => (
              <MaterialCard
                key={i}
                title={mat.title}
                description={mat.description}
                color={mat.color}
                questionTotal={mat.questionTotal}
                questionsAsked={mat.questionAsked}
                onClick={() => router.push(`/material/${mat.href}`)}
              />
            ))}
          </div>
        </aside>
      </div>
    </main>

    {modalOpen && <WidgetModal onClose={() => setModalOpen(false)} />}
    </> 
  );
}
