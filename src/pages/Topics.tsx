import { Link } from 'react-router-dom';
import { FolderOpen, ArrowRight, Clock, FileText, Users } from 'lucide-react';
import { topicPages } from '@/data/seed';

export function Topics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <FolderOpen className="w-5 h-5 text-green" />
          <span className="text-sm font-medium text-green font-ui">Platform Tool</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-green-dark">Topic Intelligence Hubs</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Unified intelligence hubs where everything related to a major topic lives — 
          timelines, articles, policies, key actors, and data. Think Wikipedia built from original journalism.
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {topicPages.map(topic => (
          <Link 
            key={topic.id}
            to={`/topics/${topic.slug}`}
            className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-green-mid hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display font-semibold text-xl text-green-dark group-hover:text-green transition-colors">
                  {topic.name}
                </h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {topic.overview}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green transition-colors flex-shrink-0" />
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 font-ui">
              {topic.timelineTopic && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Timeline</span>
                </div>
              )}
              {topic.relatedPolicies.length > 0 && (
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>{topic.relatedPolicies.length} policies</span>
                </div>
              )}
              {topic.keyActors.length > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{topic.keyActors.length} actors</span>
                </div>
              )}
            </div>
            
            {/* Tags */}
            {topic.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {topic.tags.slice(0, 4).map(tag => (
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
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-green-light rounded-lg p-6">
        <h3 className="font-display font-semibold text-green-dark mb-2">
          What Are Topic Hubs?
        </h3>
        <p className="text-gray-700 text-sm">
          Topic Hubs are the connective tissue of Veritas Nexus. Each hub brings together 
          everything you need to understand a major issue: the history (timeline), the policies 
          (tracker), the people (key actors), and the coverage (articles). They're designed for 
          researchers, analysts, and anyone who wants to go deep on a subject.
        </p>
      </div>
    </div>
  );
}
