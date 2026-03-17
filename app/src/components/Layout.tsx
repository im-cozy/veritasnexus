import { Outlet, useLocation, useParams } from 'react-router-dom';
import { LeftPanel } from './nav/LeftPanel';
import { RightPanel } from './nav/RightPanel';
import { MobileHeader } from './nav/MobileHeader';
import { BottomTabBar } from './nav/BottomTabBar';
import { articles } from '@/data/seed';
import type { Article } from '@/types';

function findArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function Layout() {
  const location = useLocation();
  const params = useParams();
  
  // Try to find current article for right panel context
  const currentArticle = params.slug ? findArticleBySlug(params.slug) : undefined;
  
  // Check if we're on a page that should have right panel
  const showRightPanel = location.pathname.includes('/') && 
    currentArticle !== undefined;

  return (
    <div className="min-h-screen bg-surface">
      {/* Desktop Left Panel */}
      <div className="hidden lg:block">
        <LeftPanel />
      </div>

      {/* Mobile Header */}
      <MobileHeader />

      {/* Main Content Area */}
      <main 
        className={`
          min-h-screen 
          lg:ml-[220px] 
          ${showRightPanel ? 'lg:mr-[280px]' : ''}
          pt-14 lg:pt-0 
          pb-20 lg:pb-0
        `}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <Outlet />
        </div>
      </main>

      {/* Desktop Right Panel */}
      {showRightPanel && (
        <div className="hidden lg:block">
          <RightPanel article={currentArticle} />
        </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
}
