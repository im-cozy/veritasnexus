import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPolicyProjects } from '@/lib/api';

export function PolicyTracker() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getPolicyProjects().then(setProjects).catch(console.error).finally(() => setLoading(false));
  }, []);

  const statuses = ['All','Ongoing','Delayed','Planning','Completed','Cancelled'];
  const filtered = filter === 'All' ? projects : projects.filter((p:any) => p.status === filter);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-green-dark">Policy Tracker</h1>
        <p className="text-gray-600 mt-2">Tracking government projects and promises over time.</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm font-ui font-medium transition-colors ${filter===s?'bg-green text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>{['Project','Agency','Budget','Status','Section'].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase font-ui">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p:any) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <Link to={`/policy-tracker/${p.slug}`} className="font-medium text-gray-900 hover:text-green transition-colors block">{p.name}</Link>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{p.description}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-ui">{p.agency}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-ui">₱{p.budget}</td>
                  <td className="px-4 py-4"><span className={`status-badge status-${p.status?.toLowerCase()}`}>{p.status}</span></td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-ui">{p.sectionTag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length===0 && <div className="text-center py-12 text-gray-500 font-ui">No projects found.</div>}
      </div>
    </div>
  );
}
