import MateriaPageClient from './materia-page';

const data = {
  linguaportuguesa: { title: 'portugues' },
  matematica: { title: 'matematica' },
};

interface Props {
  params: { name: string };
}

export async function generateStaticParams() {
  return Object.keys(data).map((name) => ({ name }));
}

export default function Page({ params }: Props) {
  return <MateriaPageClient name={params.name} />;
}
