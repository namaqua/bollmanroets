// Browser smoke test
// Usage: bun run scripts/browser-check.ts

import { $ } from 'bun'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'
const API_URL = process.env.API_URL || 'http://localhost:3000'

interface TestResult {
  name: string
  passed: boolean
  error?: string
  duration: number
}

const results: TestResult[] = []

async function test(name: string, fn: () => Promise<void>) {
  const start = Date.now()
  try {
    await fn()
    results.push({ name, passed: true, duration: Date.now() - start })
    console.log(`✓ ${name}`)
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e)
    results.push({ name, passed: false, error, duration: Date.now() - start })
    console.log(`✗ ${name}: ${error}`)
  }
}

// ------------------------------------------
// API Tests
// ------------------------------------------

await test('API: Health endpoint', async () => {
  const res = await fetch(`${API_URL}/health`)
  if (!res.ok) throw new Error(`Status ${res.status}`)
  const data = await res.json()
  if (data.status !== 'ok') throw new Error('Health not ok')
})

await test('API: Returns JSON', async () => {
  const res = await fetch(`${API_URL}/health`)
  const contentType = res.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    throw new Error(`Expected JSON, got ${contentType}`)
  }
})

// ------------------------------------------
// Client Tests
// ------------------------------------------

await test('Client: Page loads', async () => {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error(`Status ${res.status}`)
  const html = await res.text()
  if (!html.includes('<div id="root">')) {
    throw new Error('Root element not found')
  }
})

await test('Client: Assets load', async () => {
  const res = await fetch(BASE_URL)
  const html = await res.text()
  
  // Check for script tags
  if (!html.includes('<script')) {
    throw new Error('No script tags found')
  }
})

// ------------------------------------------
// Summary
// ------------------------------------------

console.log('\n========================================')
console.log('Browser Check Summary')
console.log('========================================')

const passed = results.filter(r => r.passed).length
const failed = results.filter(r => !r.passed).length
const total = results.length

console.log(`Passed: ${passed}/${total}`)
console.log(`Failed: ${failed}/${total}`)

if (failed > 0) {
  console.log('\nFailed tests:')
  results.filter(r => !r.passed).forEach(r => {
    console.log(`  - ${r.name}: ${r.error}`)
  })
  process.exit(1)
} else {
  console.log('\n✓ All checks passed')
  process.exit(0)
}
