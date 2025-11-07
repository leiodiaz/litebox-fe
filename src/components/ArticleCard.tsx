'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link 
      href={`/article/${article.id}`}
      className="group block overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <Image
          src={article.imageUrl || '/placeholder.jpg'}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.createdAt && (
          <p className="mt-2 text-sm text-gray-500">
            {new Date(article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
