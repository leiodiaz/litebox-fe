'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link 
      href={`/article/${article.id}`}
      className="group block overflow-hidden rounded-lg bg-card hover:shadow-lg transition-all duration-300"
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
        <div className="inline-block px-3 py-1 bg-primary text-black text-xs font-semibold rounded mb-3">
          Technology
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 mb-3">
          {article.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-900 font-semibold text-sm group-hover:text-primary transition-colors">
            <span>Read</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <Clock className="w-3 h-3" />
            <span className="text-xs">6 mins</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
