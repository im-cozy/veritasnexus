import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Shield, X } from 'lucide-react';

export function MobileHeader() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) { navigate(`/search?q=${encodeURIComponent(query)}`); setQuery(''); setExpanded(false); }
  };
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white z-50 px-4 flex items-center gap-3 lg:hidden" style={{ borderBottom: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      {!expanded && (
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green-accent) 100%)', boxShadow: '0 2px 6px rgba(26,107,60,0.25)' }}>
            <Shield className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="brand-mark text-[14px]">Veritas Nexus</span>
        </Link>
      )}
      <form onSubmit={handleSearch} className={`flex items-center transition-all duration-200 ${expanded ? 'flex-1' : 'ml-auto'}`}>
        {expanded ? (
          <div className="relative flex items-center w-full">
            <Search className="absolute left-3 w-4 h-4" style={{ color: 'var(--text-light)' }} />
            <input autoFocus type="text" placeholder="Search articles, topics, policies..." value={query} onChange={(e) => setQuery(e.target.value)} className="vn-search pr-10" style={{ borderRadius: '10px' }} />
            <button type="button" onClick={() => { setExpanded(false); setQuery(''); }} className="absolute right-3" style={{ color: 'var(--text-muted)' }}><X className="w-4 h-4" /></button>
          </div>
        ) : (
          <button type="button" onClick={() => setExpanded(true)} className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
            <Search className="w-4 h-4" />
          </button>
        )}
      </form>
    </header>
  );
}
