import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleById } from '@/lib/api';
import RelatedPosts from '@/components/RelatedPosts';
import MostViewed from '@/components/MostViewed';
import TopicChip from '@/components/TopicChip';

// Sample markdown content for articles
const SAMPLE_MARKDOWN_CONTENT = `
# Article Content

This is a detailed article with rich content. The article demonstrates various markdown features including:

## Key Features

- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- Lists and structured content
- Code blocks and inline code

## Main Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Subsection

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

\`\`\`javascript
// Example code block
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

## Conclusion

This is an example of how markdown content is rendered in the article detail page. The content supports rich formatting and various markdown features.

> This is a blockquote highlighting important information.

For more information, check out the [documentation](#).
`;

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
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-[5px] shadow-sm overflow-hidden">
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
                <div className="mb-4">
                  <TopicChip>Technology</TopicChip>
                </div>
                
                <h1 className="text-[35px] font-bold text-black mb-4 font-['Space_Grotesk']">
                  {article.title}
                </h1>

                {article.createdAt && (
                  <div className="flex items-center gap-4 text-sm text-gray mb-8 pb-8 border-b border-border">
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
                    {SAMPLE_MARKDOWN_CONTENT}
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
