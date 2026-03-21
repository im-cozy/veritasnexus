import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Target, BookOpen, Lightbulb, Users, ArrowRight, Clock } from 'lucide-react';
import { getArticle, getTimeline } from '@/lib/api';

function getSectionColor(section: string): string {
  const colors: Record<string, string> = {
    National: 'bg-blue-50 text-blue-700 border-blue-200',
    Economy: 'bg-amber-50 text-amber-700 border-amber-200',
    Agriculture: 'bg-green-50 text-green-700 border-green-200',
    Environment: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    GlobalAffairs: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return colors[section] || 'bg-gray-50 text-gray-700 border-gray-200';
}

export function Article() {
  const { section, slug } = useParams<{ section: string; slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [timeline, setTimeline] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getArticle(slug)
      .then(async (a) => {
        setArticle(a);
        if (a.timelineTopicId) {
          try {
            const t = await getTimeline(a.timelineTopicId);
            setTimeline(t);
          } catch {}
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (notFound || !article) return (
    <div className="text-center py-16">
      <h1 className="text-2xl font-display font-bold text-green-dark mb-4">Article Not Found</h1>
      <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
      <Link to="/" className="inline-flex items-center gap-2 text-green hover:text-green-dark font-ui">
        <ArrowLeft className="w-4 h-4" />Return to Home
      </Link>
    </div>
  );

  const sources = Array.isArray(article.sources) ? article.sources : JSON.parse(article.sources || '[]');
  const whatItMeans = Array.isArray(article.whatItMeans) ? article.whatItMeans : JSON.parse(article.whatItMeans || '[]');
  const knowledgeBox = article.knowledgeBox ? (typeof article.knowledgeBox === 'string' ? JSON.parse(article.knowledgeBox) : article.knowledgeBox) : null;
  const intelligenceBrief = article.intelligenceBrief ? (typeof article.intelligenceBrief === 'string' ? JSON.parse(article.intelligenceBrief) : article.intelligenceBrief) : null;
  const timelineEntries = timeline ? (Array.isArray(timeline.entries) ? timeline.entries : JSON.parse(timeline.entries || '[]')) : [];

  return (
    <article className="space-y-8 max-w-3xl">
      <Link to={`/${section}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green transition-colors font-ui">
        <ArrowLeft className="w-4 h-4" />Back to {article.primarySection}
      </Link>

      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-medium px-2 py-0.5 rounded border font-ui ${getSectionColor(article.primarySection)}`}>
            {article.primarySection}
          </span>
          {article.articleType === 'IntelligenceBrief' && (
            <span className="brief-badge"><Target className="w-3 h-3" />Intelligence Brief</span>
          )}
        </div>
        <h1 className="article-title">{article.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 font-ui flex-wrap">
          <span className="font-medium text-gray-700">{article.authorId}</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span>{article.readTime} min read</span>
        </div>
      </header>

      {article.articleType === 'IntelligenceBrief' && intelligenceBrief && (
        <div className="bg-green-dark text-white rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2"><Target className="w-4 h-4" /><span className="text-sm font-ui font-semibold uppercase tracking-wide">Intelligence Brief</span></div>
          <div>
            <div className="text-xs font-ui font-semibold text-green-mid uppercase tracking-wide mb-1">Summary</div>
            <p className="text-sm leading-relaxed">{intelligenceBrief.summary}</p>
          </div>
          {intelligenceBrief.whatHappened && (
            <div>
              <div className="text-xs font-ui font-semibold text-green-mid uppercase tracking-wide mb-1">What Happened</div>
              <p className="text-sm leading-relaxed">{intelligenceBrief.whatHappened}</p>
            </div>
          )}
          {intelligenceBrief.whyItMatters && (
            <div>
              <div className="text-xs font-ui font-semibold text-green-mid uppercase tracking-wide mb-1">Why It Matters</div>
              <p className="text-sm leading-relaxed">{intelligenceBrief.whyItMatters}</p>
            </div>
          )}
          {intelligenceBrief.possibleOutcomes?.length > 0 && (
            <div>
              <div className="text-xs font-ui font-semibold text-green-mid uppercase tracking-wide mb-2">Possible Outcomes</div>
              <ul className="space-y-1">
                {intelligenceBrief.possibleOutcomes.map((o: string, i: number) => (
                  <li key={i} className="text-sm flex gap-2"><span className="text-green-mid">→</span>{o}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed text-gray-800 font-serif">{article.content}</p>
      </div>

      {sources.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-green" />
            <h3 className="text-sm font-ui font-semibold text-gray-700 uppercase tracking-wide">Verified Sources</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {sources.map((s: any, i: number) => (
              <a key={i} href={s.url || '#'} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-ui text-gray-600 hover:border-green hover:text-green transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {whatItMeans.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-green" />
            <h3 className="text-sm font-ui font-semibold text-gray-700 uppercase tracking-wide">What It Means</h3>
          </div>
          <div className="space-y-3">
            {whatItMeans.map((item: any, i: number) => (
              <div key={i} className="flex gap-3 p-3 bg-green-light rounded-lg">
                <div className="w-1 bg-green rounded-full flex-shrink-0" />
                <div>
                  <div className="text-xs font-ui font-semibold text-green uppercase tracking-wide mb-1">{item.stakeholder}</div>
                  <p className="text-sm text-gray-700">{item.effect}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {timeline && timelineEntries.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-green" />
            <h3 className="text-sm font-ui font-semibold text-gray-700 uppercase tracking-wide">Story Timeline — {timeline.name}</h3>
          </div>
          <div className="space-y-3">
            {timelineEntries.map((entry: any, i: number) => (
              <div key={i} className={`flex gap-3 ${entry.isCurrent ? 'opacity-100' : 'opacity-70'}`}>
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${entry.isCurrent ? 'bg-green' : 'bg-gray-300'}`} />
                  {i < timelineEntries.length - 1 && <div className="w-0.5 bg-gray-200 flex-1 my-1" />}
                </div>
                <div className="pb-3">
                  <div className="text-xs font-ui font-semibold text-gray-500">{entry.year}</div>
                  <div className={`text-sm font-medium ${entry.isCurrent ? 'text-green-dark' : 'text-gray-700'}`}>{entry.heading}</div>
                  <p className="text-xs text-gray-500 mt-0.5">{entry.summary}</p>
                  {entry.isCurrent && <span className="text-xs font-ui font-semibold text-green">← Current article</span>}
                </div>
              </div>
            ))}
          </div>
          <Link to={`/timelines/${timeline.slug}`} className="inline-flex items-center gap-1 text-sm text-green hover:text-green-dark font-ui mt-3">
            View full timeline <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {knowledgeBox && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-green" />
            <h3 className="text-sm font-ui font-semibold text-gray-700 uppercase tracking-wide">{knowledgeBox.title}</h3>
          </div>
          <div className="space-y-3">
            {knowledgeBox.entries?.map((e: any, i: number) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-800 mb-1">{e.question}</div>
                <p className="text-sm text-gray-600">{e.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
