import { IPost } from '@/models/definitions';
import React from 'react';

const DefaultLayout: React.FC<{posts: IPost[]}> = ({ posts }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Meu Portfólio</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border rounded-lg p-4 shadow-md bg-white hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold mb-2 text-slate-950">{post.title}</h3>
                <p className="text-gray-600 text-justify">
                  <div dangerouslySetInnerHTML={{__html: post.content}} />
                </p>
              </div>
            ))}
          </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        © {new Date().getFullYear()} Meu Nome. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default DefaultLayout;
