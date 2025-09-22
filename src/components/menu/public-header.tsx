export default function HeaderPublic() {
  return (
    <header className="flex justify-between items-center w-full h-20 top-0 z-40 fixed pl-24 pr-24 bg-background bg-white border border-b-2">
      <h1 className="text-3xl text-retrored tracking-tighter">
        <span className="text-retrogreen font-semibold">+</span>Mais
        <span className="text-retroblue font-semibold">Edu</span>
      </h1>
      <nav>
      </nav>
      <ul className="text-2xl rounded w-36 h-10 font-sans text-center relative overflow-hidden z-10 m-4 items-center">
        <li className="font-medium list-none m-0 p-0 hover:text-background hover:font-bold">
          Entrar
          <span className="absolute w-1/4 h-full rounded-4xl -z-10"></span>
          <span className="absolute w-1/4 h-full rounded-4xl -z-10"></span>
          <span className="absolute w-1/4 h-full rounded-4xl -z-10"></span>
          <span className="absolute w-1/4 h-full rounded-4xl -z-10"></span>
        </li>
      </ul>
    </header>
  );
}
