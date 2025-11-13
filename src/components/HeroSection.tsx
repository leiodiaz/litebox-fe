'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/article';
import Button from './Button';

interface HeroSectionProps {
  article: Article;
}

export default function HeroSection({ article }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] overflow-hidden rounded-[5px] mb-8 bg-white">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-32">
        {/* Left side - Content */}
        <div className="pt-16 lg:pt-32 pb-16 pl-8 lg:pl-16 pr-8 lg:w-1/2">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray mb-4">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-black">Article</span>
          </nav>
          
          {/* Author */}
          <div className="text-sm text-gray mb-6">
            By <span className="font-semibold text-black">Tech Writer</span>
          </div>
          
          {/* Title */}
          <h1 className="text-[35px] font-bold text-black mb-6 leading-tight font-['Space_Grotesk']">
            {article.title}
          </h1>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href={`/article/${article.id}`}>
              <Button variant="primary-black" size="desktop-l">
                Read Article
              </Button>
            </Link>
            <Button variant="secondary" size="desktop-l">
              Share
            </Button>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="relative lg:w-1/2 min-h-[300px] lg:min-h-full">
          <Image
            src={article.imageUrl || '/placeholder.jpg'}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
