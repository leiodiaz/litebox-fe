export interface Article {
  id: number;
  title: string;
  imageUrl: string;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleDetail extends Article {
  content: string;
}
