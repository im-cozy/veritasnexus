import { useState } from 'react';
import { FileText, Search, Filter, ExternalLink } from 'lucide-react';
import { documents } from '@/data/seed';
import type { DocumentType } from '@/types';

const typeFilters: { label: string; value: DocumentType | 'all' }[] = [
  { label: 'All Types', value: 'all' },
  { label: 'Policy', value: 'Policy' },
  { label: 'Legislation', value: 'Legislation' },
  { label: 'Research', value: 'Research' },
  { label: 'Budget', value: 'Budget' },
  { label: 'International', value: 'International' },
  { label: 'Data', value: 'Data' },
];

const sectionFilters = [
  { label: 'All Sections', value: 'all' },
  { label: 'National', value: 'National' },
  { label: 'Economy', value: 'Economy' },
  { label: 'Agriculture', value: 'Agriculture' },
  { label: 'Environment', value: 'Environment' },
  { label: 'Global Affairs', value: 'GlobalAffairs' },
];

export function Documents() {
  const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = documents.filter(doc => {
    const matchesType = typeFilter === 'all' || doc.documentType === typeFilter;
    const matchesSection = sectionFilter === 'all' || doc.sectionTag === sectionFilter;
    const matchesSearch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.sourceAgency.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSection && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-green" />
          <span className="text-sm font-medium text-green font-ui">Platform Tool</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-green-dark">Document Archive</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          A centralized, searchable library of primary source documents — government policies, 
          legislation, research papers, and international reports that our journalism is built on.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-dark font-display">{documents.length}</p>
          <p className="text-sm text-gray-500 font-ui">Total Documents</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-dark font-display">
            {documents.filter(d => d.documentType === 'Legislation').length}
          </p>
          <p className="text-sm text-gray-500 font-ui">Legislation</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-dark font-display">
            {documents.filter(d => d.documentType === 'Policy').length}
          </p>
          <p className="text-sm text-gray-500 font-ui">Policy Documents</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-dark font-display">
            {documents.filter(d => d.documentType === 'Research').length}
          </p>
          <p className="text-sm text-gray-500 font-ui">Research Papers</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents, agencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg font-ui focus:outline-none focus:ring-2 focus:ring-green-accent"
          />
        </div>
        
        {/* Type Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 font-ui">Type:</span>
          {typeFilters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setTypeFilter(filter.value)}
              className={`px-3 py-1 text-xs rounded-full font-ui transition-colors ${
                typeFilter === filter.value
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
          <span className="text-sm text-gray-500 font-ui">Section:</span>
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

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map(doc => (
          <div 
            key={doc.id}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-green-mid hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-green-light text-green-dark rounded font-ui">
                    {doc.documentType}
                  </span>
                  <span className="text-xs text-gray-500 font-ui">{doc.sectionTag}</span>
                </div>
                
                <h3 className="font-display font-semibold text-lg text-green-dark">
                  {doc.title}
                </h3>
                
                <p className="text-gray-600 mt-2 text-sm">{doc.summary}</p>
                
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 font-ui">
                  <span>{doc.sourceAgency}</span>
                  <span>•</span>
                  <span>{new Date(doc.publishedDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
                
                {doc.relatedArticles.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-400 mb-1 font-ui">
                      Cited in {doc.relatedArticles.length} article{doc.relatedArticles.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
              
              <a 
                href={doc.fileUrl}
                className="flex-shrink-0 p-2 bg-green-light text-green rounded-lg hover:bg-green hover:text-white transition-colors"
                title="View Document"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
        
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No documents match your filters.</p>
            <button
              onClick={() => {
                setTypeFilter('all');
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
    </div>
  );
}
