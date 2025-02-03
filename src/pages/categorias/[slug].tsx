import DefaultLayout from '@/components/DefaultLayout';
import GridLayout from '@/components/GridLayout';
import Header from '@/components/Header';
import HeroLayout from '@/components/HeroLayout';
import { configApp } from '@/config/config';
import { LayoutEnum } from '@/config/enums';
import { ICategoria, IPost } from '@/models/definitions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CategoriaPage: React.FC = () => {
  const router = useRouter();
  const catInicial: ICategoria = {
    id: ''
  }
  const { slug } = router.query;

  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoria, setCategoria] = useState(catInicial)

  useEffect(() => {
    if (!slug) return;

    const fetchPosts = async () => {
      try {
        const urlCategorias = `${configApp.api.urlBase}${configApp.routes.categorias}/${slug}`
        console.log('url: ', urlCategorias)
        
        const res = await fetch(`${configApp.api.urlBase}${configApp.routes.postsPorCategoria}/${slug}`);
        const data = await res.json();
        setPosts(data);
        const resCat = await fetch(urlCategorias);
        
        if(resCat.ok) {
          const dataCat = await resCat.json();
          console.log('url: ', urlCategorias, dataCat)
          setCategoria(dataCat)
        } else {
          console.error('Categoria não encontrada.')
        }
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [slug]);

  const renderLayout = () => {
    switch (categoria.layout) {      
      case LayoutEnum.GRID:
        return <GridLayout posts={posts}/>

      case LayoutEnum.HERO:
        return <HeroLayout posts={posts}/>

      default:
        return <DefaultLayout posts={posts} />
    }
  }

  return (
    <>
      <Header />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Categoria: {categoria.descricao}</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md bg-gray-200 animate-pulse h-48"
              ></div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div>
            {renderLayout()}
          </div>
        ) : (
          <p className="text-gray-500">Nenhum post encontrado para esta categoria.</p>
        )}
      </main>
    </>
  );
};

export default CategoriaPage;
