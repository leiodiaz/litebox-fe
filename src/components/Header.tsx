'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              LiteBox
            </Link>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PenSquare className="w-4 h-4" />
              <span>New Post</span>
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
