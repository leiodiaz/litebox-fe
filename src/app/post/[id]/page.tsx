'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CardPost from '@/components/CardPost';
import TopicChip from '@/components/TopicChip';
import Button from '@/components/Button';
import MostViewed from '@/components/MostViewed';
import { api } from '@/lib/api';
import { ARTICLE_CONTENT } from '@/lib/content';
import { Post } from '@/types';

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
      <div className="min-h-screen bg-bg">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-bg">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray">Post not found</p>
            <Link href="/" className="text-primary hover:underline mt-4 inline-block">
              Go back to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Back button */}
            <Link href="/" className="text-primary hover:opacity-80 mb-6 inline-block font-semibold">
              &larr; Back to all posts
            </Link>

            {/* Article Header */}
            <article className="bg-white rounded-[5px] shadow-sm overflow-hidden mb-8">
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
                    <TopicChip key={index}>
                      {tag}
                    </TopicChip>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-[35px] font-bold text-black mb-4 font-['Space_Grotesk']">
                  {post.title}
                </h1>

                {/* Author and metadata */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
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
                      <p className="font-medium text-black">{post.author?.name}</p>
                      <p className="text-sm text-gray">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  {post.readTime && (
                    <span className="text-gray">{post.readTime} min read</span>
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

            {/* Social Sharing */}
            <div className="bg-white rounded-[5px] border border-border p-6 mb-8">
              <h3 className="font-semibold text-black mb-4">Share this article</h3>
              <div className="flex gap-4">
                <Button variant="primary-black">Facebook</Button>
                <Button variant="primary-black">Twitter</Button>
                <Button variant="primary-black">LinkedIn</Button>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="py-8">
                <h2 className="text-[35px] font-bold text-black mb-8 font-['Space_Grotesk']">Related posts</h2>
                <div className="flex flex-col md:flex-row gap-8">
                  {relatedPosts.slice(0, 3).map(relatedPost => (
                    <div key={relatedPost.id} className="flex-1">
                      <CardPost 
                        id={parseInt(relatedPost.id, 10)}
                        title={relatedPost.title}
                        imageUrl={relatedPost.imageUrl}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <MostViewed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
