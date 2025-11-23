import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Polyfill Buffer for the browser
if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  headerImage?: string;
  tags?: string[];
}

export const getBlogs = async (): Promise<BlogPost[]> => {
  const modules = import.meta.glob('/src/blogs/*.md', { query: '?raw', import: 'default' });
  const blogs: BlogPost[] = [];

  for (const path in modules) {
    const content = await modules[path]();
    const { data, content: markdownContent } = matter(content as string);
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    blogs.push({
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      content: markdownContent,
      coverImage: data.coverImage,
      headerImage: data.headerImage,
      tags: data.tags || [],
    });
  }

  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  const blogs = await getBlogs();
  return blogs.find((blog) => blog.slug === slug) || null;
};
