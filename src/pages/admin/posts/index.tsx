import { configApp } from '@/config/config';
import { ICategoria, IPost } from '@/models/definitions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';

const PostsAdmin = () => {
  const router = useRouter();
  const postInicio: IPost = {
      id: '',
      title: '',
      content: '',
      createdAt: new Date(),
      categoriaId: '',
  };
  const [posts, setPosts] = useState<IPost[]>([]);
  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [newPost, setNewPost] = useState(postInicio);
  const [loading, setLoading] = useState(false);

  // Carregar posts e categorias do backend
  useEffect(() => {
    const urlCat = `${configApp.api.urlBase}${configApp.routes.categorias}`
    const fetchData = async () => {
      const postsRes = await fetch(`${configApp.api.urlBase}${configApp.routes.posts}`);
      const categoriesRes = await fetch(urlCat);
      const postsData = await postsRes.json();
      const categoriesData = await categoriesRes.json();
      console.log('categories:', categoriesData, 'urlCat:', urlCat)
      console.log('Posts', postsData)
      setPosts(postsData);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  // Adicionar novo post
  const handleAddPost = async () => {
    console.log('newPost: ', newPost)
    if (!newPost.title || !newPost.content || !newPost.categoriaId) {
      return alert('Todos os campos são obrigatórios.');
    }

    setLoading(true);
    try {
      const res = await fetch(`${configApp.api.urlBase}${configApp.routes.posts}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (res.ok) {
        const createdPost:IPost = await res.json();
        setPosts([...posts, createdPost]);
        setNewPost(createdPost);
      } else {
        alert('Erro ao criar post.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao criar post.');
    } finally {
      setLoading(false);
    }
  };

  // Remover post
  const handleDeletePost = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;

    setLoading(true);
    try {
      const res = await fetch(`${configApp.api.urlBase}${configApp.routes.posts}/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert('Erro ao excluir post.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir post.');
    } finally {
      setLoading(false);
    }
  };

  const handlerUpdatePost = async(id: string) => {
    if (!confirm('Tem certeza que deseja editar este post?')) return;

    setLoading(true);

    router.push(`/admin/posts/edit/${id}`)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Posts</h1>

      {/* Formulário para adicionar post */}
      <div className="mb-6 gap-y-5">
        <input
          type="text"
          placeholder="Título do post"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="border p-2 rounded-md mr-2 w-full mb-2 text-black"
        />
        <div className='bottom-5'>
          <RichTextEditor value={newPost.content} onChange={(valor) => setNewPost({ ...newPost, content: valor })}/>
        </div>
        <textarea
          hidden={true}
          placeholder="Conteúdo do post"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="border p-2 rounded-md mr-2 w-full mb-2 text-black"
        />
        <select
          value={newPost.categoriaId}
          onChange={(e) => setNewPost({ ...newPost, categoriaId: e.target.value})}
          className="border p-2 rounded-md mr-2 w-full mb-4 text-black"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            
            <option className='text-black' key={category.id} value={category.id}>
              {category.descricao}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddPost}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Adicionando...' : 'Adicionar Post'}
        </button>
      </div>

      {/* Listagem de posts */}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex items-center justify-between border p-4 rounded-md"
          >
            <div>
              <h2 className="text-lg font-bold">{post.title}</h2>
              <p dangerouslySetInnerHTML={{__html: post.content || ''}} />
              <strong>
                Categoria: {categories.find((cat) => cat.id === post.categoriaId)?.descricao || 'N/A'}
              </strong>
            </div>
            <div className='flex gap-4'>
              <button
                onClick={() => handlerUpdatePost(post.id || '')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? 'Editando...' : 'Editar'}
              </button>
              <button
                onClick={() => handleDeletePost(post.id || '')}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsAdmin;
