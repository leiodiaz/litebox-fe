import { getRecentArticles } from '@/lib/api';
import ArticleCard from './ArticleCard';

interface RelatedPostsProps {
  excludeId: number;
}

export default async function RelatedPosts({ excludeId }: RelatedPostsProps) {
  const relatedPosts = await getRecentArticles(3, excludeId);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <ArticleCard key={post.id} article={post} />
        ))}
      </div>
    </div>
  );
}
