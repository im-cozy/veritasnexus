const BASE = import.meta.env.DEV
  ? 'http://localhost:8788'
  : ''

export async function getArticles(section?: string, limit = 20) {
  const params = new URLSearchParams()
  if (section) params.set('section', section)
  params.set('limit', String(limit))
  const res = await fetch(`${BASE}/api/articles?${params}`)
  if (!res.ok) throw new Error('Failed to fetch articles')
  return res.json()
}

export async function getArticle(slug: string) {
  const res = await fetch(`${BASE}/api/articles?slug=${slug}`)
  if (!res.ok) throw new Error('Article not found')
  return res.json()
}

export async function getPolicyProjects() {
  const res = await fetch(`${BASE}/api/policy`)
  if (!res.ok) throw new Error('Failed to fetch policy projects')
  return res.json()
}

export async function getPolicyProject(slug: string) {
  const res = await fetch(`${BASE}/api/policy?slug=${slug}`)
  if (!res.ok) throw new Error('Project not found')
  return res.json()
}

export async function getTimelines() {
  const res = await fetch(`${BASE}/api/timelines`)
  if (!res.ok) throw new Error('Failed to fetch timelines')
  return res.json()
}

export async function getTimeline(slug: string) {
  const res = await fetch(`${BASE}/api/timelines?slug=${slug}`)
  if (!res.ok) throw new Error('Timeline not found')
  return res.json()
}
