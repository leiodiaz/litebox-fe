'use client';

export default function Filters() {
  const categories = ['All', 'Technology', 'Design', 'Business', 'Lifestyle', 'Travel'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
