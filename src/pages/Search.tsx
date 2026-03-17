import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Target } from 'lucide-react';
import { articles, policyProjects, timelineTopics, documents } from '@/data/seed';
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

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  // Search across all content types
  const searchResults = {
    articles: articles.filter(a => 
      query && (
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.content.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    ),
    policies: policyProjects.filter(p => 
      query && (
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.agency.toLowerCase().includes(query.toLowerCase())
      )
    ),
    timelines: timelineTopics.filter(t => 
      query && (
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())
      )
    ),
    documents: documents.filter(d => 
      query && (
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.summary.toLowerCase().includes(query.toLowerCase()) ||
        d.sourceAgency.toLowerCase().includes(query.toLowerCase())
      )
    ),
  };

  const totalResults = Object.values(searchResults).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-display font-bold text-green-dark">Search</h1>
        <p className="text-gray-600 mt-2">
          Search across articles, policies, timelines, and documents.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Veritas Nexus..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-base bg-white border border-gray-200 rounded-lg font-ui focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-green text-white text-sm rounded-lg hover:bg-green-dark transition-colors font-ui"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {query && (
        <div className="space-y-8">
          <p className="text-sm text-gray-500 font-ui">
            {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
          </p>

          {/* Articles */}
          {searchResults.articles.length > 0 && (
            <section>
              <h2 className="text-lg font-display font-semibold text-green-dark mb-4">
                Articles ({searchResults.articles.length})
              </h2>
              <div className="space-y-4">
                {searchResults.articles.map(article => (
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
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Policies */}
          {searchResults.policies.length > 0 && (
            <section>
              <h2 className="text-lg font-display font-semibold text-green-dark mb-4">
                Policy Projects ({searchResults.policies.length})
              </h2>
              <div className="space-y-3">
                {searchResults.policies.map(policy => (
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

          {/* Timelines */}
          {searchResults.timelines.length > 0 && (
            <section>
              <h2 className="text-lg font-display font-semibold text-green-dark mb-4">
                Timelines ({searchResults.timelines.length})
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {searchResults.timelines.map(timeline => (
                  <Link 
                    key={timeline.id}
                    to={`/timelines/${timeline.slug}`}
                    className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-green-mid transition-colors"
                  >
                    <p className="font-medium text-gray-900">{timeline.name}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{timeline.description}</p>
                    <p className="text-xs text-gray-400 mt-2 font-ui">
                      {timeline.entries.length} events
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Documents */}
          {searchResults.documents.length > 0 && (
            <section>
              <h2 className="text-lg font-display font-semibold text-green-dark mb-4">
                Documents ({searchResults.documents.length})
              </h2>
              <div className="space-y-3">
                {searchResults.documents.map(doc => (
                  <div 
                    key={doc.id}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 bg-green-light text-green-dark rounded font-ui">
                        {doc.documentType}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900">{doc.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{doc.sourceAgency}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* No Results */}
          {totalResults === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No results found for "{query}"</p>
              <p className="text-sm text-gray-400 mt-2">
                Try different keywords or browse by section.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!query && (
        <div className="text-center py-12">
          <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Enter a search term to begin.</p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-sm text-gray-400 font-ui">Popular:</span>
            {['rice', 'China', 'infrastructure', 'AFP', 'El Niño'].map(term => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  setSearchParams({ q: term });
                }}
                className="text-sm text-green hover:text-green-dark font-ui"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
