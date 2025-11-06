import { Post, PaginatedResponse } from '@/types';

// In-memory storage for posts (simulating a database)
let posts: Post[] = [];
let nextId = 1;

// Initialize with some sample posts
function initializeSamplePosts() {
  if (posts.length === 0) {
    const samplePosts: Omit<Post, 'id'>[] = Array.from({ length: 15 }, (_, i) => ({
      title: `Sample Article ${i + 1}`,
      imageUrl: 'https://litetech-assets.s3.us-east-2.amazonaws.com/Image.png',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sem in nunc porttitor dapibus.',
      tags: ['Technology', 'Innovation', 'Design'],
      readTime: 5,
      author: {
        name: 'John Doe',
        avatar: 'https://litetech-assets.s3.us-east-2.amazonaws.com/avatar.png',
      },
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    }));

    posts = samplePosts.map((post, index) => ({
      ...post,
      id: String(index + 1),
    }));
    nextId = posts.length + 1;
  }
}

initializeSamplePosts();

export const api = {
  async getPosts(page: number = 1, pageSize: number = 9): Promise<PaginatedResponse<Post>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedPosts = posts.slice(start, end);

    return {
      data: paginatedPosts,
      total: posts.length,
      page,
      pageSize,
      hasMore: end < posts.length,
    };
  },

  async getPost(id: string): Promise<Post | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return posts.find(post => post.id === id) || null;
  },

  async createPost(data: { title: string; imageUrl: string }): Promise<Post> {
    await new Promise(resolve => setTimeout(resolve, 100));

    const newPost: Post = {
      id: String(nextId++),
      title: data.title,
      imageUrl: data.imageUrl,
      tags: ['Technology', 'Innovation'],
      readTime: 5,
      author: {
        name: 'John Doe',
        avatar: 'https://litetech-assets.s3.us-east-2.amazonaws.com/avatar.png',
      },
      createdAt: new Date().toISOString(),
    };

    posts.unshift(newPost); // Add to beginning of array
    return newPost;
  },

  async getLatestPosts(limit: number = 3): Promise<Post[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return posts.slice(0, limit);
  },
};
