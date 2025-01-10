import { configApp } from '@/config/config';
import { ICategoria } from '@/models/definitions';
import { useState, useEffect } from 'react';



const CategoriesAdmin = () => {
  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  // Carregar categorias do backend
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${configApp.api.urlBase}${configApp.routes.categorias}`);
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // Adicionar nova categoria
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return alert('Nome da categoria é obrigatório');

    setLoading(true);
    try {
      const res = await fetch(`${configApp.api.urlBase}${configApp.routes.categorias}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (res.ok) {
        const newCategory = await res.json();
        setCategories([...categories, newCategory]);
        setNewCategoryName('');
      } else {
        alert('Erro ao criar categoria');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao criar categoria');
    } finally {
      setLoading(false);
    }
  };

  // Remover categoria
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;

    setLoading(true);
    try {
      const res = await fetch(`${configApp.api.urlBase}${configApp.routes.categorias}/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setCategories(categories.filter((cat) => cat.id !== id));
      } else {
        alert('Erro ao excluir categoria');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir categoria');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Categorias</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Nome da nova categoria"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border p-2 rounded-md mr-2 text-black"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Adicionando...' : 'Adicionar'}
        </button>
      </div>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between border p-4 rounded-md"
          >
            <span>{category.descricao}</span>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? 'Excluindo...' : 'Excluir'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesAdmin;
