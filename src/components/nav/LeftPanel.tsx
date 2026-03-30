import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Search, Home, Building2, TrendingUp, Wheat, TreePine, Globe, ClipboardList, Clock, FolderOpen, FileText, LayoutDashboard, Shield } from 'lucide-react';

const sectionLinks = [
  { label: 'Home',          path: '/',             icon: Home },
  { label: 'National',      path: '/national',     icon: Building2 },
  { label: 'Economy',       path: '/economy',      icon: TrendingUp },
  { label: 'Agriculture',   path: '/agriculture',  icon: Wheat },
  { label: 'Environment',   path: '/environment',  icon: TreePine },
  { label: 'Global Affairs',path: '/global-affairs',icon: Globe },
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
  const NavItem = ({ link }: { link: typeof sectionLinks[0] }) => {
    const Icon = link.icon;
    const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
    return (
      <NavLink to={link.path}
        className={['flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-ui transition-all duration-150 mb-0.5 group relative', isActive ? 'nav-active' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'].join(' ')}>
        {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full" style={{ background: 'var(--green)' }} />}
        <span className={['w-7 h-7 flex items-center justify-center rounded-md flex-shrink-0 transition-colors', isActive ? 'text-green' : 'text-gray-400 group-hover:text-gray-600'].join(' ')} style={isActive ? { background: 'var(--green-mid)' } : {}}>
          <Icon className="w-4 h-4" />
        </span>
        <span className="font-medium">{link.label}</span>
        {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--green)' }} />}
      </NavLink>
    );
  };
  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-white flex flex-col z-40" style={{ boxShadow: 'var(--shadow-panel)', borderRight: '1px solid var(--border)' }}>
      <div className="px-5 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green-accent) 100%)', boxShadow: '0 2px 8px rgba(26,107,60,0.30)' }}>
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="brand-mark text-[15px] leading-tight">Veritas Nexus</p>
            <p className="brand-tagline text-[11px] leading-tight mt-0.5">Where Truth Connects</p>
          </div>
        </NavLink>
      </div>
      <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-light)' }} />
          <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="vn-search" />
        </form>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar py-3">
        <div className="px-3 mb-2">
          <p className="px-3 mb-2 font-ui" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)' }}>Sections</p>
          {sectionLinks.map(link => <NavItem key={link.path} link={link} />)}
        </div>
        <div className="px-3 pt-3 mt-1" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="px-3 mb-2 font-ui" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)' }}>Platform</p>
          {platformLinks.map(link => <NavItem key={link.path} link={link} />)}
        </div>
      </div>
      <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="live-dot" />
          <span className="font-ui text-xs" style={{ color: 'var(--text-muted)' }}>Platform Active</span>
        </div>
        <p className="font-ui" style={{ fontSize: '11px', color: 'var(--text-light)' }}>© 2025 Veritas Nexus</p>
      </div>
    </aside>
  );
}
