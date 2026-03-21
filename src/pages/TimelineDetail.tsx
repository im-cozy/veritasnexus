import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { getTimeline, getArticles } from "@/lib/api";

export function TimelineDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [timeline, setTimeline] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getTimeline(slug)
      .then(async (t) => {
        setTimeline(t);
        const allArticles = await getArticles(undefined, 50).catch(() => []);
        setRelatedArticles(allArticles.filter((a: any) => a.timelineTopicId === t.id));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin" /></div>;

  if (notFound || !timeline) return (
    <div className="text-center py-16">
      <h1 className="text-2xl font-display font-bold text-green-dark mb-4">Timeline Not Found</h1>
      <Link to="/timelines" className="inline-flex items-center gap-2 text-green hover:text-green-dark font-ui">
        <ArrowLeft className="w-4 h-4" />Return to Timelines
      </Link>
    </div>
  );

  const entries = Array.isArray(timeline.entries) ? timeline.entries : JSON.parse(timeline.entries || "[]");
  const sorted = [...entries].reverse();
  const earliestYear = entries[0]?.year;
  const latestYear = entries[entries.length - 1]?.year;

  return (
    <div className="space-y-8">
      <Link to="/timelines" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green transition-colors font-ui">
        <ArrowLeft className="w-4 h-4" />Back to Timelines
      </Link>

      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-green" />
          <span className="text-sm font-medium text-green font-ui">Timeline</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-green-dark">{timeline.name}</h1>
        <p className="text-gray-600 text-lg max-w-3xl">{timeline.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 font-ui">
          <span>{entries.length} events</span>
          <span>•</span>
          <span>{earliestYear} – {latestYear}</span>
          {relatedArticles.length > 0 && <><span>•</span><span>{relatedArticles.length} related articles</span></>}
        </div>
      </header>

      <div className="relative pl-8 lg:pl-12">
        <div className="absolute left-3 lg:left-4 top-4 bottom-4 w-0.5 bg-green-mid" />
        <div className="space-y-8">
          {sorted.map((entry: any, i: number) => (
            <div key={i} className="relative">
              <div className={`absolute -left-5 lg:-left-8 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${entry.isCurrent ? "bg-green border-green" : "bg-white border-green-mid"}`}>
                {entry.isCurrent && <span className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className={`bg-white border rounded-lg p-5 ${entry.isCurrent ? "border-green shadow-sm" : "border-gray-200"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-lg font-bold font-display ${entry.isCurrent ? "text-green" : "text-gray-400"}`}>{entry.year}</span>
                  {entry.isCurrent && <span className="text-xs px-2 py-0.5 bg-green text-white rounded font-ui">Current</span>}
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900">{entry.heading}</h3>
                <p className="text-gray-600 mt-2">{entry.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-display font-bold text-green-dark mb-4">Related Coverage</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {relatedArticles.map((article: any) => (
              <Link key={article.id} to={`/${article.primarySection?.toLowerCase()}/${article.slug}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-green-light transition-colors">
                <p className="font-medium text-gray-900">{article.title}</p>
                <p className="text-sm text-gray-500 mt-1 font-ui">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {month:"long",day:"numeric",year:"numeric"})} • {article.readTime} min read
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
