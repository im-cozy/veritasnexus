import { useLocation, Link } from 'react-router-dom';
import { Clock, FileText, Users, ArrowRight, Target, BookOpen } from 'lucide-react';
import { timelineTopics, policyProjects, topicPages } from '@/data/seed';
import type { Article } from '@/types';

interface RightPanelProps {
  article?: Article;
}

export function RightPanel({ article }: RightPanelProps) {
  const location = useLocation();
  
  // Only show on article pages
  const isArticlePage = location.pathname.includes('/') && 
    !location.pathname.startsWith('/policy') &&
    !location.pathname.startsWith('/timelines') &&
    !location.pathname.startsWith('/topics') &&
    !location.pathname.startsWith('/documents') &&
    !location.pathname.startsWith('/dashboard') &&
    !location.pathname.startsWith('/search') &&
    location.pathname !== '/' &&
    !['/national', '/economy', '/agriculture', '/environment', '/global-affairs'].includes(location.pathname);

  if (!isArticlePage || !article) {
    return (
      <aside className="fixed right-0 top-0 h-screen w-[280px] bg-white border-l border-gray-200 z-40 panel-shadow hidden lg:block">
        <div className="h-full flex items-center justify-center text-gray-400">
          <p className="text-sm font-ui">Select an article to view context</p>
        </div>
      </aside>
    );
  }

  const timelineTopic = article.timelineTopicId ? 
    timelineTopics.find(t => t.id === article.timelineTopicId) : null;
  
  const relatedPolicies = policyProjects.filter(p => 
    article.tags.some(tag => p.sectionTag.toLowerCase().includes(tag.toLowerCase()))
  ).slice(0, 3);

  const topicPage = article.topicPageId ? 
    topicPages.find(t => t.id === article.topicPageId) : null;

  return (
    <aside className="fixed right-0 top-0 h-screen w-[280px] bg-white border-l border-gray-200 overflow-y-auto custom-scrollbar z-40 panel-shadow hidden lg:block">
      <div className="p-5 space-y-6">
        {/* Story Timeline */}
        {timelineTopic && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-green" />
              <h3 className="text-sm font-semibold text-gray-900 font-ui">Story Timeline</h3>
            </div>
            <div className="relative pl-4">
              <div className="timeline-line" />
              <div className="space-y-4">
                {timelineTopic.entries.slice(-4).map((entry) => (
                  <div key={entry.id} className="relative">
                    <div className={`absolute -left-4 top-1 w-3.5 h-3.5 rounded-full border-2 ${
                      entry.isCurrent 
                        ? 'bg-green border-green' 
                        : 'bg-white border-green-mid'
                    }`} />
                    <div className={`text-xs font-semibold font-ui ${
                      entry.isCurrent ? 'text-green' : 'text-gray-500'
                    }`}>
                      {entry.year}
                    </div>
                    <p className={`text-sm mt-0.5 ${
                      entry.isCurrent ? 'text-gray-900 font-medium' : 'text-gray-600'
                    }`}>
                      {entry.heading}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Link 
              to={`/timelines/${timelineTopic.slug}`}
              className="inline-flex items-center gap-1 text-xs text-green hover:text-green-dark mt-3 font-ui"
            >
              View full timeline <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Related Policies */}
        {relatedPolicies.length > 0 && (
          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-green" />
              <h3 className="text-sm font-semibold text-gray-900 font-ui">Related Policies</h3>
            </div>
            <div className="space-y-3">
              {relatedPolicies.map(policy => (
                <Link 
                  key={policy.id}
                  to={`/policy-tracker/${policy.slug}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-green-light transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{policy.name}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`status-badge ${
                      policy.status === 'Ongoing' ? 'status-ongoing' :
                      policy.status === 'Planning' ? 'status-planning' :
                      policy.status === 'Delayed' ? 'status-delayed' :
                      policy.status === 'Completed' ? 'status-completed' :
                      'status-cancelled'
                    }`}>
                      {policy.status}
                    </span>
                    <span className="text-xs text-gray-500 font-ui">{policy.budget}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* What It Means */}
        {article.whatItMeans.length > 0 && (
          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-green" />
              <h3 className="text-sm font-semibold text-gray-900 font-ui">What It Means</h3>
            </div>
            <div className="space-y-3">
              {article.whatItMeans.map((item, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium text-green-dark font-ui">{item.stakeholder}</p>
                  <p className="text-gray-600 mt-0.5">{item.effect}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified Sources */}
        {article.sources.length > 0 && (
          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-green" />
              <h3 className="text-sm font-semibold text-gray-900 font-ui">Verified Sources</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.sources.map((source, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-green-light text-green-dark text-xs rounded font-ui"
                >
                  {source.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Topic Hub Card */}
        {topicPage && (
          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-green" />
              <h3 className="text-sm font-semibold text-gray-900 font-ui">Topic Hub</h3>
            </div>
            <Link 
              to={`/topics/${topicPage.slug}`}
              className="block p-4 bg-gradient-to-br from-green-light to-white border border-green-mid rounded-lg hover:shadow-md transition-shadow"
            >
              <p className="font-display font-semibold text-green-dark">{topicPage.name}</p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{topicPage.overview}</p>
              <div className="flex items-center gap-1 text-xs text-green mt-3 font-ui">
                Explore topic <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
