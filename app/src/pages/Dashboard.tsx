import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { dashboardSectors } from '@/data/seed';

function StatusIndicator({ ongoing, delayed, completed }: { ongoing: number; delayed: number; completed: number }) {
  const total = ongoing + delayed + completed;
  const delayedRatio = delayed / total;
  
  if (delayedRatio > 0.3) {
    return <TrendingDown className="w-5 h-5 text-red-500" />;
  } else if (delayedRatio > 0.15) {
    return <Minus className="w-5 h-5 text-amber-500" />;
  }
  return <TrendingUp className="w-5 h-5 text-green" />;
}

export function Dashboard() {
  const totalProjects = dashboardSectors.reduce((acc, s) => acc + s.activeProjects, 0);
  const totalBudget = dashboardSectors.reduce((acc, s) => {
    const budgetNum = parseInt(s.totalBudget.replace(/[^0-9]/g, ''));
    return acc + (isNaN(budgetNum) ? 0 : budgetNum);
  }, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <LayoutDashboard className="w-5 h-5 text-green" />
          <span className="text-sm font-medium text-green font-ui">Platform Tool</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-green-dark">National Development Dashboard</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Track the state of Philippine national development across key sectors. 
          A public accountability tool for researchers, analysts, and government watchers.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-3xl font-bold text-green-dark font-display">{totalProjects}</p>
          <p className="text-sm text-gray-500 font-ui">Active Projects</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-3xl font-bold text-green-dark font-display">₱{(totalBudget / 1000).toFixed(2)}T</p>
          <p className="text-sm text-gray-500 font-ui">Total Budget</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-3xl font-bold text-green-dark font-display">
            {dashboardSectors.reduce((acc, s) => acc + s.statusBreakdown.ongoing, 0)}
          </p>
          <p className="text-sm text-gray-500 font-ui">On Track</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-3xl font-bold text-green-dark font-display">
            {dashboardSectors.reduce((acc, s) => acc + s.statusBreakdown.delayed, 0)}
          </p>
          <p className="text-sm text-gray-500 font-ui">Delayed</p>
        </div>
      </div>

      {/* Sector Cards */}
      <div>
        <h2 className="text-xl font-display font-bold text-green-dark mb-4">Sectors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardSectors.map(sector => (
            <div 
              key={sector.name}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:border-green-mid hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg text-green-dark">
                    {sector.name}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1 font-display">
                    {sector.activeProjects}
                  </p>
                  <p className="text-sm text-gray-500 font-ui">active projects</p>
                </div>
                <StatusIndicator 
                  ongoing={sector.statusBreakdown.ongoing}
                  delayed={sector.statusBreakdown.delayed}
                  completed={sector.statusBreakdown.completed}
                />
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-ui">Budget:</span>
                  <span className="font-medium text-gray-900 font-ui">{sector.totalBudget}</span>
                </div>
                
                {/* Status Breakdown */}
                <div className="mt-3">
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-green"
                      style={{ 
                        width: `${(sector.statusBreakdown.ongoing / sector.activeProjects) * 100}%` 
                      }}
                    />
                    <div 
                      className="bg-amber-500"
                      style={{ 
                        width: `${(sector.statusBreakdown.delayed / sector.activeProjects) * 100}%` 
                      }}
                    />
                    <div 
                      className="bg-blue-500"
                      style={{ 
                        width: `${(sector.statusBreakdown.completed / sector.activeProjects) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500 font-ui">
                    <span>{sector.statusBreakdown.ongoing} ongoing</span>
                    <span>{sector.statusBreakdown.delayed} delayed</span>
                    <span>{sector.statusBreakdown.completed} completed</span>
                  </div>
                </div>
                
                {/* Key Metrics */}
                <div className="mt-4 space-y-2">
                  {sector.keyMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-ui">{metric.label}:</span>
                      <span className="font-medium text-gray-900 font-ui">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                to={`/policy-tracker?sector=${sector.name.toLowerCase()}`}
                className="inline-flex items-center gap-1 text-sm text-green hover:text-green-dark mt-4 font-ui"
              >
                View projects <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm bg-gray-50 rounded-lg p-4">
        <span className="text-gray-500 font-ui">Status indicators:</span>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green" />
          <span className="text-gray-600 font-ui">On track (&lt;15% delayed)</span>
        </div>
        <div className="flex items-center gap-2">
          <Minus className="w-4 h-4 text-amber-500" />
          <span className="text-gray-600 font-ui">Mixed (15-30% delayed)</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-red-500" />
          <span className="text-gray-600 font-ui">Concerning (&gt;30% delayed)</span>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="bg-green-light rounded-lg p-5">
        <h3 className="font-display font-semibold text-green-dark mb-2">
          About This Dashboard
        </h3>
        <p className="text-gray-700 text-sm">
          Data is editorial — manually updated from official government sources, not scraped. 
          Each sector card shows active project counts, total budgets, and status breakdowns. 
          Click through to the Policy Tracker for detailed project information. This dashboard 
          is designed to be cited by researchers and media as a public accountability tool.
        </p>
      </div>
    </div>
  );
}
