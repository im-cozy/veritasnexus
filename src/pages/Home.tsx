import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, FileText, Target, Wheat, Shield, BookOpen } from 'lucide-react';
import { getArticles, getPolicyProjects, getTimelines } from '@/lib/api';

const SECTION_COLORS: Record<string, string> = {
  National:    'bg-blue-50 text-blue-700 border-blue-200',
  Economy:     'bg-amber-50 text-amber-700 border-amber-200',
  Agriculture: 'bg-green-50 text-green-700 border-green-200',
  Environment: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  GlobalAffairs:'bg-purple-50 text-purple-700 border-purple-200',
};

function SectionLabel({ section }: { section: string }) {
  return <span className={`section-badge ${SECTION_COLORS[section] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{section === 'GlobalAffairs' ? 'Global' : section}</span>;
}

function ArticleCard({ article, featured = false, delay = 0 }: { article: any; featured?: boolean; delay?: number }) {
  const sectionPath = article.primarySection?.toLowerCase().replace('globalaffairs', 'global-affairs');
  return (
    <article className="page-enter" style={{ animationDelay: `${delay}ms` }}>
      <Link to={`/${sectionPath}/${article.slug}`} className="article-card group block">
        {featured && article.featuredImageUrl && (
          <div className="aspect-video rounded-lg mb-4 overflow-hidden" style={{ background: 'var(--surface)' }}>
            <img src={article.featuredImageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        )}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <SectionLabel section={article.primarySection} />
          {article.articleType === 'IntelligenceBrief' && <span className="brief-badge"><Shield className="w-2.5 h-2.5" />Intel Brief</span>}
        </div>
        <h3 className={`font-display font-bold leading-tight mb-2 transition-colors group-hover:text-green ${featured ? 'text-xl lg:text-2xl' : 'text-base'}`} style={{ color: 'var(--green-dark)', letterSpacing: '-0.02em' }}>
          {article.title}
        </h3>
        <p className={`leading-relaxed mb-3 ${featured ? 'text-[15px] line-clamp-3' : 'text-sm line-clamp-2'}`} style={{ color: 'var(--text-muted)' }}>{article.excerpt}</p>
        <div className="flex items-center gap-3 font-ui" style={{ fontSize: '12px', color: 'var(--text-light)' }}>
          <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <span>{article.readTime} min read</span>
          <span className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--green)' }}>Read <ArrowRight className="w-3 h-3" /></span>
        </div>
      </Link>
    </article>
  );
}

function SectionHeading({ icon, title, link }: { icon: React.ReactNode; title: string; link: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{icon}</div>
        <h2 className="font-display font-bold text-xl" style={{ color: 'var(--green-dark)' }}>{title}</h2>
      </div>
      <Link to={link} className="flex items-center gap-1 font-ui font-medium text-sm transition-all hover:gap-2" style={{ color: 'var(--green)' }}>
        View all <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export function Home() {
  const [articles, setArticles]    = useState<any[]>([]);
  const [policies, setPolicies]    = useState<any[]>([]);
  const [timelines, setTimelines]  = useState<any[]>([]);
  const [loading, setLoading]      = useState(true);
  useEffect(() => {
    Promise.all([getArticles(undefined, 10), getPolicyProjects(), getTimelines()])
      .then(([a, p, t]) => { setArticles(a); setPolicies(p); setTimelines(t); })
      .catch(console.error).finally(() => setLoading(false));
  }, []);
  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: 'var(--green-mid)', borderTopColor: 'transparent' }} />
        <p className="font-ui text-sm" style={{ color: 'var(--text-muted)' }}>Loading Veritas Nexus...</p>
      </div>
    </div>
  );
  const featured   = articles[0];
  const latest     = articles.slice(1, 5);
  const agri       = articles.filter((a: any) => a.primarySection === 'Agriculture').slice(0, 3);
  const tracker    = policies.slice(0, 4);
  const timelines3 = timelines.slice(0, 3);
  return (
    <div className="space-y-12">
      <section className="page-enter">
        <SectionHeading icon={<BookOpen className="w-4 h-4" />} title="Latest Stories" link="/national" />
        <div className="grid lg:grid-cols-2 gap-5">
          {featured && <ArticleCard article={featured} featured delay={50} />}
          <div className="space-y-4">{latest.map((a: any, i: number) => <ArticleCard key={a.id} article={a} delay={100 + i * 50} />)}</div>
        </div>
      </section>
      {agri.length > 0 && (
        <section className="page-enter stagger-2">
          <SectionHeading icon={<Wheat className="w-4 h-4" />} title="Agriculture Intelligence" link="/agriculture" />
          <div className="grid md:grid-cols-3 gap-4">{agri.map((a: any, i: number) => <ArticleCard key={a.id} article={a} delay={200 + i * 60} />)}</div>
        </section>
      )}
      {tracker.length > 0 && (
        <section className="page-enter stagger-3">
          <SectionHeading icon={<FileText className="w-4 h-4" />} title="Policy Tracker" link="/policy-tracker" />
          <div className="rounded-xl overflow-hidden" style={{ background: 'var(--white)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                  <tr>{['Project','Budget','Status','Agency'].map(h => <th key={h} className="text-left px-5 py-3 font-ui font-semibold" style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {tracker.map((p: any, i: number) => (
                    <tr key={p.id} className="transition-colors hover:bg-green-50/50" style={{ borderBottom: i < tracker.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <td className="px-5 py-4"><Link to={`/policy-tracker/${p.slug}`} className="font-medium font-ui text-sm transition-colors hover:text-green" style={{ color: 'var(--text)' }}>{p.name}</Link></td>
                      <td className="px-5 py-4 font-ui text-sm" style={{ color: 'var(--text-muted)' }}>₱{p.budget}</td>
                      <td className="px-5 py-4"><span className={`status-badge status-${p.status?.toLowerCase()}`}>{p.status}</span></td>
                      <td className="px-5 py-4 font-ui text-sm" style={{ color: 'var(--text-muted)' }}>{p.agency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      {timelines3.length > 0 && (
        <section className="page-enter stagger-4">
          <SectionHeading icon={<Clock className="w-4 h-4" />} title="Active Timelines" link="/timelines" />
          <div className="grid md:grid-cols-3 gap-4">
            {timelines3.map((t: any, i: number) => {
              const entries = Array.isArray(t.entries) ? t.entries : JSON.parse(t.entries || '[]');
              const last = entries[entries.length - 1];
              return (
                <Link key={t.id} to={`/timelines/${t.slug}`} className="vn-card block p-5 group" style={{ animationDelay: `${300 + i * 60}ms` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-3.5 h-3.5" style={{ color: 'var(--green)' }} />
                    <span className="font-ui font-semibold" style={{ fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--green)' }}>Timeline</span>
                  </div>
                  <h3 className="font-display font-bold text-base mb-2 transition-colors group-hover:text-green" style={{ color: 'var(--green-dark)' }}>{t.name}</h3>
                  <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--text-muted)' }}>{t.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-xs" style={{ color: 'var(--text-light)' }}>{entries.length} events</span>
                    {last && <span className="font-ui text-xs truncate ml-2" style={{ color: 'var(--text-light)', maxWidth: '60%' }}>Latest: {last.heading}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
      <section className="rounded-2xl p-7 page-enter stagger-5" style={{ background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green) 60%, var(--green-accent) 100%)', boxShadow: '0 8px 32px rgba(26,107,60,0.25)' }}>
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h2 className="font-display font-bold text-xl text-white mb-2">News + Context + Data</h2>
            <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.80)' }}>Veritas Nexus is a Philippine news intelligence platform built for readers who want to understand, not just scroll.</p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link to="/topics" className="btn-primary" style={{ background: 'white', color: 'var(--green-dark)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}><Target className="w-4 h-4" />Explore Topics</Link>
            <Link to="/documents" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white', background: 'rgba(255,255,255,0.10)' }}><FileText className="w-4 h-4" />Documents</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
