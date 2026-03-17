import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag as TagIcon, Target } from 'lucide-react';
import { articles } from '@/data/seed';
import type { Section } from '@/types';

function getSectionColor(section: Section): string {
  const colors: Record<Section, string> = {
    National: 'bg-blue-50 text-blue-700 border-blue-200',
    Economy: 'bg-amber-50 text-amber-700 border-amber-200',
    Agriculture: 'bg-green-50 text-green-700 border-green-200',
    Environment: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    GlobalAffairs: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return colors[section] || 'bg-gray-50 text-gray-700 border-gray-200';
}

export function Tag() {
  const { slug } = useParams<{ slug: string }>();
  
  const tagArticles = articles.filter(a => 
    a.tags.some(tag => tag.toLowerCase() === slug?.toLowerCase())
  );

  const tagName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : '';

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link 
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green transition-colors font-ui"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Header */}
      <header className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <TagIcon className="w-5 h-5 text-green" />
          <span className="text-sm font-medium text-green font-ui">Tag</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-green-dark capitalize">
          {tagName}
        </h1>
        <p className="text-gray-600 mt-2">
          {tagArticles.length} article{tagArticles.length !== 1 ? 's' : ''} tagged with "{tagName}"
        </p>
      </header>

      {/* Articles */}
      {tagArticles.length > 0 ? (
        <div className="space-y-6">
          {tagArticles.map(article => (
            <article key={article.id} className="border-b border-gray-100 pb-6 last:border-0">
              <Link to={`/${article.primarySection.toLowerCase()}/${article.slug}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded border font-ui ${getSectionColor(article.primarySection)}`}>
                    {article.primarySection}
                  </span>
                  {article.articleType === 'IntelligenceBrief' && (
                    <span className="brief-badge">
                      <Target className="w-3 h-3" />
                      Intelligence Brief
                    </span>
                  )}
                </div>
                
                <h3 className="font-display font-semibold text-xl text-green-dark hover:text-green transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center gap-3 mt-3 text-sm text-gray-500 font-ui">
                  <span>{article.author.name}</span>
                  <span>•</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                  <span>•</span>
                  <span>{article.readTime} min read</span>
                </div>
                
                {/* All Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {article.tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/tag/${tag}`}
                      className={`text-xs px-2 py-0.5 rounded font-ui transition-colors ${
                        tag.toLowerCase() === slug?.toLowerCase()
                          ? 'bg-green text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found with tag "{tagName}"</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 mt-4 text-green hover:text-green-dark font-ui"
          >
            Browse all articles
          </Link>
        </div>
      )}

      {/* Related Tags */}
      {tagArticles.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 font-ui">
            Related Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(tagArticles.flatMap(a => a.tags)))
              .filter(tag => tag.toLowerCase() !== slug?.toLowerCase())
              .slice(0, 12)
              .map(tag => (
                <Link
                  key={tag}
                  to={`/tag/${tag}`}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-green-light hover:text-green-dark transition-colors font-ui text-sm"
                >
                  {tag}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
