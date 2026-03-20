import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { getTimelines } from '@/lib/api';

export function Timelines() {
  const [timelines, setTimelines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimelines().then(setTimelines).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-green-dark">Timelines</h1>
        <p className="text-gray-600 mt-2">Major ongoing stories rendered as navigable history.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {timelines.map((t:any) => {
          const entries = Array.isArray(t.entries) ? t.entries : JSON.parse(t.entries||'[]');
          const latest = entries[entries.length-1];
          return (
            <Link key={t.id} to={`/timelines/${t.slug}`}
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green hover:shadow-md transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-3"><Clock className="w-4 h-4 text-green" /><span className="text-xs font-ui font-semibold text-green uppercase tracking-wide">Timeline</span></div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green transition-colors" />
              </div>
              <h2 className="text-lg font-display font-bold text-green-dark group-hover:text-green transition-colors">{t.name}</h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{t.description}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-gray-500 font-ui">
                <span>{entries.length} events</span>
                {latest && <><span>•</span><span>Latest: {latest.heading}</span></>}
              </div>
            </Link>
          );
        })}
      </div>
      {timelines.length===0 && <div className="text-center py-12 text-gray-500 font-ui">No timelines available yet.</div>}
    </div>
  );
}
