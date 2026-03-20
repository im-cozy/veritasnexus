import { drizzle } from 'drizzle-orm/d1'
import { timelineTopics } from '../../src/db/schema'
import { eq } from 'drizzle-orm'

interface Env {
  DB: D1Database
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const db = drizzle(env.DB)
  const url = new URL(request.url)
  const slug = url.searchParams.get('slug')

  try {
    if (slug) {
      const result = await db
        .select()
        .from(timelineTopics)
        .where(eq(timelineTopics.slug, slug))
        .limit(1)

      if (!result.length) {
        return Response.json({ error: 'Timeline not found' }, { status: 404 })
      }

      const topic = result[0]
      return Response.json({
        ...topic,
        entries: JSON.parse(topic.entries),
      })
    }

    const results = await db.select().from(timelineTopics).limit(20)
    return Response.json(results.map(t => ({
      ...t,
      entries: JSON.parse(t.entries),
    })))
  } catch (err) {
    return Response.json({ error: 'Database error', detail: String(err) }, { status: 500 })
  }
}
