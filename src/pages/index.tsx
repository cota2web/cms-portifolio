import Image from "next/image"



export default function Home() {
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col p-6 bg-red-500 h-full w-1/3 gap-3">
        <Image src={'globe.svg'} width={80} height={80} alt="Hugo Meirelles"/>
        <div className="flex flex-col">
          <strong className="text-white text-5xl w-full">Hugo Meirelles</strong>
          <span className="text-5xl">FullStack</span>
        </div>
      </div>
      <div className="bg-gray-50 p-5">
        <span className="text-black">
          <strong>Objetivo</strong>
          <p>
            Atuar na área de tecnologia da informação, agregando valor
            à equipe e ao trabalho, assegurando o alcance das metas e
            resultados de empresas públicas e privadas.
            Trabalhar como: Desenvolvedor FullStack NodeJs, NestJs e
            NextJs.
          </p>
        </span>
        <div className="bg-cyan-200 w-40 p-5 rounded-md hover:underline">
          <strong className="text-black font-bold">
            <a href="/categorias" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              Saiba mais...
            </a>
          </strong>

        </div>
      </div>
    </div>
      
  );
}
