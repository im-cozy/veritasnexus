import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, FileText, Target } from 'lucide-react';
import { getArticles, getPolicyProjects, getTimelines } from '@/lib/api';
import type { Section } from '@/types';
function getSectionColor(section: Section): string {
  const colors: Record<Section, string> = { National:'bg-blue-50 text-blue-700 border-blue-200', Economy:'bg-amber-50 text-amber-700 border-amber-200', Agriculture:'bg-green-50 text-green-700 border-green-200', Environment:'bg-emerald-50 text-emerald-700 border-emerald-200', GlobalAffairs:'bg-purple-50 text-purple-700 border-purple-200' };
  return colors[section] || 'bg-gray-50 text-gray-700 border-gray-200';
}
function ArticleCard({ article, featured=false }: { article: any; featured?: boolean }) {
  return (
    <article className={`group ${featured ? '' : 'border-b border-gray-100 pb-5 last:border-0'}`}>
      <Link to={`/${article.primarySection?.toLowerCase()}/${article.slug}`}>
        {featured && article.featuredImageUrl && (<div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden"><img src={article.featuredImageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>)}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded border font-ui ${getSectionColor(article.primarySection)}`}>{article.primarySection}</span>
          {article.articleType === 'IntelligenceBrief' && (<span className="brief-badge"><Target className="w-3 h-3" />Intelligence Brief</span>)}
        </div>
        <h3 className={`font-display font-semibold text-green-dark group-hover:text-green transition-colors ${featured ? 'text-xl lg:text-2xl' : 'text-base'}`}>{article.title}</h3>
        <p className={`text-gray-600 mt-2 ${featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>{article.excerpt}</p>
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 font-ui">
          <span>{new Date(article.publishedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
          <span>•</span><span>{article.readTime} min read</span>
        </div>
      </Link>
    </article>
  );
}
export function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [timelines, setTimelines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([getArticles(undefined,10),getPolicyProjects(),getTimelines()])
      .then(([a,p,t])=>{setArticles(a);setPolicies(p);setTimelines(t);})
      .catch(console.error).finally(()=>setLoading(false));
  },[]);
  if (loading) return (<div className="flex items-center justify-center py-20"><div className="text-center space-y-3"><div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin mx-auto" /><p className="text-sm text-gray-500 font-ui">Loading Veritas Nexus...</p></div></div>);
  const featuredArticle=articles[0], latestArticles=articles.slice(1,5), agricultureArticles=articles.filter((a:any)=>a.primarySection==='Agriculture').slice(0,3), trackerItems=policies.slice(0,4), timelineItems=timelines.slice(0,3);
  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-display font-bold text-green-dark">Latest Stories</h2><Link to="/national" className="text-sm text-green hover:text-green-dark flex items-center gap-1 font-ui">View all <ArrowRight className="w-4 h-4" /></Link></div>
        <div className="grid lg:grid-cols-2 gap-8">
          {featuredArticle && <ArticleCard article={featuredArticle} featured />}
          <div className="space-y-5">{latestArticles.map((a:any)=><ArticleCard key={a.id} article={a} />)}</div>
        </div>
      </section>
      {agricultureArticles.length>0 && (<section className="border-t border-gray-200 pt-8"><div className="flex items-center justify-between mb-6"><div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green" /><h2 className="text-xl font-display font-bold text-green-dark">Agriculture Intelligence</h2></div><Link to="/agriculture" className="text-sm text-green hover:text-green-dark flex items-center gap-1 font-ui">View all <ArrowRight className="w-4 h-4" /></Link></div><div className="grid md:grid-cols-3 gap-6">{agricultureArticles.map((a:any)=><ArticleCard key={a.id} article={a} />)}</div></section>)}
      <section className="border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between mb-6"><div className="flex items-center gap-2"><FileText className="w-5 h-5 text-green" /><h2 className="text-xl font-display font-bold text-green-dark">Policy Tracker</h2></div><Link to="/policy-tracker" className="text-sm text-green hover:text-green-dark flex items-center gap-1 font-ui">View all <ArrowRight className="w-4 h-4" /></Link></div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr>{['Project','Budget','Status','Agency'].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase font-ui">{h}</th>)}</tr></thead><tbody className="divide-y divide-gray-100">{trackerItems.map((p:any)=>(<tr key={p.id} className="hover:bg-gray-50"><td className="px-4 py-3"><Link to={`/policy-tracker/${p.slug}`} className="font-medium text-gray-900 hover:text-green transition-colors">{p.name}</Link></td><td className="px-4 py-3 text-sm text-gray-600 font-ui">₱{p.budget}</td><td className="px-4 py-3"><span className={`status-badge status-${p.status?.toLowerCase()}`}>{p.status}</span></td><td className="px-4 py-3 text-sm text-gray-600 font-ui">{p.agency}</td></tr>))}</tbody></table></div></div>
      </section>
      {timelineItems.length>0 && (<section className="border-t border-gray-200 pt-8"><div className="flex items-center justify-between mb-6"><div className="flex items-center gap-2"><Clock className="w-5 h-5 text-green" /><h2 className="text-xl font-display font-bold text-green-dark">Active Timelines</h2></div><Link to="/timelines" className="text-sm text-green hover:text-green-dark flex items-center gap-1 font-ui">View all <ArrowRight className="w-4 h-4" /></Link></div><div className="grid md:grid-cols-3 gap-4">{timelineItems.map((t:any)=>{const entries=Array.isArray(t.entries)?t.entries:JSON.parse(t.entries||'[]');return(<Link key={t.id} to={`/timelines/${t.slug}`} className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-mid hover:shadow-sm transition-all"><h3 className="font-display font-semibold text-green-dark">{t.name}</h3><p className="text-sm text-gray-600 mt-1 line-clamp-2">{t.description}</p><div className="flex items-center gap-2 mt-3 text-xs text-gray-500 font-ui"><span>{entries.length} events</span></div></Link>);})}</div></section>)}
      <section className="border-t border-gray-200 pt-8 pb-8"><div className="bg-green-light rounded-lg p-6 lg:p-8"><h2 className="text-xl font-display font-bold text-green-dark mb-3">News + Context + Data</h2><p className="text-gray-700 max-w-2xl">Veritas Nexus is a Philippine news intelligence platform built for readers who want to understand, not just scroll.</p><div className="flex flex-wrap gap-4 mt-5"><Link to="/topics" className="inline-flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg hover:bg-green-dark transition-colors font-ui text-sm"><Target className="w-4 h-4" />Explore Topics</Link><Link to="/documents" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-green border border-green rounded-lg hover:bg-green-light transition-colors font-ui text-sm"><FileText className="w-4 h-4" />Document Archive</Link></div></div></section>
    </div>
  );
}
