import { IPost } from '@/models/definitions';
import React from 'react';

const GridLayout: React.FC<{posts: IPost[]}> = ({ posts }) => {
  const items = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Grid Layout</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white p-4 rounded shadow-md hover:bg-blue-600"
          >
            <h1 className="text-2xl md:text-2xl font-extrabold mb-4">{post.title}</h1>
            <div 
                className="text-lg md:text-xl mb-8" 
                dangerouslySetInnerHTML={{__html: post.content}}>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLayout;
