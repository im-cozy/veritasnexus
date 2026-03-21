import { Outlet, useLocation, useParams } from 'react-router-dom';
import { LeftPanel } from './nav/LeftPanel';
import { MobileHeader } from './nav/MobileHeader';
import { BottomTabBar } from './nav/BottomTabBar';

export function Layout() {
  const location = useLocation();
  const params = useParams();

  // Article pages get a narrower content column
  const isArticlePage = !!params.slug && !location.pathname.startsWith('/policy-tracker') && !location.pathname.startsWith('/timelines') && !location.pathname.startsWith('/topics');

  return (
    <div className="min-h-screen bg-surface">

      {/* Desktop Left Panel — hidden on mobile */}
      <div className="hidden lg:block">
        <LeftPanel />
      </div>

      {/* Mobile Header — visible only on mobile */}
      <MobileHeader />

      {/* Main Content */}
      <main className="lg:ml-[240px] pt-14 lg:pt-0 pb-20 lg:pb-0 min-h-screen">
        {/* Constrained content wrapper — prevents wide blank spaces on large screens */}
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 w-full ${isArticlePage ? 'max-w-3xl' : 'max-w-5xl'}`}>
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
}
