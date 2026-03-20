import { drizzle } from 'drizzle-orm/d1'
import { policyProjects } from '../../src/db/schema'
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
        .from(policyProjects)
        .where(eq(policyProjects.slug, slug))
        .limit(1)

      if (!result.length) {
        return Response.json({ error: 'Project not found' }, { status: 404 })
      }

      const project = result[0]
      return Response.json({
        ...project,
        updates: JSON.parse(project.updates),
      })
    }

    const results = await db.select().from(policyProjects).limit(50)
    return Response.json(results.map(p => ({
      ...p,
      updates: JSON.parse(p.updates),
    })))
  } catch (err) {
    return Response.json({ error: 'Database error', detail: String(err) }, { status: 500 })
  }
}
