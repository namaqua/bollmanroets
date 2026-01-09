// Browser smoke test
// Usage: bun run scripts/browser-check.ts

const BASE_URL = process.env.BASE_URL || 'http://localhost:5177'
const API_URL = process.env.API_URL || 'http://localhost:3004'

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
// Page Route Tests
// ------------------------------------------

await test('Client: German homepage loads', async () => {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error(`Status ${res.status}`)
})

await test('Client: English homepage loads', async () => {
  const res = await fetch(`${BASE_URL}/en`)
  if (!res.ok) throw new Error(`Status ${res.status}`)
})

await test('Client: About page loads', async () => {
  const res = await fetch(`${BASE_URL}/uber-uns`)
  if (!res.ok) throw new Error(`Status ${res.status}`)
})

await test('Client: Solutions page loads', async () => {
  const res = await fetch(`${BASE_URL}/losungen`)
  if (!res.ok) throw new Error(`Status ${res.status}`)
})

await test('Client: Contact page loads', async () => {
  const res = await fetch(`${BASE_URL}/kontakt`)
  if (!res.ok) throw new Error(`Status ${res.status}`)
})

// ------------------------------------------
// API Contact Tests
// ------------------------------------------

await test('API: Contact endpoint exists', async () => {
  const res = await fetch(`${API_URL}/api/contact/health`)
  if (!res.ok) throw new Error(`Status ${res.status}`)
  const data = await res.json()
  if (data.status !== 'ok') throw new Error('Contact health not ok')
})

await test('API: Contact validation works', async () => {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '' }),
  })
  if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`)
})

// ------------------------------------------
// SEO Tests
// ------------------------------------------

await test('SEO: Sitemap exists', async () => {
  const res = await fetch(`${BASE_URL}/sitemap.xml`)
  if (!res.ok) throw new Error(`Status ${res.status}`)
})

await test('SEO: Robots.txt exists', async () => {
  const res = await fetch(`${BASE_URL}/robots.txt`)
  if (!res.ok) throw new Error(`Status ${res.status}`)
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
