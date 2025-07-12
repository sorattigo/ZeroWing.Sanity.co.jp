'use client';

import { useEffect, useState } from 'react';
import { getPosts, getCategories, getPostsByCategory, getPostsByTag } from '@/lib/sanity/queries';
import type { Post, Category } from '@/types/post';
import PostCard from '@/components/PostCard';
import Categories from '@/components/Categories';
import Tags from '@/components/Tags';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [activeTag, setActiveTag] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch posts with optional filtering
        let postsData;
        if (activeCategory) {
          postsData = await getPostsByCategory(activeCategory);
        } else if (activeTag) {
          postsData = await getPostsByTag(activeTag);
        } else {
          postsData = await getPosts();
        }
        
        // Get all unique tags from posts
        const allTags = Array.from(
          new Set(postsData.flatMap((post: Post) => post.tags || []))
        ).sort() as string[];
        
        setPosts(postsData);
        setTags(allTags);
        
        // Fetch categories if not already loaded
        if (categories.length === 0) {
          const categoriesData = await getCategories();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory, activeTag]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow h-96">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {activeCategory 
            ? `カテゴリ: ${activeCategory}` 
            : activeTag 
              ? `タグ: ${activeTag}` 
              : '最新の記事'}
        </h1>
        
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">カテゴリ</h2>
            <Categories 
              categories={categories} 
              activeCategory={activeCategory} 
            />
          </div>
        )}
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">タグ</h2>
            <Tags 
              tags={tags} 
              activeTag={activeTag} 
            />
          </div>
        )}
        
        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              記事が見つかりませんでした。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
