import Link from 'next/link';
import { useRouter } from 'next/router';
import { Category } from '@/types/post';

interface CategoriesProps {
  categories: Category[];
  activeCategory?: string;
}

export default function Categories({ categories, activeCategory }: CategoriesProps) {
  const router = useRouter();
  
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link 
        href="/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !activeCategory 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        すべて
      </Link>
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/category/${encodeURIComponent(category.title)}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category.title
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          style={{
            backgroundColor: activeCategory === category.title ? category.color : '',
            color: activeCategory === category.title ? '#fff' : '',
          }}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
}
