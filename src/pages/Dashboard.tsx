import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown, Minus, Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { getPolicyProjects } from '@/lib/api';

const SECTOR_ICONS: Record<string, string> = {
  Infrastructure: '🏗️', Agriculture: '🌾', Defense: '🛡️',
  Healthcare: '🏥', Education: '🎓', Technology: '💻',
  Energy: '⚡', Environment: '🌿',
};

const SECTOR_COLORS: Record<string, { bg: string; bar: string; text: string }> = {
  Infrastructure: { bg: 'bg-amber-50',   bar: 'bg-amber-500',   text: 'text-amber-700' },
  Agriculture:    { bg: 'bg-green-50',   bar: 'bg-green-500',   text: 'text-green-700' },
  Defense:        { bg: 'bg-blue-50',    bar: 'bg-blue-500',    text: 'text-blue-700' },
  Healthcare:     { bg: 'bg-red-50',     bar: 'bg-red-400',     text: 'text-red-700' },
  Education:      { bg: 'bg-purple-50',  bar: 'bg-purple-500',  text: 'text-purple-700' },
  Technology:     { bg: 'bg-cyan-50',    bar: 'bg-cyan-500',    text: 'text-cyan-700' },
  Energy:         { bg: 'bg-orange-50',  bar: 'bg-orange-500',  text: 'text-orange-700' },
  Environment:    { bg: 'bg-emerald-50', bar: 'bg-emerald-500', text: 'text-emerald-700' },
};

function CircleProgress({ value, size = 56 }: { value: number; size?: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle cx="24" cy="24" r={r} fill="none" stroke="#1a6b3c" strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 24 24)" />
      <text x="24" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f4c2a">
        {value}%
      </text>
    </svg>
  );
}

export function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPolicyProjects().then(setProjects).catch(console.error).finally(() => setLoading(false));
  }, []);

  const sectorMap: Record<string, any[]> = {};
  projects.forEach(p => {
    const tag = p.sectionTag || 'Other';
    if (!sectorMap[tag]) sectorMap[tag] = [];
    sectorMap[tag].push(p);
  });

  const sectors = Object.entries(sectorMap).map(([name, projs]) => {
    const ongoing   = projs.filter(p => p.status === 'Ongoing').length;
    const delayed   = projs.filter(p => p.status === 'Delayed').length;
    const completed = projs.filter(p => p.status === 'Completed').length;
    const total     = projs.length;
    const onTrackPct = total > 0 ? Math.round(((ongoing + completed) / total) * 100) : 0;
    return { name, projs, ongoing, delayed, completed, total, onTrackPct };
  });

  const totalProjects  = projects.length;
  const totalOngoing   = projects.filter(p => p.status === 'Ongoing').length;
  const totalDelayed   = projects.filter(p => p.status === 'Delayed').length;
  const totalCompleted = projects.filter(p => p.status === 'Completed').length;
  const onTrackPct     = totalProjects > 0 ? Math.round(((totalOngoing + totalCompleted) / totalProjects) * 100) : 0;

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-500 font-ui">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-green" />
          <span className="text-xs font-ui font-semibold text-green uppercase tracking-widest">Platform Tool</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-green-dark">National Development Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm font-ui max-w-2xl">
          Track the state of Philippine national development across key sectors.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects',  value: totalProjects,  icon: <Activity className="w-5 h-5" />,     color: 'text-green',       bg: 'bg-green-50' },
          { label: 'Ongoing',         value: totalOngoing,   icon: <TrendingUp className="w-5 h-5" />,   color: 'text-blue-600',    bg: 'bg-blue-50' },
          { label: 'Delayed',         value: totalDelayed,   icon: <AlertCircle className="w-5 h-5" />,  color: 'text-amber-600',   bg: 'bg-amber-50' },
          { label: 'Completed',       value: totalCompleted, icon: <CheckCircle className="w-5 h-5" />,  color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`inline-flex p-2 rounded-lg ${card.bg} ${card.color} mb-3`}>{card.icon}</div>
            <p className="text-3xl font-display font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 font-ui mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-display font-bold text-green-dark">Overall Program Health</h2>
            <p className="text-xs text-gray-500 font-ui mt-0.5">Based on {totalProjects} tracked projects</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-green-dark">{onTrackPct}%</p>
            <p className="text-xs text-gray-500 font-ui">on track</p>
          </div>
        </div>
        <div className="h-3 rounded-full overflow-hidden bg-gray-100 flex">
          <div className="bg-green transition-all duration-700" style={{ width: totalProjects > 0 ? `${(totalOngoing / totalProjects) * 100}%` : '0%' }} />
          <div className="bg-blue-400 transition-all duration-700" style={{ width: totalProjects > 0 ? `${(totalCompleted / totalProjects) * 100}%` : '0%' }} />
          <div className="bg-amber-400 transition-all duration-700" style={{ width: totalProjects > 0 ? `${(totalDelayed / totalProjects) * 100}%` : '0%' }} />
        </div>
        <div className="flex items-center gap-6 mt-3 text-xs font-ui text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green inline-block" />Ongoing ({totalOngoing})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />Completed ({totalCompleted})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />Delayed ({totalDelayed})</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-green-dark">Sectors</h2>
          <Link to="/policy-tracker" className="text-sm text-green hover:text-green-dark flex items-center gap-1 font-ui">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map(sector => {
            const colors = SECTOR_COLORS[sector.name] || { bg: 'bg-gray-50', bar: 'bg-gray-400', text: 'text-gray-700' };
            const icon = SECTOR_ICONS[sector.name] || '📋';
            const delayedRatio = sector.total > 0 ? sector.delayed / sector.total : 0;
            const StatusIcon = delayedRatio > 0.3
              ? <TrendingDown className="w-4 h-4 text-red-500" />
              : delayedRatio > 0.15
                ? <Minus className="w-4 h-4 text-amber-500" />
                : <TrendingUp className="w-4 h-4 text-green" />;
            return (
              <div key={sector.name} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-green-mid transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center text-xl`}>{icon}</div>
                    <div>
                      <h3 className="font-display font-semibold text-gray-900">{sector.name}</h3>
                      <p className="text-xs text-gray-500 font-ui">{sector.total} projects</p>
                    </div>
                  </div>
                  {StatusIcon}
                </div>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-4xl font-display font-bold text-gray-900">{sector.ongoing}</p>
                    <p className="text-xs text-gray-500 font-ui">active now</p>
                  </div>
                  <CircleProgress value={sector.onTrackPct} />
                </div>
                <div className="h-1.5 rounded-full overflow-hidden bg-gray-100 flex mb-3">
                  <div className="bg-green" style={{ width: sector.total > 0 ? `${(sector.ongoing / sector.total) * 100}%` : '0%' }} />
                  <div className="bg-blue-400" style={{ width: sector.total > 0 ? `${(sector.completed / sector.total) * 100}%` : '0%' }} />
                  <div className="bg-amber-400" style={{ width: sector.total > 0 ? `${(sector.delayed / sector.total) * 100}%` : '0%' }} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: 'Ongoing',  value: sector.ongoing,   color: 'text-green' },
                    { label: 'Delayed',  value: sector.delayed,   color: 'text-amber-600' },
                    { label: 'Done',     value: sector.completed, color: 'text-blue-600' },
                  ].map(s => (
                    <div key={s.label} className="bg-gray-50 rounded-lg py-2">
                      <p className={`text-lg font-display font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-gray-400 font-ui">{s.label}</p>
                    </div>
                  ))}
                </div>
                <Link to="/policy-tracker" className="inline-flex items-center gap-1 text-xs text-green hover:text-green-dark mt-4 font-ui font-medium">
                  View projects <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {projects.filter(p => p.status === 'Delayed').length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-display font-bold text-green-dark">Projects Needing Attention</h2>
          </div>
          <div className="space-y-3">
            {projects.filter(p => p.status === 'Delayed').map((p: any) => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500 font-ui">{p.agency} · {p.sectionTag}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-ui font-medium text-gray-700">₱{p.budget}</span>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-ui font-medium">Delayed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-green-light rounded-xl p-5 border border-green-mid">
        <h3 className="font-display font-semibold text-green-dark mb-1">About This Dashboard</h3>
        <p className="text-gray-700 text-sm font-ui leading-relaxed">
          Data is editorial — manually updated from official government sources, not scraped.
          Designed to be cited by researchers and media as a public accountability tool.
          <Link to="/policy-tracker" className="text-green font-medium ml-1 hover:text-green-dark">View full Policy Tracker →</Link>
        </p>
      </div>
    </div>
  );
}
