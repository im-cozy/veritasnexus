import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FolderOpen, Clock, FileText, Users, BookOpen, ArrowRight, Target } from 'lucide-react';
import { topicPages, articles } from '@/data/seed';
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

export function TopicDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const topic = topicPages.find(t => t.slug === slug);
  
  if (!topic) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-display font-bold text-green-dark mb-4">Topic Not Found</h1>
        <p className="text-gray-600 mb-6">The topic you're looking for doesn't exist.</p>
        <Link 
          to="/topics" 
          className="inline-flex items-center gap-2 text-green hover:text-green-dark font-ui"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Topics
        </Link>
      </div>
    );
  }

  const topicArticles = articles.filter(a => 
    a.topicPageId === topic.id || 
    a.tags.some(tag => topic.tags.includes(tag))
  );

  return (
    <div className="space-y-10">
      {/* Back Link */}
      <Link 
        to="/topics"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green transition-colors font-ui"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Topics
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-green" />
          <span className="text-sm font-medium text-green font-ui">Topic Hub</span>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-green-dark">{topic.name}</h1>
        
        <p className="text-gray-600 text-lg max-w-3xl">{topic.overview}</p>
        
        {/* Tags */}
        {topic.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {topic.tags.map(tag => (
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

      {/* Timeline Section */}
      {topic.timelineTopic && (
        <section className="border-t border-gray-200 pt-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-green" />
            <h2 className="text-xl font-display font-bold text-green-dark">Timeline</h2>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-gray-600 mb-4">
              Key events in the history of {topic.name}, from {topic.timelineTopic.entries[0]?.year} to present.
            </p>
            
            <div className="space-y-3">
              {topic.timelineTopic.entries.slice(-3).map(entry => (
                <div key={entry.id} className="flex items-start gap-3">
                  <span className="text-sm font-bold text-green font-ui w-12 flex-shrink-0">
                    {entry.year}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{entry.heading}</p>
                    <p className="text-gray-500 text-sm line-clamp-1">{entry.summary}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              to={`/timelines/${topic.timelineTopic.slug}`}
              className="inline-flex items-center gap-1 text-sm text-green hover:text-green-dark mt-4 font-ui"
            >
              View full timeline <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>
      )}

      {/* Policies Section */}
      {topic.relatedPolicies.length > 0 && (
        <section className="border-t border-gray-200 pt-8">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-green" />
            <h2 className="text-xl font-display font-bold text-green-dark">Related Policies</h2>
          </div>
          
          <div className="space-y-3">
            {topic.relatedPolicies.map(policy => (
              <Link 
                key={policy.id}
                to={`/policy-tracker/${policy.slug}`}
                className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-green-mid transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{policy.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{policy.agency} • {policy.budget}</p>
                  </div>
                  <span className={`status-badge ${
                    policy.status === 'Ongoing' ? 'status-ongoing' :
                    policy.status === 'Planning' ? 'status-planning' :
                    policy.status === 'Delayed' ? 'status-delayed' :
                    policy.status === 'Completed' ? 'status-completed' :
                    'status-cancelled'
                  }`}>
                    {policy.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Key Actors Section */}
      {topic.keyActors.length > 0 && (
        <section className="border-t border-gray-200 pt-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-green" />
            <h2 className="text-xl font-display font-bold text-green-dark">Key Actors</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topic.keyActors.map((actor, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900">{actor.name}</p>
                <p className="text-sm text-green font-ui">{actor.role}</p>
                <p className="text-sm text-gray-500">{actor.organization}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Articles Section */}
      {topicArticles.length > 0 && (
        <section className="border-t border-gray-200 pt-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-green" />
            <h2 className="text-xl font-display font-bold text-green-dark">Related Coverage</h2>
          </div>
          
          <div className="space-y-4">
            {topicArticles.map(article => (
              <Link 
                key={article.id}
                to={`/${article.primarySection.toLowerCase()}/${article.slug}`}
                className="block bg-gray-50 rounded-lg p-4 hover:bg-green-light transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded font-ui ${getSectionColor(article.primarySection)}`}>
                    {article.primarySection}
                  </span>
                  {article.articleType === 'IntelligenceBrief' && (
                    <span className="text-xs text-green font-ui flex items-center gap-1">
                      <Target className="w-3 h-3" /> Brief
                    </span>
                  )}
                </div>
                <p className="font-medium text-gray-900">{article.title}</p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400 font-ui">
                  <span>{article.author.name}</span>
                  <span>•</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
