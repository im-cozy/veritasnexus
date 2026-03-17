// Veritas Nexus Type Definitions

export type ArticleType = 'NewsAnalysis' | 'IntelligenceBrief';

export type Section = 'National' | 'Economy' | 'Agriculture' | 'Environment' | 'GlobalAffairs';

export type ProjectStatus = 'Planning' | 'Ongoing' | 'Delayed' | 'Completed' | 'Cancelled';

export type DocumentType = 'Policy' | 'Legislation' | 'Research' | 'Budget' | 'International' | 'Data';

export interface Author {
  id: string;
  name: string;
  bio?: string;
  photoUrl?: string;
  role: string;
}

export interface Source {
  type: string;
  label: string;
  url?: string;
  documentId?: string;
}

export interface WhatItMeans {
  stakeholder: string;
  effect: string;
}

export interface KnowledgeBoxEntry {
  question: string;
  answer: string;
}

export interface KnowledgeBox {
  title: string;
  entries: KnowledgeBoxEntry[];
}

export interface IntelligenceBriefData {
  summary: string;
  whatHappened: string;
  whyItMatters: string;
  historicalContext: string;
  possibleOutcomes: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  articleType: ArticleType;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  primarySection: Section;
  tags: string[];
  sources: Source[];
  whatItMeans: WhatItMeans[];
  intelligenceBrief?: IntelligenceBriefData;
  timelineTopicId?: string;
  topicPageId?: string;
  knowledgeBox?: KnowledgeBox;
  featuredImage?: {
    url: string;
    alt: string;
  };
  readTime: number;
}

export interface TimelineEntry {
  id: string;
  date: string;
  year: number;
  heading: string;
  summary: string;
  articleId?: string;
  isCurrent?: boolean;
}

export interface TimelineTopic {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage?: string;
  entries: TimelineEntry[];
  topicPageId?: string;
}

export interface PolicyUpdate {
  date: string;
  summary: string;
  sourceUrl?: string;
}

export interface PolicyProject {
  id: string;
  name: string;
  slug: string;
  agency: string;
  budget: string;
  status: ProjectStatus;
  description: string;
  startDate?: string;
  targetDate?: string;
  fundingSource?: string;
  updates: PolicyUpdate[];
  sectionTag: string;
  topicPageId?: string;
}

export interface KeyActor {
  name: string;
  role: string;
  organization: string;
  photoUrl?: string;
}

export interface TopicPage {
  id: string;
  name: string;
  slug: string;
  overview: string;
  coverImage?: string;
  timelineTopic?: TimelineTopic;
  relatedPolicies: PolicyProject[];
  keyActors: KeyActor[];
  tags: string[];
  relatedArticles: Article[];
}

export interface Document {
  id: string;
  title: string;
  slug: string;
  summary: string;
  sourceAgency: string;
  documentType: DocumentType;
  publishedDate: string;
  fileUrl: string;
  sectionTag: string;
  relatedArticles: Article[];
  relatedTopics: TopicPage[];
}

export interface DashboardSector {
  name: string;
  activeProjects: number;
  totalBudget: string;
  statusBreakdown: {
    ongoing: number;
    delayed: number;
    completed: number;
  };
  keyMetrics: {
    label: string;
    value: string;
  }[];
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}
