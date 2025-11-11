import { getRecentArticles } from '@/lib/api';
import CardPost from './CardPost';

interface RelatedPostsProps {
  excludeId: number;
}

export default async function RelatedPosts({ excludeId }: RelatedPostsProps) {
  const relatedPosts = await getRecentArticles(3, excludeId);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <h2 className="text-[35px] font-bold text-black mb-8 font-['Space_Grotesk']">Related posts</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {relatedPosts.map((post) => (
          <div key={post.id} className="flex-1">
            <CardPost 
              id={post.id}
              title={post.title}
              imageUrl={post.imageUrl}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
