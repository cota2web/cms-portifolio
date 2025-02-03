import { configApp } from '@/config/config';
import { ICategoria } from '@/models/definitions';
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${configApp.api.urlBase}${configApp.routes.categorias}`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-zinc-800 text-white shadow-lg z-10 p-2">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hugo Meirelles</h1>
        <nav className="flex space-x-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 h-6 w-24 rounded animate-pulse"
                ></div>
              ))
            : categories.map((category) => (
                <a
                  key={category.id}
                  href={`/categorias/${category.id}`}
                  className="hover:underline"
                >
                  {category.descricao}
                </a>
              ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
