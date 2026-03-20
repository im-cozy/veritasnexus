import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: 'e3b789c32d9ec5488636153e63daa4e0',
    databaseId: '0523b082-2ef8-49ee-900e-f5f79365bd46',
    token: process.env.CLOUDFLARE_API_TOKEN!,
  },
} satisfies Config
