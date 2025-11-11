import { Article, ArticleDetail } from '@/types/article';
import { Post } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Mock data for development when API is unavailable
// Using data URLs to avoid external image dependencies
const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js 16',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%234F46E5" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="white" text-anchor="middle" dy=".3em"%3ENext.js 16%3C/text%3E%3C/svg%3E',
    userId: 1,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 2,
    title: 'Building Modern UIs with Tailwind CSS',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%230EA5E9" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="white" text-anchor="middle" dy=".3em"%3ETailwind CSS%3C/text%3E%3C/svg%3E',
    userId: 1,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 3,
    title: 'TypeScript Best Practices for React',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%233B82F6" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="white" text-anchor="middle" dy=".3em"%3ETypeScript%3C/text%3E%3C/svg%3E',
    userId: 1,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 4,
    title: 'React Server Components Explained',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%238B5CF6" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="white" text-anchor="middle" dy=".3em"%3EReact Server%3C/text%3E%3C/svg%3E',
    userId: 1,
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: 5,
    title: 'Web Performance Optimization Techniques',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%23EC4899" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="white" text-anchor="middle" dy=".3em"%3EPerformance%3C/text%3E%3C/svg%3E',
    userId: 1,
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: 6,
    title: 'Understanding React Hooks',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%23F59E0B" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="white" text-anchor="middle" dy=".3em"%3EReact Hooks%3C/text%3E%3C/svg%3E',
    userId: 1,
    createdAt: new Date(Date.now() - 518400000).toISOString(),
  },
  {
    id: 7,
    title: 'CSS Grid Layout Masterclass',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%2310B981" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="white" text-anchor="middle" dy=".3em"%3ECSS Grid%3C/text%3E%3C/svg%3E',
    userId: 1,
    createdAt: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    id: 8,
    title: 'API Design Best Practices',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%236366F1" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="white" text-anchor="middle" dy=".3em"%3EAPI Design%3C/text%3E%3C/svg%3E',
    userId: 1,
    createdAt: new Date(Date.now() - 691200000).toISOString(),
  },
  {
    id: 9,
    title: 'Modern JavaScript Features You Should Know',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%23F97316" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="white" text-anchor="middle" dy=".3em"%3EJavaScript%3C/text%3E%3C/svg%3E',
    userId: 1,
    createdAt: new Date(Date.now() - 777600000).toISOString(),
  },
];

export async function getArticles(page: number = 1, limit: number = 9): Promise<Article[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?_page=${page}&_limit=${limit}`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Return mock data for development
    const start = (page - 1) * limit;
    const end = start + limit;
    return MOCK_ARTICLES.slice(start, end);
  }
}

export async function getArticleById(id: number): Promise<ArticleDetail | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    // Return mock data for development
    const mockArticle = MOCK_ARTICLES.find(a => a.id === id);
    if (mockArticle) {
      return {
        ...mockArticle,
        content: '' // Content will be added in the component
      };
    }
    return null;
  }
}

export async function createArticle(data: FormData): Promise<Article | null> {
  try {
    const title = data.get('title') as string;
    // Image would be uploaded to storage service in production
    // const image = data.get('image') as File;
    
    // Create article object
    // Note: In production, you would upload the image to a storage service
    // and get back a permanent URL. For now, we use a placeholder.
    const article = {
      title,
      userId: 1, // Hardcoded as per requirements
      imageUrl: '/placeholder.jpg' // Placeholder - would be replaced with actual upload URL
    };
    
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create article');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating article:', error);
    return null;
  }
}

export async function getRecentArticles(limit: number = 3, excludeId?: number): Promise<Article[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?_sort=createdAt&_order=desc&_limit=${limit + (excludeId ? 1 : 0)}`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch recent articles');
    }
    
    const articles: Article[] = await response.json();
    
    // Filter out the current article if excludeId is provided
    return excludeId 
      ? articles.filter(article => article.id !== excludeId).slice(0, limit)
      : articles.slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    // Return mock data for development
    const filtered = excludeId 
      ? MOCK_ARTICLES.filter(article => article.id !== excludeId)
      : MOCK_ARTICLES;
    return filtered.slice(0, limit);
  }
}

// Helper function to convert Article to Post type
function articleToPost(article: Article | ArticleDetail): Post {
  return {
    id: article.id.toString(),
    title: article.title,
    imageUrl: article.imageUrl,
    createdAt: article.createdAt || new Date().toISOString(),
    content: 'content' in article ? article.content : undefined,
    tags: [],
    readTime: 5,
    author: {
      name: 'Admin',
      avatar: undefined
    }
  };
}

// API object with methods matching the expected interface
export const api = {
  async getPost(id: string): Promise<Post | null> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return null;
    }
    const article = await getArticleById(numericId);
    return article ? articleToPost(article) : null;
  },
  
  async getLatestPosts(limit: number): Promise<Post[]> {
    const articles = await getRecentArticles(limit);
    return articles.map(articleToPost);
  }
};
