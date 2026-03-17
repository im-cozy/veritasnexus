import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50 px-4 flex items-center justify-between shadow-sm lg:hidden">
      {/* Brand */}
      <Link to="/" className="flex-shrink-0">
        <span className="brand-mark text-base">Veritas Nexus</span>
      </Link>

      {/* Search */}
      <form 
        onSubmit={handleSearch} 
        className={`flex items-center transition-all duration-300 ${
          isExpanded ? 'flex-1 ml-4' : 'w-auto'
        }`}
      >
        <div className={`relative flex items-center ${isExpanded ? 'w-full' : 'w-auto'}`}>
          <Search className={`absolute left-3 w-4 h-4 text-gray-400 ${isExpanded ? '' : 'hidden'}`} />
          <input
            type="text"
            placeholder={isExpanded ? 'Search...' : ''}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => {
              if (!searchQuery) setIsExpanded(false);
            }}
            className={`py-2 text-sm bg-gray-50 border border-gray-200 font-ui focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent transition-all duration-300 ${
              isExpanded 
                ? 'w-full pl-9 pr-3 rounded-pill' 
                : 'w-10 pl-0 text-center rounded-full cursor-pointer'
            }`}
          />
          {!isExpanded && (
            <Search 
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              onClick={() => setIsExpanded(true)}
            />
          )}
        </div>
      </form>
    </header>
  );
}
