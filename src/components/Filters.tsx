'use client';

import { useState } from 'react';

export default function Filters() {
  const categories = ['All', 'Technology', 'Design', 'Business', 'Lifestyle', 'Travel'];
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="w-full overflow-x-auto py-4 mb-8">
      <div className="flex gap-3 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-[5px] text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === category
                ? 'bg-violet text-white border border-violet'
                : 'bg-transparent border border-gray text-gray hover:border-violet hover:text-violet'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
