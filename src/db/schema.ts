import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// ── AUTHORS ──────────────────────────────────────────────
export const authors = sqliteTable('authors', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  bio: text('bio'),
  photoUrl: text('photo_url'),
  role: text('role').notNull(),
  email: text('email'),
})

// ── ARTICLES ─────────────────────────────────────────────
export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  articleType: text('article_type').notNull().default('NewsAnalysis'),
  publishedAt: text('published_at').notNull(),
  updatedAt: text('updated_at'),
  authorId: text('author_id').notNull(),
  primarySection: text('primary_section').notNull(),
  tags: text('tags').notNull().default('[]'),
  sources: text('sources').notNull().default('[]'),
  whatItMeans: text('what_it_means').notNull().default('[]'),
  intelligenceBrief: text('intelligence_brief'),
  timelineTopicId: text('timeline_topic_id'),
  topicPageId: text('topic_page_id'),
  knowledgeBox: text('knowledge_box'),
  featuredImageUrl: text('featured_image_url'),
  featuredImageAlt: text('featured_image_alt'),
  readTime: integer('read_time').notNull().default(5),
})

// ── TIMELINE TOPICS ───────────────────────────────────────
export const timelineTopics = sqliteTable('timeline_topics', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  coverImage: text('cover_image'),
  entries: text('entries').notNull().default('[]'),
  topicPageId: text('topic_page_id'),
})

// ── POLICY PROJECTS ───────────────────────────────────────
export const policyProjects = sqliteTable('policy_projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  agency: text('agency').notNull(),
  budget: text('budget').notNull(),
  status: text('status').notNull().default('Planning'),
  description: text('description').notNull(),
  startDate: text('start_date'),
  targetDate: text('target_date'),
  fundingSource: text('funding_source'),
  updates: text('updates').notNull().default('[]'),
  sectionTag: text('section_tag').notNull(),
  topicPageId: text('topic_page_id'),
})

// ── TOPIC PAGES ───────────────────────────────────────────
export const topicPages = sqliteTable('topic_pages', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  overview: text('overview').notNull(),
  coverImage: text('cover_image'),
  timelineTopicId: text('timeline_topic_id'),
  keyActors: text('key_actors').notNull().default('[]'),
  tags: text('tags').notNull().default('[]'),
})

// ── DOCUMENTS ─────────────────────────────────────────────
export const documents = sqliteTable('documents', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  summary: text('summary').notNull(),
  sourceAgency: text('source_agency').notNull(),
  documentType: text('document_type').notNull(),
  publishedDate: text('published_date').notNull(),
  fileUrl: text('file_url').notNull(),
  sectionTag: text('section_tag').notNull(),
})

// ── TAGS ──────────────────────────────────────────────────
export const tags = sqliteTable('tags', {
  id: text('id').primaryKey(),
  label: text('label').notNull(),
  slug: text('slug').notNull().unique(),
  primarySection: text('primary_section').notNull(),
})
