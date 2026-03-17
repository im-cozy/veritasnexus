import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Building2, DollarSign, Target, FileText, ArrowRight } from 'lucide-react';
import { policyProjects } from '@/data/seed';

export function PolicyDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const project = policyProjects.find(p => p.slug === slug);
  
  if (!project) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-display font-bold text-green-dark mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
        <Link 
          to="/policy-tracker" 
          className="inline-flex items-center gap-2 text-green hover:text-green-dark font-ui"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Policy Tracker
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link 
        to="/policy-tracker"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green transition-colors font-ui"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Policy Tracker
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium px-2 py-0.5 rounded border bg-gray-100 text-gray-700 border-gray-200 font-ui">
            {project.sectionTag}
          </span>
          <span className={`status-badge ${
            project.status === 'Ongoing' ? 'status-ongoing' :
            project.status === 'Planning' ? 'status-planning' :
            project.status === 'Delayed' ? 'status-delayed' :
            project.status === 'Completed' ? 'status-completed' :
            'status-cancelled'
          }`}>
            {project.status}
          </span>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-green-dark">{project.name}</h1>
        
        <p className="text-gray-600 text-lg max-w-3xl">{project.description}</p>
      </header>

      {/* Key Details */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Building2 className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-ui">Agency</span>
          </div>
          <p className="text-lg font-medium text-gray-900 font-ui">{project.agency}</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-ui">Budget</span>
          </div>
          <p className="text-lg font-medium text-gray-900 font-ui">{project.budget}</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-ui">Timeline</span>
          </div>
          <p className="text-lg font-medium text-gray-900 font-ui">
            {project.startDate ? new Date(project.startDate).getFullYear() : 'TBD'} 
            {' - '}
            {project.targetDate ? new Date(project.targetDate).getFullYear() : 'TBD'}
          </p>
        </div>
      </div>

      {/* Funding Source */}
      {project.fundingSource && (
        <div className="bg-green-light rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-dark mb-1">
            <FileText className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-ui">Funding Source</span>
          </div>
          <p className="text-gray-700">{project.fundingSource}</p>
        </div>
      )}

      {/* Updates Timeline */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-display font-bold text-green-dark mb-6">Project Updates</h2>
        
        <div className="relative pl-6">
          <div className="timeline-line" />
          
          <div className="space-y-6">
            {project.updates.map((update, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-green" />
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-ui">
                    <Calendar className="w-4 h-4" />
                    {new Date(update.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <p className="text-gray-700">{update.summary}</p>
                  {update.sourceUrl && (
                    <a 
                      href={update.sourceUrl}
                      className="inline-flex items-center gap-1 text-sm text-green hover:text-green-dark mt-2 font-ui"
                    >
                      View source <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Coverage */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-display font-bold text-green-dark mb-4">Related Coverage</h2>
        <p className="text-gray-500 text-sm">
          Articles and analysis related to this project will appear here as they are published.
        </p>
      </div>
    </div>
  );
}
