'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Article } from '@/types/article';

interface HeroSectionProps {
  article: Article;
}

export default function HeroSection({ article }: HeroSectionProps) {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg mb-8">
      <Image
        src={article.imageUrl || '/placeholder.jpg'}
        alt={article.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-80 flex items-end">
        <div className="p-8 md:p-12 max-w-3xl">
          <div className="inline-block px-4 py-1 bg-primary text-black text-sm font-semibold rounded mb-4">
            Technology
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href={`/article/${article.id}`}
              className="flex items-center gap-2 text-white hover:text-primary transition-colors font-semibold"
            >
              <span>Read</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-1 text-text-secondary">
              <Clock className="w-4 h-4" />
              <span className="text-sm">6 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
