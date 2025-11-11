'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/types/article';
import { getArticles } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import ArticleCard from '@/components/ArticleCard';
import Filters from '@/components/Filters';
import Newsletter from '@/components/Newsletter';
import MostViewed from '@/components/MostViewed';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadInitialArticles = async () => {
      setLoading(true);
      const newArticles = await getArticles(1, 9);
      setArticles(newArticles);
      setHasMore(newArticles.length === 9);
      setLoading(false);
    };

    loadInitialArticles();
  }, []);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    const newArticles = await getArticles(nextPage, 9);
    setArticles(prev => [...prev, ...newArticles]);
    setHasMore(newArticles.length === 9);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {articles.length > 0 && !loading && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-text-secondary uppercase mb-4">Today story</h2>
            <HeroSection article={articles[0]} />
          </div>
        )}

        {/* Topics/Filters Bar */}
        <Filters />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(1).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {loading && articles.length === 0 && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {!loading && hasMore && articles.length > 0 && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-8 py-3 bg-primary text-black rounded-lg hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}

            {!loading && articles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary">No articles found. Create your first post!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <MostViewed />
          </div>
        </div>

        {/* Newsletter Section */}
        <Newsletter />
      </div>
    </div>
  );
}

