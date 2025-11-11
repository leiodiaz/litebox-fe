import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleById } from '@/lib/api';
import { ARTICLE_CONTENT } from '@/lib/content';
import RelatedPosts from '@/components/RelatedPosts';
import MostViewed from '@/components/MostViewed';

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getArticleById(parseInt(id));

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Article Header Image */}
              <div className="relative aspect-[21/9] bg-gray-100">
                <Image
                  src={article.imageUrl || '/placeholder.jpg'}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
              </div>

              {/* Article Content */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {article.title}
                </h1>

                {article.createdAt && (
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
                    <time dateTime={article.createdAt}>
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                )}

                {/* Markdown Content */}
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {ARTICLE_CONTENT}
                  </ReactMarkdown>
                </div>
              </div>
            </article>

            {/* Related Posts */}
            <RelatedPosts excludeId={parseInt(id)} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <MostViewed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
