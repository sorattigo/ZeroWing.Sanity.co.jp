import { groq } from 'next-sanity';
import { sanityClient } from './config';

export const getPosts = async () => {
  const query = groq`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->{title, color},
      "tags": tags[]->title
    }
  `;
  return await sanityClient.fetch(query);
};

export const getPostBySlug = async (slug: string) => {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      body,
      "categories": categories[]->{title, color},
      "tags": tags[]->title
    }
  `;
  return await sanityClient.fetch(query, { slug });
};

export const getCategories = async () => {
  const query = groq`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      description,
      color
    }
  `;
  return await sanityClient.fetch(query);
};

export const getTags = async () => {
  const query = groq`
    *[_type == "tag"] | order(title asc) {
      _id,
      title,
      description
    }
  `;
  return await sanityClient.fetch(query);
};

export const getPostsByCategory = async (category: string) => {
  const query = groq`
    *[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->{title, color},
      "tags": tags[]->title
    }
  `;
  return await sanityClient.fetch(query, { category });
};

export const getPostsByTag = async (tag: string) => {
  const query = groq`
    *[_type == "post" && $tag in tags[]->title] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->{title, color},
      "tags": tags[]->title
    }
  `;
  return await sanityClient.fetch(query, { tag });
};
