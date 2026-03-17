import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, FileText, Search } from 'lucide-react';
import { policyProjects } from '@/data/seed';
import type { ProjectStatus } from '@/types';

const statusFilters: { label: string; value: ProjectStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Planning', value: 'Planning' },
  { label: 'Ongoing', value: 'Ongoing' },
  { label: 'Delayed', value: 'Delayed' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Cancelled', value: 'Cancelled' },
];

const sectionFilters = [
  { label: 'All Sectors', value: 'all' },
  { label: 'Infrastructure', value: 'Infrastructure' },
  { label: 'Agriculture', value: 'Agriculture' },
  { label: 'Defense', value: 'Defense' },
  { label: 'Health', value: 'Health' },
  { label: 'Education', value: 'Education' },
];

export function PolicyTracker() {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = policyProjects.filter(project => {
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesSection = sectionFilter === 'all' || project.sectionTag === sectionFilter;
    const matchesSearch = searchQuery === '' || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSection && matchesSearch;
  });

  const totalBudget = filteredProjects.reduce((acc, p) => {
    const budgetNum = parseInt(p.budget.replace(/[^0-9]/g, ''));
    return acc + (isNaN(budgetNum) ? 0 : budgetNum);
  }, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-green" />
          <span className="text-sm font-medium text-green font-ui">Platform Tool</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-green-dark">Policy Tracker</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Track government projects, promises, and infrastructure developments over time. 
          Every entry includes status updates, budget information, and related coverage.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-dark font-display">{policyProjects.length}</p>
          <p className="text-sm text-gray-500 font-ui">Total Projects</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-dark font-display">
            ₱{(totalBudget / 1000).toFixed(1)}T
          </p>
          <p className="text-sm text-gray-500 font-ui">Total Budget</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-dark font-display">
            {policyProjects.filter(p => p.status === 'Ongoing').length}
          </p>
          <p className="text-sm text-gray-500 font-ui">Active Projects</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-dark font-display">
            {policyProjects.filter(p => p.status === 'Delayed').length}
          </p>
          <p className="text-sm text-gray-500 font-ui">Delayed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, agencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg font-ui focus:outline-none focus:ring-2 focus:ring-green-accent"
          />
        </div>
        
        {/* Status Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 font-ui">Status:</span>
          {statusFilters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-3 py-1 text-xs rounded-full font-ui transition-colors ${
                statusFilter === filter.value
                  ? 'bg-green text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Section Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 font-ui">Sector:</span>
          {sectionFilters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setSectionFilter(filter.value)}
              className={`px-3 py-1 text-xs rounded-full font-ui transition-colors ${
                sectionFilter === filter.value
                  ? 'bg-green text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase font-ui">Project</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase font-ui">Agency</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase font-ui">Budget</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase font-ui">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase font-ui">Updates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map(project => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <Link 
                      to={`/policy-tracker/${project.slug}`}
                      className="block"
                    >
                      <p className="font-medium text-gray-900 hover:text-green transition-colors">
                        {project.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-ui">{project.agency}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-ui">{project.budget}</td>
                  <td className="px-4 py-4">
                    <span className={`status-badge ${
                      project.status === 'Ongoing' ? 'status-ongoing' :
                      project.status === 'Planning' ? 'status-planning' :
                      project.status === 'Delayed' ? 'status-delayed' :
                      project.status === 'Completed' ? 'status-completed' :
                      'status-cancelled'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-ui">
                    {project.updates.length} updates
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects match your filters.</p>
            <button
              onClick={() => {
                setStatusFilter('all');
                setSectionFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 text-green hover:text-green-dark font-ui text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="text-gray-500 font-ui">Status:</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green"></span>
          <span className="text-gray-600 font-ui">Ongoing</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          <span className="text-gray-600 font-ui">Planning</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span className="text-gray-600 font-ui">Delayed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="text-gray-600 font-ui">Completed</span>
        </div>
      </div>
    </div>
  );
}
