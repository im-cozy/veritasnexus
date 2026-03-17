import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Calendar } from 'lucide-react';
import { timelineTopics } from '@/data/seed';

export function Timelines() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-green" />
          <span className="text-sm font-medium text-green font-ui">Platform Tool</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-green-dark">Timelines</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Navigate major ongoing stories through interactive chronologies. 
          Every timeline connects events, articles, and policy developments in one place.
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {timelineTopics.map(timeline => {
          const latestEntry = timeline.entries[timeline.entries.length - 1];
          const earliestEntry = timeline.entries[0];
          
          return (
            <Link 
              key={timeline.id}
              to={`/timelines/${timeline.slug}`}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-green-mid hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-xl text-green-dark group-hover:text-green transition-colors">
                    {timeline.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                    {timeline.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green transition-colors flex-shrink-0" />
              </div>
              
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 font-ui">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{earliestEntry.year} - {latestEntry.year}</span>
                </div>
                <span>•</span>
                <span>{timeline.entries.length} events</span>
              </div>
              
              {/* Preview of latest events */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-ui">Latest</p>
                <div className="space-y-2">
                  {timeline.entries.slice(-2).map(entry => (
                    <div key={entry.id} className="flex items-start gap-2">
                      <span className="text-xs font-medium text-green flex-shrink-0 font-ui">
                        {entry.year}
                      </span>
                      <p className="text-sm text-gray-600 line-clamp-1">{entry.heading}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-green-light rounded-lg p-6">
        <h3 className="font-display font-semibold text-green-dark mb-2">
          How Timelines Work
        </h3>
        <p className="text-gray-700 text-sm">
          Each timeline is a living document that grows as stories develop. Events are linked to 
          related articles, policies, and documents, creating a comprehensive view of how major 
          issues evolve over time. Use timelines to understand context and track developments.
        </p>
      </div>
    </div>
  );
}
