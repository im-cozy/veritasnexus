import { Outlet, useLocation, useParams } from 'react-router-dom';
import { LeftPanel } from './nav/LeftPanel';
import { MobileHeader } from './nav/MobileHeader';
import { BottomTabBar } from './nav/BottomTabBar';

export function Layout() {
  const location = useLocation();
  const params = useParams();
  const isArticlePage = !!params.slug &&
    !location.pathname.startsWith('/policy-tracker') &&
    !location.pathname.startsWith('/timelines') &&
    !location.pathname.startsWith('/topics');
  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
      <div className="hidden lg:block"><LeftPanel /></div>
      <MobileHeader />
      <main className="lg:ml-[240px] pt-14 lg:pt-0 pb-20 lg:pb-6 min-h-screen">
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 w-full page-enter ${isArticlePage ? 'max-w-3xl' : 'max-w-5xl'}`}>
          <Outlet />
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
