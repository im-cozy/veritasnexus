import { drizzle } from 'drizzle-orm/d1'
import { articles, authors } from '../../src/db/schema'
import { eq } from 'drizzle-orm'

interface Env {
  DB: D1Database
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  const db = drizzle(env.DB)
  const url = new URL(request.url)
  const slug = url.searchParams.get('slug')
  const section = url.searchParams.get('section')
  const limit = parseInt(url.searchParams.get('limit') || '20')

  try {
    if (slug) {
      const result = await db
        .select()
        .from(articles)
        .where(eq(articles.slug, slug))
        .limit(1)

      if (!result.length) {
        return Response.json({ error: 'Article not found' }, { status: 404 })
      }

      const article = result[0]
      return Response.json({
        ...article,
        tags: JSON.parse(article.tags),
        sources: JSON.parse(article.sources),
        whatItMeans: JSON.parse(article.whatItMeans),
        intelligenceBrief: article.intelligenceBrief
          ? JSON.parse(article.intelligenceBrief) : null,
        knowledgeBox: article.knowledgeBox
          ? JSON.parse(article.knowledgeBox) : null,
      })
    }

    let query = db.select().from(articles)

    if (section) {
      query = query.where(eq(articles.primarySection, section)) as typeof query
    }

    const results = await query.limit(limit)

    return Response.json(results.map(a => ({
      ...a,
      tags: JSON.parse(a.tags),
      sources: JSON.parse(a.sources),
      whatItMeans: JSON.parse(a.whatItMeans),
    })))
  } catch (err) {
    return Response.json({ error: 'Database error', detail: String(err) }, { status: 500 })
  }
}
