import MateriaPageClient from './materia-page';

const data = {
  linguaportuguesa: { title: 'portugues' },
  matematica: { title: 'matematica' },
};

export async function generateStaticParams() {
  return Object.keys(data).map((name) => ({ name }));
}

export default function Page({ params }: { params: { name: string } }) {
  return <MateriaPageClient name={params.name} />;
}
