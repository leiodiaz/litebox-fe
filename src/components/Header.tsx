'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import NewPostModal from './NewPostModal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handlePostCreated = () => {
    setIsModalOpen(false);
    // Refresh the current route to show the new post
    router.refresh();
  };

  return (
    <>
      <header className="bg-transparent sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold text-primary">✱</span>
              <span className="text-lg font-semibold text-white">lite-tech</span>
            </Link>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity text-sm font-semibold uppercase"
            >
              <span>New post</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </>
  );
}
