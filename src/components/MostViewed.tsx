'use client';

import { TrendingUp } from 'lucide-react';

export default function MostViewed() {
  const mostViewedPosts = [
    { id: 1, title: 'Getting Started with Next.js 14', views: '12.5K' },
    { id: 2, title: 'Building Modern UIs with Tailwind', views: '10.2K' },
    { id: 3, title: 'React Server Components Explained', views: '8.7K' },
    { id: 4, title: 'TypeScript Best Practices', views: '7.3K' },
    { id: 5, title: 'Web Performance Optimization', views: '6.1K' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Most Viewed</h3>
      </div>
      <div className="space-y-3">
        {mostViewedPosts.map((post, index) => (
          <div key={post.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
            <span className="text-2xl font-bold text-gray-300">{index + 1}</span>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{post.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
