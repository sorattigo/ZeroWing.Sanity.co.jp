import Link from 'next/link';
import { useRouter } from 'next/router';

interface TagsProps {
  tags: string[];
  activeTag?: string;
}

export default function Tags({ tags, activeTag }: TagsProps) {
  const router = useRouter();
  
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link 
        href="/"
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          !activeTag 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        すべて
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${encodeURIComponent(tag)}`}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeTag === tag
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
