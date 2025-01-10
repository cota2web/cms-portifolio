import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Painel Administrativo</h1>
        <div className="space-y-4">
          <Link href="/admin/categorias"
          className="block bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600"
          >
              Gerenciar Categorias
          </Link>
          <Link href="/admin/posts"
          className="block bg-green-500 text-white text-center py-2 px-4 rounded-md hover:bg-green-600"
          >
              Gerenciar Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
