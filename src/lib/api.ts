const BASE = import.meta.env.DEV
  ? 'http://localhost:8788'
  : ''

async function safeFetch(url: string) {
  const res = await fetch(url)
  const data = await res.json()
  if (!res.ok || data.error) throw new Error(data.error || 'Request failed')
  return data
}

export async function getArticles(section?: string, limit = 20) {
  const params = new URLSearchParams()
  if (section) params.set('section', section)
  params.set('limit', String(limit))
  return safeFetch(`${BASE}/api/articles?${params}`)
}

export async function getArticle(slug: string) {
  return safeFetch(`${BASE}/api/articles?slug=${slug}`)
}

export async function getPolicyProjects() {
  return safeFetch(`${BASE}/api/policy`)
}

export async function getPolicyProject(slug: string) {
  return safeFetch(`${BASE}/api/policy?slug=${slug}`)
}

export async function getTimelines() {
  return safeFetch(`${BASE}/api/timelines`)
}

export async function getTimeline(slug: string) {
  return safeFetch(`${BASE}/api/timelines?slug=${slug}`)
}
