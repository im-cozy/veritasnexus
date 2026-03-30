import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Wheat, ClipboardList, Clock, Menu, X, Building2, TrendingUp, TreePine, Globe, FolderOpen, FileText, LayoutDashboard } from 'lucide-react';

const mainTabs = [
  { label: 'Home',      path: '/',               icon: Home },
  { label: 'Agri',      path: '/agriculture',    icon: Wheat },
  { label: 'Tracker',   path: '/policy-tracker', icon: ClipboardList },
  { label: 'Timelines', path: '/timelines',      icon: Clock },
];
const moreLinks = [
  { label: 'National',       path: '/national',      icon: Building2 },
  { label: 'Economy',        path: '/economy',        icon: TrendingUp },
  { label: 'Environment',    path: '/environment',    icon: TreePine },
  { label: 'Global Affairs', path: '/global-affairs', icon: Globe },
  { label: 'Topics',         path: '/topics',         icon: FolderOpen },
  { label: 'Documents',      path: '/documents',      icon: FileText },
  { label: 'Dashboard',      path: '/dashboard',      icon: LayoutDashboard },
];

export function BottomTabBar() {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white z-50 lg:hidden" style={{ borderTop: '1px solid var(--border)', boxShadow: '0 -4px 16px rgba(0,0,0,0.06)' }}>
        <div className="flex items-stretch h-full">
          {mainTabs.map(tab => {
            const Icon = tab.icon;
            const active = isActive(tab.path);
            return (
              <NavLink key={tab.path} to={tab.path} className="flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors" style={{ color: active ? 'var(--green)' : 'var(--text-light)' }}>
                {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full" style={{ background: 'var(--green)' }} />}
                <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${active ? 'scale-110' : ''}`} style={active ? { background: 'var(--green-light)' } : {}}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-ui text-[10px] font-medium">{tab.label}</span>
              </NavLink>
            );
          })}
                  </div>
          </div>
        </div>
      )}
    </>
  );
}
