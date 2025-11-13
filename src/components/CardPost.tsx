import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';

interface CardPostProps {
  id: number;
  title: string;
  imageUrl?: string;
  tag?: string;
  readTime?: string;
}

export default function CardPost({ id, title, imageUrl, tag = 'Technology', readTime = '6 mins' }: CardPostProps) {
  return (
    <Link 
      href={`/post/${id}`}
      className="block bg-white rounded-[5px] overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <Image
          src={imageUrl || '/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div className="inline-block px-3 py-1 bg-accent text-black text-[14px] font-bold rounded-[5px] self-start">
          {tag}
        </div>
        <h3 className="text-[18px] font-bold text-black leading-tight line-clamp-2 font-['Space_Grotesk']">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-gray">
          <Clock className="w-3 h-3" />
          <span className="text-sm">{readTime}</span>
        </div>
      </div>
    </Link>
  );
}
