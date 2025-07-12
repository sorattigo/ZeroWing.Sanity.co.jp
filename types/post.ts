export interface Category {
  _id: string;
  title: string;
  color?: string;
  description?: string;
}

export interface Tag {
  _id: string;
  title: string;
  description?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: any;
  publishedAt: string;
  categories?: Category[];
  tags?: string[];
  body?: any;
}

export interface PostListProps {
  posts: Post[];
}

export interface PostCardProps {
  post: Post;
}

export interface CategoryListProps {
  categories: Category[];
  activeCategory?: string;
}

export interface TagListProps {
  tags: string[];
  activeTag?: string;
}
