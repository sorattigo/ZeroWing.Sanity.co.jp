import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';
import { Post } from '@/types/post';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex flex-col space-y-2 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {post.mainImage && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories?.map((category) => (
            <span
              key={category._id}
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              {category.title}
            </span>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          <Link href={`/posts/${post.slug.current}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <time dateTime={post.publishedAt} className="text-sm text-gray-500">
            {formatDate(post.publishedAt)}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
