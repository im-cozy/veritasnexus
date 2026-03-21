import { NavLink, useLocation } from 'react-router-dom';
import { Search, Home, Building2, TrendingUp, Wheat, TreePine, Globe, ClipboardList, Clock, FolderOpen, FileText, LayoutDashboard, Zap } from 'lucide-react';
import { useState } from 'react';

const sectionLinks = [
  { label: 'Home',         path: '/',             icon: Home },
  { label: 'National',     path: '/national',     icon: Building2 },
  { label: 'Economy',      path: '/economy',      icon: TrendingUp },
  { label: 'Agriculture',  path: '/agriculture',  icon: Wheat },
  { label: 'Environment',  path: '/environment',  icon: TreePine },
  { label: 'Global Affairs',path: '/global-affairs', icon: Globe },
];

const platformLinks = [
  { label: 'Policy Tracker', path: '/policy-tracker', icon: ClipboardList },
  { label: 'Timelines',      path: '/timelines',      icon: Clock },
  { label: 'Topics',         path: '/topics',          icon: FolderOpen },
  { label: 'Documents',      path: '/documents',       icon: FileText },
  { label: 'Dashboard',      path: '/dashboard',       icon: LayoutDashboard },
];

export function LeftPanel() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-white border-r border-gray-100 flex flex-col z-40" style={{boxShadow:'2px 0 12px rgba(0,0,0,0.04)'}}>

      {/* Brand */}
      <div className="px-6 py-5 border-b border-gray-100">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-sm text-green-dark leading-tight tracking-wide">Veritas Nexus</p>
            <p className="text-xs text-gray-400 font-ui italic leading-tight">Where Truth Connects</p>
          </div>
        </NavLink>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-100">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg font-ui focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green/50 transition-all placeholder:text-gray-400"
          />
        </form>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-3 custom-scrollbar">
        <div className="px-3 mb-1">
          <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5 font-ui">Sections</p>
          {sectionLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path ||
              (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <NavLink key={link.path} to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-ui transition-all mb-0.5 ${
                  isActive
                    ? 'bg-green-light text-green-dark font-semibold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}>
                <div className={`w-5 h-5 flex items-center justify-center rounded ${isActive ? 'text-green' : 'text-gray-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {link.label}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green" />}
              </NavLink>
            );
          })}
        </div>

        <div className="px-3 mt-3 pt-3 border-t border-gray-100">
          <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5 font-ui">Platform</p>
          {platformLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.path);
            return (
              <NavLink key={link.path} to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-ui transition-all mb-0.5 ${
                  isActive
                    ? 'bg-green-light text-green-dark font-semibold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}>
                <div className={`w-5 h-5 flex items-center justify-center rounded ${isActive ? 'text-green' : 'text-gray-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {link.label}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green" />}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
          </div>
          <span className="text-xs text-gray-500 font-ui">Platform Active</span>
        </div>
        <p className="text-xs text-gray-300 font-ui">© 2025 Veritas Nexus</p>
      </div>
    </aside>
  );
}
