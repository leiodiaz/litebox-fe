export interface Post {
  id: string;
  title: string;
  imageUrl: string;
  excerpt?: string;
  tags?: string[];
  readTime?: number;
  author?: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  content?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
