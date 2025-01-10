import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ICategoria, IPost } from '@/models/definitions';
import { configApp } from '@/config/config';
import { headers } from 'next/headers';



interface Props {
  categories: ICategoria[];
  defaultPosts: IPost[];
}

const CategoriesPage: React.FC<Props> = ({ categories, defaultPosts }) => {

const [currentPosts, setCurrentPosts] = useState<IPost[]>(defaultPosts);
const [selectedCategory, setSelectedCategory] = useState<string | null>(
  categories.find((cat) => cat.home)?.slug || null
);

  const handleCategoryClick = async (slug: string) => {
    const url = `${configApp.api.urlBase}${configApp.routes.postsPorCategoria}/${slug}`
    console.log('url', url, slug)
    setSelectedCategory(slug);

    try {
      const res = await fetch(url)
      if(!res.ok) {
        alert(`Error: [${res.status}] [${res.statusText}]`)
      }

      const posts = await res.json();
      console.log('setPost', posts)
      setCurrentPosts(posts);
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className='flex flex-col h-screen' >
      <nav className='flex items-center justify-around bg-gray-800 text-white py-4 sticky top-0 z-10'>
          {categories.map((category) => (
              <button 
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === category.slug
                ? 'bg-gray-600'
                : 'hover:bg-gray-600'
              }`}
              >
                {category.descricao}
              </button>
          ))
          }
      </nav>

      <main className="flex-grow overflow-y-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedCategory
            ? `Postagens da Categoria: ${categories.find(
                (cat) => cat.slug === selectedCategory
              )?.descricao}`
            : 'Postagens da Home'}
        </h2>
        <ul className="space-y-4">
          {currentPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/categorias/posts/${post.id}`}
              className="text-blue-500 hover:underline"
              >
                {post.title}
              </Link><br></br>
              <strong>{post.content}</strong>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const resCategories = await fetch(`${'http://localhost:3001'}/categorias`);
  const categories: ICategoria[] = await resCategories.json();

  const homeCategory = categories.find((cat) => cat.home);
  const resPosts = homeCategory
    ? await fetch(`${'http://localhost:3001'}/posts/findAllPostsFromCategoria/${homeCategory.id}`)
    : [];

 
  const defaultPosts = homeCategory ? 
    await (resPosts as Response).json()
   : 
    [];

  return {
    props: {
      categories,
      defaultPosts,
    },
    revalidate: 10, // Revalidação a cada 10 segundos
  };
};

export default CategoriesPage;
