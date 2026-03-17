import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Wheat, ClipboardList, Clock, Menu, X, Building2, TrendingUp, TreePine, Globe, FolderOpen, FileText, LayoutDashboard } from 'lucide-react';

const mainTabs = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Agriculture', path: '/agriculture', icon: Wheat },
  { label: 'Tracker', path: '/policy-tracker', icon: ClipboardList },
  { label: 'Timelines', path: '/timelines', icon: Clock },
];

const moreLinks = [
  { label: 'National', path: '/national', icon: Building2 },
  { label: 'Economy', path: '/economy', icon: TrendingUp },
  { label: 'Environment', path: '/environment', icon: TreePine },
  { label: 'Global Affairs', path: '/global-affairs', icon: Globe },
  { label: 'Topics', path: '/topics', icon: FolderOpen },
  { label: 'Documents', path: '/documents', icon: FileText },
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
];

export function BottomTabBar() {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-50 lg:hidden">
        <div className="flex items-center justify-around h-full px-2">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-[64px] ${
                  active ? 'text-green' : 'text-gray-500'
                }`}
              >
                <div className={`relative ${active ? 'after:absolute after:-top-2 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-green after:rounded-full' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-1 font-ui">{tab.label}</span>
              </NavLink>
            );
          })}
          
          {/* More Button */}
          <button
            onClick={() => setShowMore(true)}
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-[64px] ${
              showMore ? 'text-green' : 'text-gray-500'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs mt-1 font-ui">More</span>
          </button>
        </div>
      </nav>

      {/* More Menu Sheet */}
      {showMore && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMore(false)}
          />
          
          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold font-display text-green-dark">More Sections</h2>
              <button 
                onClick={() => setShowMore(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Links */}
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              <div className="grid grid-cols-2 gap-3">
                {moreLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setShowMore(false)}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        active 
                          ? 'bg-green-light text-green-dark' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-ui">{link.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
