import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Target } from 'lucide-react';
import { getArticles } from '@/lib/api';

const SECTION_MAP: Record<string, string> = {
  national: 'National',
  economy: 'Economy',
  agriculture: 'Agriculture',
  environment: 'Environment',
  global: 'GlobalAffairs',
  'global-affairs': 'GlobalAffairs',
};
const SECTION_LABELS: Record<string, string> = {
  national: 'National',
  economy: 'Economy',
  agriculture: 'Agriculture',
  environment: 'Environment',
  global: 'Global Affairs',
  'global-affairs': 'Global Affairs',
};
const SECTION_COLORS: Record<string, string> = {
  National: 'bg-blue-50 text-blue-700 border-blue-200',
  Economy: 'bg-amber-50 text-amber-700 border-amber-200',
  Agriculture: 'bg-green-50 text-green-700 border-green-200',
  Environment: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  GlobalAffairs: 'bg-purple-50 text-purple-700 border-purple-200',
};

export function Section() {
  const { section } = useParams<{ section: string }>();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionKey = SECTION_MAP[section || ''];
  const sectionLabel = SECTION_LABELS[section || ''] || section;

  useEffect(() => {
    if (!sectionKey) { setLoading(false); return; }
    getArticles(sectionKey, 20)
      .then(setArticles).catch(console.error).finally(() => setLoading(false));
  }, [section, sectionKey]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-green-dark">{sectionLabel}</h1>
        <p className="text-gray-600 mt-1 font-ui">{articles.length} article{articles.length !== 1 ? "s" : ""}</p>
      </div>
      {articles.length === 0 ? (
        <div className="text-center py-16 text-gray-500 font-ui">
          <p>No articles in this section yet.</p>
          <Link to="/" className="text-green hover:text-green-dark mt-4 inline-block">Return to Home</Link>
        </div>
      ) : (
        <div className="space-y-0 bg-white border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
          {articles.map((article: any) => (
            <article key={article.id} className="p-5 hover:bg-gray-50 transition-colors group">
              <Link to={`/${section}/${article.slug}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded border font-ui ${SECTION_COLORS[sectionKey] || ""}`}>{sectionLabel}</span>
                  {article.articleType === "IntelligenceBrief" && <span className="brief-badge"><Target className="w-3 h-3" />Intelligence Brief</span>}
                </div>
                <h2 className="text-lg font-display font-semibold text-green-dark group-hover:text-green transition-colors">{article.title}</h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 font-ui">
                  <span>{new Date(article.publishedAt).toLocaleDateString("en-US", {month:"short",day:"numeric",year:"numeric"})}</span>
                  <span>•</span><span>{article.readTime} min read</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
