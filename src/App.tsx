import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Section } from './pages/Section';
import { Article } from './pages/Article';
import { PolicyTracker } from './pages/PolicyTracker';
import { PolicyDetail } from './pages/PolicyDetail';
import { Timelines } from './pages/Timelines';
import { TimelineDetail } from './pages/TimelineDetail';
import { Topics } from './pages/Topics';
import { TopicDetail } from './pages/TopicDetail';
import { Documents } from './pages/Documents';
import { Dashboard } from './pages/Dashboard';
import { Search } from './pages/Search';
import { Tag } from './pages/Tag';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="national" element={<Section />} />
          <Route path="economy" element={<Section />} />
          <Route path="agriculture" element={<Section />} />
          <Route path="environment" element={<Section />} />
          <Route path="global-affairs" element={<Section />} />
          <Route path="global" element={<Section />} />
          <Route path="national/:slug" element={<Article />} />
          <Route path="economy/:slug" element={<Article />} />
          <Route path="agriculture/:slug" element={<Article />} />
          <Route path="environment/:slug" element={<Article />} />
          <Route path="global-affairs/:slug" element={<Article />} />
          <Route path="global/:slug" element={<Article />} />
          <Route path="policy-tracker" element={<PolicyTracker />} />
          <Route path="policy-tracker/:slug" element={<PolicyDetail />} />
          <Route path="timelines" element={<Timelines />} />
          <Route path="timelines/:slug" element={<TimelineDetail />} />
          <Route path="topics" element={<Topics />} />
          <Route path="topics/:slug" element={<TopicDetail />} />
          <Route path="documents" element={<Documents />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="search" element={<Search />} />
          <Route path="tag/:slug" element={<Tag />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
