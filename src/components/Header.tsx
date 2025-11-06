'use client';

import { useState } from 'react';
import NewPostModal from './NewPostModal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">LiteBox</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Categories</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              </nav>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              New Post
            </button>
          </div>
        </div>
      </header>
      <NewPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
