import { NavLink, useLocation } from 'react-router-dom';
import { Search, Home, Building2, TrendingUp, Wheat, TreePine, Globe, ClipboardList, Clock, FolderOpen, FileText, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

const sectionLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'National', path: '/national', icon: Building2 },
  { label: 'Economy', path: '/economy', icon: TrendingUp },
  { label: 'Agriculture', path: '/agriculture', icon: Wheat },
  { label: 'Environment', path: '/environment', icon: TreePine },
  { label: 'Global Affairs', path: '/global-affairs', icon: Globe },
];

const platformLinks = [
  { label: 'Policy Tracker', path: '/policy-tracker', icon: ClipboardList },
  { label: 'Timelines', path: '/timelines', icon: Clock },
  { label: 'Topics', path: '/topics', icon: FolderOpen },
  { label: 'Documents', path: '/documents', icon: FileText },
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
];

export function LeftPanel() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-gray-200 flex flex-col z-40 panel-shadow">
      {/* Brand */}
      <div className="p-5 border-b border-gray-100">
        <NavLink to="/" className="block">
          <h1 className="brand-mark text-lg leading-tight">VERITAS<br/>NEXUS</h1>
          <p className="brand-tagline text-xs mt-1">Where Truth Connects</p>
        </NavLink>
      </div>

      {/* Search */}
      <div className="p-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-pill font-ui focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent"
          />
        </form>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Sections */}
        <nav className="px-3 py-2">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 font-ui">Sections</p>
          <ul className="space-y-0.5">
            {sectionLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || 
                (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-ui rounded-md transition-colors ${
                      isActive
                        ? 'nav-active text-green-dark'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Platform Tools */}
        <nav className="px-3 py-4 mt-2 border-t border-gray-100">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 font-ui">Platform</p>
          <ul className="space-y-0.5">
            {platformLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname.startsWith(link.path);
              return (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-ui rounded-md transition-colors ${
                      isActive
                        ? 'nav-active text-green-dark'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-ui">
          <span className="live-dot" />
          <span>Platform Active</span>
        </div>
        <p className="text-xs text-gray-400 mt-2 font-ui">© 2024 Veritas Nexus</p>
        <p className="text-xs text-gray-300 font-ui">v1.0.0</p>
      </div>
    </aside>
  );
}
