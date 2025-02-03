import dynamic from 'next/dynamic';
import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Estilo do Quill Editor

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface RichTextEditorProps {
  value: string|undefined;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'], // Negrito, itálico, sublinhado e tachado
      [{ list: 'ordered' }, { list: 'bullet' }], // Listas
      [{ align: [] }], // Alinhamento
      ['link', 'image'], // Links e imagens
      ['clean'], // Remover formatação
    ],
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      theme="snow" // Tema do editor
      placeholder="Escreva o conteúdo do post."
      className='rounded-md bg-white text-black'
    />
  );
};

export default RichTextEditor;
