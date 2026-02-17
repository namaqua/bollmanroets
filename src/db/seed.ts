// Database seed script
// Run: bun run db:seed

import { db } from './index'
import { examples } from './schema'

async function seed() {
  if (!db) {
    console.error('DATABASE_URL not set — cannot seed')
    process.exit(1)
  }

  console.log('Seeding database...')

  // Clear existing data
  await db.delete(examples)
  
  // Insert seed data
  await db.insert(examples).values([
    { name: 'Example 1', description: 'First example' },
    { name: 'Example 2', description: 'Second example' },
  ])
  
  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((e) => {
  console.error('Seed failed:', e)
  process.exit(1)
})
