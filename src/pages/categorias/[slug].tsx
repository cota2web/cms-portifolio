import { ICategoria, IPost } from '@/models/definitions';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

interface Props {
  category: ICategoria;
  posts: IPost[];
}

const CategoryPage: React.FC<Props> = ({ category, posts }) => {
  return (
    <div>
      <h1>Categoria: {category.descricao}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/categories/${category.descricao}/posts/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${'http://localhost:3001'}/categoria`);
  const categories = await res.json();

  const paths = categories.map((category: { slug: string }) => ({
    params: { slug: category.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const resCategory = await fetch(`${'http://localhost:3001'}/categoria/${slug}`);
  const category = await resCategory.json();

  const resPosts = await fetch(`${'http://localhost:3001'}/categoria/posts/${slug}`);
  const posts = await resPosts.json();

  return {
    props: {
      category,
      posts,
    },
    revalidate: 10,
  };
};

export default CategoryPage;
