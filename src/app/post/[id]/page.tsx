'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArticleCard from '@/components/ArticleCard';
import { api } from '@/lib/api';
import { ARTICLE_CONTENT } from '@/lib/content';
import { Post } from '@/types';
import { Article } from '@/types/article';

// Helper function to convert Post to Article
function postToArticle(post: Post): Article {
  return {
    id: parseInt(post.id, 10),
    title: post.title,
    imageUrl: post.imageUrl,
    userId: 1,
    createdAt: post.createdAt
  };
}

export default function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!params.id) return;
      
      try {
        const [postData, latestPosts] = await Promise.all([
          api.getPost(params.id as string),
          api.getLatestPosts(3),
        ]);
        
        setPost(postData);
        // Filter out current post from related posts
        setRelatedPosts(latestPosts.filter(p => p.id !== params.id));
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Post not found</p>
            <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
              Go back to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
            &larr; Back to all posts
          </Link>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="relative h-96 w-full">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-8">
              {/* Tags */}
              <div className="flex items-center gap-2 mb-4">
                {post.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              {/* Author and metadata */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b">
                <div className="flex items-center gap-3">
                  {post.author?.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{post.author?.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                {post.readTime && (
                  <span className="text-gray-500">{post.readTime} min read</span>
                )}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {ARTICLE_CONTENT}
                </ReactMarkdown>
              </div>
            </div>
          </article>

          {/* Social Sharing (Static) */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Share this article</h3>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Facebook
              </button>
              <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
                Twitter
              </button>
              <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                LinkedIn
              </button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.slice(0, 3).map(relatedPost => (
                  <ArticleCard key={relatedPost.id} article={postToArticle(relatedPost)} />
                ))}
              </div>
            </div>
          )}

          {/* Most Viewed (Static) */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Most Viewed</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border-b last:border-b-0 pb-4 last:pb-0">
                  <h4 className="font-medium text-gray-900">Most Viewed Article {i}</h4>
                  <p className="text-sm text-gray-600">Static content placeholder</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
