import { Article, ArticleDetail } from '@/types/article';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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
    return [];
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
    return null;
  }
}

export async function createArticle(data: FormData): Promise<Article | null> {
  try {
    const title = data.get('title') as string;
    const image = data.get('image') as File;
    
    // For now, we'll create a simple object with hardcoded data
    // In production, you'd upload the image and get a URL
    const article = {
      title,
      userId: 1, // Hardcoded as per requirements
      imageUrl: image ? URL.createObjectURL(image) : '/placeholder.jpg'
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
    return [];
  }
}
