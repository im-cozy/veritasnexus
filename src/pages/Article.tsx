import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Target, BookOpen, Lightbulb, Users, ArrowRight } from 'lucide-react';
import { articles, timelineTopics, topicPages } from '@/data/seed';
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

export function Article() {
  const { section, slug } = useParams<{ section: string; slug: string }>();
  
  const article = articles.find(a => a.slug === slug);
  
  if (!article) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-display font-bold text-green-dark mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-green hover:text-green-dark font-ui"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
    );
  }

  const timelineTopic = article.timelineTopicId ? 
    timelineTopics.find(t => t.id === article.timelineTopicId) : null;

  const topicPage = article.topicPageId ? 
    topicPages.find(t => t.id === article.topicPageId) : null;

  const relatedArticles = articles
    .filter(a => a.id !== article.id && 
      (a.primarySection === article.primarySection || 
       a.tags.some(tag => article.tags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <article className="space-y-8">
      {/* Back Link */}
      <Link 
        to={`/${section}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green transition-colors font-ui"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {article.primarySection}
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
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
        
        <h1 className="article-title">{article.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 font-ui flex-wrap">
          <span className="font-medium text-gray-700">{article.author.name}</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
          <span>•</span>
          <span>{article.readTime} min read</span>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Link
                key={tag}
                to={`/tag/${tag}`}
                className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-green-light hover:text-green-dark transition-colors font-ui"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Context Bar */}
      {timelineTopic && (
        <div className="bg-green-light rounded-lg p-4 flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-dark font-ui">{timelineTopic.name}</p>
            <p className="text-sm text-gray-600 mt-1">{timelineTopic.description}</p>
            <Link 
              to={`/timelines/${timelineTopic.slug}`}
              className="inline-flex items-center gap-1 text-sm text-green hover:text-green-dark mt-2 font-ui"
            >
              View full timeline <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Article Body */}
      <div className="article-body">
        <p className="drop-cap text-lg leading-relaxed">{article.excerpt}</p>
        
        {article.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mt-4">{paragraph}</p>
        ))}
      </div>

      {/* Intelligence Brief Template (if applicable) */}
      {article.articleType === 'IntelligenceBrief' && article.intelligenceBrief && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-green px-4 py-3">
            <h2 className="text-white font-display font-semibold flex items-center gap-2">
              <Target className="w-5 h-5" />
              Intelligence Brief
            </h2>
          </div>
          
          <div className="p-5 space-y-6">
            {/* Summary */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-ui">
                Summary
              </h3>
              <p className="text-gray-700">{article.intelligenceBrief.summary}</p>
            </div>
            
            {/* What Happened */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-ui">
                What Happened
              </h3>
              <p className="text-gray-700">{article.intelligenceBrief.whatHappened}</p>
            </div>
            
            {/* Why It Matters */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-ui">
                Why It Matters
              </h3>
              <p className="text-gray-700">{article.intelligenceBrief.whyItMatters}</p>
            </div>
            
            {/* Historical Context */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-ui">
                Historical Context
              </h3>
              <p className="text-gray-700">{article.intelligenceBrief.historicalContext}</p>
            </div>
            
            {/* Possible Outcomes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-ui">
                Possible Outcomes
              </h3>
              <ul className="space-y-2">
                {article.intelligenceBrief.possibleOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-green-light text-green text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-ui">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Box */}
      {article.knowledgeBox && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h3 className="font-display font-semibold text-amber-800">
              {article.knowledgeBox.title}
            </h3>
          </div>
          <div className="space-y-4">
            {article.knowledgeBox.entries.map((entry, index) => (
              <div key={index}>
                <p className="font-medium text-amber-800 text-sm font-ui">{entry.question}</p>
                <p className="text-amber-700 mt-1">{entry.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verified Sources */}
      {article.sources.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-green" />
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider font-ui">
              Verified Sources
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                className="inline-flex items-center px-3 py-1.5 bg-green-light text-green-dark text-sm rounded-lg hover:bg-green-mid transition-colors font-ui"
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* What It Means (Mobile/Tablet - inline) */}
      <div className="lg:hidden border-t border-gray-200 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-green" />
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider font-ui">
            What It Means
          </h3>
        </div>
        <div className="space-y-4">
          {article.whatItMeans.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-green-dark text-sm font-ui">{item.stakeholder}</p>
              <p className="text-gray-600 mt-1 text-sm">{item.effect}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Hub Card */}
      {topicPage && (
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-gradient-to-br from-green-light to-white border border-green-mid rounded-lg p-5">
            <p className="text-xs font-semibold text-green uppercase tracking-wider mb-2 font-ui">
              Explore This Topic
            </p>
            <h3 className="font-display font-semibold text-xl text-green-dark">
              {topicPage.name}
            </h3>
            <p className="text-gray-600 mt-2 text-sm">{topicPage.overview}</p>
            <Link 
              to={`/topics/${topicPage.slug}`}
              className="inline-flex items-center gap-2 mt-4 text-green hover:text-green-dark font-ui text-sm"
            >
              View Topic Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 font-ui">
            Related Articles
          </h3>
          <div className="space-y-4">
            {relatedArticles.map(related => (
              <Link 
                key={related.id}
                to={`/${related.primarySection.toLowerCase()}/${related.slug}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-green-light transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded font-ui ${getSectionColor(related.primarySection)}`}>
                    {related.primarySection}
                  </span>
                  {related.articleType === 'IntelligenceBrief' && (
                    <span className="text-xs text-green font-ui">Brief</span>
                  )}
                </div>
                <p className="font-medium text-gray-900">{related.title}</p>
                <p className="text-sm text-gray-500 mt-1 font-ui">
                  {new Date(related.publishedAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })} • {related.readTime} min read
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
