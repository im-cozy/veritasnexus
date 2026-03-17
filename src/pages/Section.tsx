import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Target } from 'lucide-react';
import { articles } from '@/data/seed';
import type { Section as SectionType } from '@/types';

const sectionDescriptions: Record<string, string> = {
  national: 'Politics, governance, defense, infrastructure, and law — the foundations of Philippine statehood.',
  economy: 'Trade, inflation, fiscal policy, business, and labor — tracking the nation\'s economic pulse.',
  agriculture: 'Crops, irrigation, farm technology, supply chains, and climate — the backbone of Philippine food security.',
  environment: 'Climate risks, land use, natural disasters, and conservation — preserving the archipelago for future generations.',
  'global-affairs': 'Geopolitics, ASEAN, South China Sea, diplomacy, and international trade — the Philippines in the world.',
};

const sectionTitles: Record<string, string> = {
  national: 'National',
  economy: 'Economy',
  agriculture: 'Agriculture',
  environment: 'Environment',
  'global-affairs': 'Global Affairs',
};

function getSectionColor(section: SectionType): string {
  const colors: Record<SectionType, string> = {
    National: 'bg-blue-50 text-blue-700 border-blue-200',
    Economy: 'bg-amber-50 text-amber-700 border-amber-200',
    Agriculture: 'bg-green-50 text-green-700 border-green-200',
    Environment: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    GlobalAffairs: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return colors[section] || 'bg-gray-50 text-gray-700 border-gray-200';
}

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <article className="group border-b border-gray-100 pb-6 last:border-0">
      <Link to={`/${article.primarySection.toLowerCase()}/${article.slug}`}>
        <div className="flex items-center gap-2 mb-2">
          {article.articleType === 'IntelligenceBrief' && (
            <span className="brief-badge">
              <Target className="w-3 h-3" />
              Intelligence Brief
            </span>
          )}
        </div>
        
        <h3 className="font-display font-semibold text-lg text-green-dark group-hover:text-green transition-colors">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {article.excerpt}
        </p>
        
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 font-ui">
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
        
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {article.tags.slice(0, 4).map(tag => (
              <span 
                key={tag}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-ui"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}

export function Section() {
  const { section } = useParams<{ section: string }>();
  
  const sectionKey = section || '';
  const sectionTitle = sectionTitles[sectionKey] || 'Section';
  const sectionDescription = sectionDescriptions[sectionKey] || '';
  
  // Map URL param to Section type
  const sectionTypeMap: Record<string, SectionType> = {
    national: 'National',
    economy: 'Economy',
    agriculture: 'Agriculture',
    environment: 'Environment',
    'global-affairs': 'GlobalAffairs',
  };
  
  const sectionArticles = articles.filter(
    a => a.primarySection === sectionTypeMap[sectionKey]
  );
  
  const featuredArticle = sectionArticles[0];
  const otherArticles = sectionArticles.slice(1);

  if (sectionArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-display font-bold text-green-dark mb-4">{sectionTitle}</h1>
        <p className="text-gray-600 mb-8">{sectionDescription}</p>
        <p className="text-gray-500">No articles in this section yet.</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mt-6 text-green hover:text-green-dark font-ui"
        >
          <ArrowRight className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded border font-ui ${getSectionColor(sectionTypeMap[sectionKey])}`}>
            {sectionTitle}
          </span>
        </div>
        <h1 className="text-3xl font-display font-bold text-green-dark">{sectionTitle}</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">{sectionDescription}</p>
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 font-ui">
            Featured
          </h2>
          <article className="group">
            <Link to={`/${section}/${featuredArticle.slug}`}>
              <div className="flex items-center gap-2 mb-3">
                {featuredArticle.articleType === 'IntelligenceBrief' && (
                  <span className="brief-badge">
                    <Target className="w-3 h-3" />
                    Intelligence Brief
                  </span>
                )}
              </div>
              
              <h3 className="font-display font-semibold text-2xl text-green-dark group-hover:text-green transition-colors">
                {featuredArticle.title}
              </h3>
              
              <p className="text-gray-600 mt-3 text-base max-w-2xl">
                {featuredArticle.excerpt}
              </p>
              
              <div className="flex items-center gap-3 mt-4 text-sm text-gray-500 font-ui">
                <span>{featuredArticle.author.name}</span>
                <span>•</span>
                <span>{new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
                <span>•</span>
                <span>{featuredArticle.readTime} min read</span>
              </div>
            </Link>
          </article>
        </section>
      )}

      {/* More Articles */}
      {otherArticles.length > 0 && (
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 font-ui">
            More in {sectionTitle}
          </h2>
          <div className="space-y-6">
            {otherArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Related Topics */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 font-ui">
          Related Topics
        </h2>
        <div className="flex flex-wrap gap-3">
          {Array.from(new Set(sectionArticles.flatMap(a => a.tags))).slice(0, 8).map(tag => (
            <Link
              key={tag}
              to={`/tag/${tag}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-green-light hover:text-green-dark transition-colors font-ui text-sm"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
