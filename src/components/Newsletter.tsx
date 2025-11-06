'use client';

import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 text-white">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Newsletter</h3>
      </div>
      <p className="text-blue-100 mb-4 text-sm">
        Subscribe to get the latest articles delivered to your inbox.
      </p>
      <form className="space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 outline-none"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
