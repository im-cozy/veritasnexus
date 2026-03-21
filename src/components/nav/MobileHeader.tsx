import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Zap, X } from 'lucide-react';

export function MobileHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsExpanded(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-100 z-50 px-4 flex items-center gap-3 lg:hidden" style={{boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
      {!isExpanded && (
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-green flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display font-bold text-sm text-green-dark">Veritas Nexus</span>
        </Link>
      )}

      <form onSubmit={handleSearch} className={`flex items-center transition-all duration-200 ${isExpanded ? 'flex-1' : 'ml-auto'}`}>
        <div className={`relative flex items-center ${isExpanded ? 'w-full' : 'w-auto'}`}>
          {isExpanded ? (
            <>
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search articles, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl font-ui focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green/50"
              />
              <button type="button" onClick={() => { setIsExpanded(false); setSearchQuery(''); }}
                className="absolute right-3 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setIsExpanded(true)}
              className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </header>
  );
}
