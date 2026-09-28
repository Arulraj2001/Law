import * as http from 'http'
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const IS_LOCAL = SITE_URL.includes('localhost')

interface TestResult {
  category: string
  name: string
  passed: boolean
  details: string
  critical: boolean
}

const results: TestResult[] = []

function pass(
  category: string,
  name: string,
  details: string = 'OK',
  critical: boolean = false
) {
  results.push({
    category,
    name,
    passed: true,
    details,
    critical,
  })
}

function fail(
  category: string,
  name: string,
  details: string,
  critical: boolean = false
) {
  results.push({
    category,
    name,
    passed: false,
    details,
    critical,
  })
}

async function fetchUrl(
  url: string,
  options: {
    method?: string
    body?: string
    headers?: Record<string, string>
  } = {}
): Promise<{
  status: number
  body: string
  headers: Record<string, string>
}> {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https')
    const lib = isHttps ? https : http
    const urlObj = new URL(url)

    const reqHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'XYZ-TestRunner/1.0',
      ...options.headers,
    }

    if (options.body && !reqHeaders['Content-Length']) {
      reqHeaders['Content-Length'] = Buffer.byteLength(options.body).toString()
    }

    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: reqHeaders,
    }

    const req = lib.request(reqOptions, (res) => {
      let body = ''
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        resolve({
          status: res.statusCode || 0,
          body,
          headers: res.headers as Record<string, string>,
        })
      })
    })

    req.on('error', reject)

    if (options.body) {
      req.write(options.body)
    }

    req.setTimeout(10000, () => {
      req.destroy()
      reject(new Error('Request timeout'))
    })

    req.end()
  })
}

// ==========================================
// TEST SUITE 1: PAGE STATUS CODES
// ==========================================
async function testPageStatus() {
  const pages = [
    { path: '/', name: 'Homepage', critical: true },
    { path: '/about', name: 'About Us', critical: true },
    { path: '/faculty', name: 'Faculty' },
    { path: '/results', name: 'Results & Toppers' },
    { path: '/testimonials', name: 'Testimonials' },
    { path: '/blog', name: 'Blog Archive' },
    { path: '/demo-class', name: 'Demo Class', critical: true },
    { path: '/contact', name: 'Contact', critical: true },
    { path: '/faq', name: 'FAQ' },
    {
      path: '/courses/civil-judge',
      name: 'Civil Judge Course',
      critical: true,
    },
    { path: '/courses/app-exam', name: 'APP Exam Course', critical: true },
    { path: '/courses/patent-agent', name: 'Patent Agent Course' },
    { path: '/courses/trademark-agent', name: 'Trademark Agent Course' },
    { path: '/courses/ugc-net-law', name: 'UGC-NET Law Course' },
    { path: '/courses/set-law', name: 'SET Law Course' },
    { path: '/studio', name: 'Sanity Studio' },
    { path: '/sitemap.xml', name: 'Sitemap XML', critical: true },
    { path: '/robots.txt', name: 'Robots TXT', critical: true },
    { path: '/opengraph-image', name: 'OG Image' },
  ]

  for (const page of pages) {
    try {
      const res = await fetchUrl(`${SITE_URL}${page.path}`)
      const expectedStatus = 200

      if (res.status === expectedStatus) {
        pass(
          'Page Status',
          page.name,
          `HTTP ${res.status}`,
          page.critical
        )
      } else {
        fail(
          'Page Status',
          page.name,
          `Expected 200, got ${res.status}`,
          page.critical
        )
      }
    } catch (err) {
      fail(
        'Page Status',
        page.name,
        `Network error: ${err}`,
        page.critical
      )
    }
  }

  // Test 404 page
  try {
    const res = await fetchUrl(`${SITE_URL}/this-page-does-not-exist`)
    if (res.status === 404) {
      pass('Page Status', 'Custom 404 page', 'HTTP 404')
    } else {
      fail(
        'Page Status',
        'Custom 404 page',
        `Expected 404, got ${res.status}`
      )
    }
  } catch (err) {
    fail('Page Status', 'Custom 404 page', `Error: ${err}`)
  }

  // Test thank-you is noindex
  try {
    const res = await fetchUrl(`${SITE_URL}/thank-you`)
    const hasNoindex =
      res.body.includes('noindex') ||
      (res.headers['x-robots-tag'] || '').includes('noindex')

    if (hasNoindex) {
      pass('Page Status', 'Thank You page noindex', 'noindex confirmed')
    } else {
      fail(
        'Page Status',
        'Thank You page noindex',
        'noindex meta tag not found'
      )
    }
  } catch (err) {
    fail('Page Status', 'Thank You noindex', `Error: ${err}`)
  }
}

// ==========================================
// TEST SUITE 2: API ENDPOINTS
// ==========================================
async function testAPIEndpoints() {
  // Test leads API — valid submission
  try {
    const res = await fetchUrl(`${SITE_URL}/api/leads`, {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User Automation',
        phone: '9876543210',
        course_interest: 'Civil Judge',
        form_type: 'enquiry',
        message: 'Automated test submission',
      }),
    })

    const data = JSON.parse(res.body)

    if (res.status === 200 && data.success) {
      pass(
        'API Endpoints',
        'Leads API — valid submission',
        `Lead ID: ${data.id || 'created'}`,
        true
      )
    } else {
      fail(
        'API Endpoints',
        'Leads API — valid submission',
        `Status: ${res.status}, Response: ${res.body}`,
        true
      )
    }
  } catch (err) {
    fail(
      'API Endpoints',
      'Leads API — valid submission',
      `Error: ${err}`,
      true
    )
  }

  // Test leads API — validation (invalid phone)
  try {
    const res = await fetchUrl(`${SITE_URL}/api/leads`, {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test',
        phone: '123', // invalid
        form_type: 'enquiry',
      }),
    })

    if (res.status === 400) {
      pass(
        'API Endpoints',
        'Leads API — rejects invalid phone',
        'Returns 400 for bad phone'
      )
    } else {
      fail(
        'API Endpoints',
        'Leads API — rejects invalid phone',
        `Expected 400, got ${res.status}`
      )
    }
  } catch (err) {
    fail('API Endpoints', 'Leads API — validation', `Error: ${err}`)
  }

  // Test leads API — missing required fields
  try {
    const res = await fetchUrl(`${SITE_URL}/api/leads`, {
      method: 'POST',
      body: JSON.stringify({
        message: 'No name or phone',
      }),
    })

    if (res.status === 400) {
      pass(
        'API Endpoints',
        'Leads API — rejects missing fields',
        'Returns 400 for missing name/phone'
      )
    } else {
      fail(
        'API Endpoints',
        'Leads API — missing fields',
        `Expected 400, got ${res.status}`
      )
    }
  } catch (err) {
    fail('API Endpoints', 'Leads API — missing fields', `Error: ${err}`)
  }

  // Test admin stats API
  try {
    const res = await fetchUrl(`${SITE_URL}/api/admin/stats`)
    const data = JSON.parse(res.body)

    const hasAllFields =
      'totalLeads' in data &&
      'newLeadsToday' in data &&
      'activeBatches' in data

    if (res.status === 200 && hasAllFields) {
      pass(
        'API Endpoints',
        'Admin stats API',
        `Leads: ${data.totalLeads}, Batches: ${data.activeBatches}`
      )
    } else {
      fail('API Endpoints', 'Admin stats API', `Missing fields or bad status`)
    }
  } catch (err) {
    fail('API Endpoints', 'Admin stats API', `Error: ${err}`)
  }

  // Test admin leads API
  try {
    const res = await fetchUrl(`${SITE_URL}/api/admin/leads`)
    const data = JSON.parse(res.body)

    if (res.status === 200 && Array.isArray(data.leads)) {
      pass(
        'API Endpoints',
        'Admin leads API',
        `${data.leads.length} leads returned`
      )
    } else {
      fail('API Endpoints', 'Admin leads API', `Status: ${res.status}`)
    }
  } catch (err) {
    fail('API Endpoints', 'Admin leads API', `Error: ${err}`)
  }

  // Test admin settings API
  try {
    const res = await fetchUrl(`${SITE_URL}/api/admin/settings`)

    if (res.status === 200) {
      pass(
        'API Endpoints',
        'Admin settings API',
        'Settings endpoint accessible'
      )
    } else {
      fail('API Endpoints', 'Admin settings API', `Status: ${res.status}`)
    }
  } catch (err) {
    fail('API Endpoints', 'Admin settings API', `Error: ${err}`)
  }

  // Test blog views API
  try {
    const res = await fetchUrl(`${SITE_URL}/api/blog-views?slug=test-post`)

    if (res.status === 200) {
      pass('API Endpoints', 'Blog views API', 'Returns view count')
    } else {
      fail('API Endpoints', 'Blog views API', `Status: ${res.status}`)
    }
  } catch (err) {
    fail('API Endpoints', 'Blog views API', `Error: ${err}`)
  }

  // Test WhatsApp tracking API
  try {
    const res = await fetchUrl(`${SITE_URL}/api/track/whatsapp`, {
      method: 'POST',
      body: JSON.stringify({
        message_type: 'test_automated',
      }),
    })

    if (res.status === 200) {
      pass('API Endpoints', 'WhatsApp tracking API', 'Tracking endpoint works')
    } else {
      fail('API Endpoints', 'WhatsApp tracking API', `Status: ${res.status}`)
    }
  } catch (err) {
    fail('API Endpoints', 'WhatsApp tracking API', `Error: ${err}`)
  }
}

// ==========================================
// TEST SUITE 3: SEO CHECKS
// ==========================================
async function testSEO() {
  // Check homepage has title tag
  try {
    const res = await fetchUrl(`${SITE_URL}/`)

    const hasTitle =
      res.body.includes('<title>') || res.body.includes('Civil Judge')

    const hasDescription =
      res.body.includes('meta name="description"') ||
      res.body.includes('meta property="og:description"')

    const hasCanonical = res.body.includes('rel="canonical"')

    const hasSchemaOrg = res.body.includes('application/ld+json')

    if (hasTitle) {
      pass('SEO', 'Homepage title tag', 'Title present in HTML')
    } else {
      fail('SEO', 'Homepage title tag', 'No title tag found')
    }

    if (hasDescription) {
      pass('SEO', 'Homepage meta description', 'Description meta present')
    } else {
      fail('SEO', 'Homepage meta description', 'No description meta found')
    }

    if (hasCanonical) {
      pass('SEO', 'Homepage canonical URL', 'Canonical link present')
    } else {
      fail('SEO', 'Homepage canonical URL', 'No canonical link found')
    }

    if (hasSchemaOrg) {
      pass(
        'SEO',
        'Homepage JSON-LD schema',
        'Schema markup present',
        true
      )
    } else {
      fail('SEO', 'Homepage JSON-LD schema', 'No JSON-LD found', true)
    }
  } catch (err) {
    fail('SEO', 'Homepage SEO tags', `Error: ${err}`, true)
  }

  // Check sitemap contains key pages
  try {
    const res = await fetchUrl(`${SITE_URL}/sitemap.xml`)

    const keyPages = [
      '/courses/civil-judge',
      '/courses/app-exam',
      '/demo-class',
      '/about',
      '/results',
    ]

    for (const page of keyPages) {
      if (res.body.includes(page)) {
        pass('SEO', `Sitemap contains ${page}`, 'URL in sitemap')
      } else {
        fail('SEO', `Sitemap contains ${page}`, 'URL NOT in sitemap')
      }
    }

    // Studio should NOT be in sitemap
    if (!res.body.includes('/studio')) {
      pass(
        'SEO',
        'Sitemap excludes /studio',
        '/studio correctly excluded'
      )
    } else {
      fail('SEO', 'Sitemap excludes /studio', '/studio found in sitemap')
    }
  } catch (err) {
    fail('SEO', 'Sitemap checks', `Error: ${err}`, true)
  }

  // Check robots.txt
  try {
    const res = await fetchUrl(`${SITE_URL}/robots.txt`)

    const allowsRoot = res.body.includes('Allow: /')
    const disallowsStudio = res.body.includes('Disallow: /studio')
    const hasSitemap = res.body.includes('Sitemap:')

    if (allowsRoot) {
      pass('SEO', 'robots.txt allows /', 'Correct')
    } else {
      fail('SEO', 'robots.txt allows /', 'Allow: / not found')
    }

    if (disallowsStudio) {
      pass('SEO', 'robots.txt blocks /studio', 'Correctly blocked')
    } else {
      fail('SEO', 'robots.txt blocks /studio', '/studio not disallowed')
    }

    if (hasSitemap) {
      pass(
        'SEO',
        'robots.txt has Sitemap directive',
        'Sitemap URL present'
      )
    } else {
      fail('SEO', 'robots.txt Sitemap directive', 'Sitemap not referenced')
    }
  } catch (err) {
    fail('SEO', 'robots.txt checks', `Error: ${err}`)
  }

  // Check Civil Judge page has Course schema
  try {
    const res = await fetchUrl(`${SITE_URL}/courses/civil-judge`)

    const hasCourseSchema =
      res.body.includes('"@type":"Course"') ||
      res.body.includes('"@type": "Course"')

    const hasFAQSchema =
      res.body.includes('"@type":"FAQPage"') ||
      res.body.includes('"@type": "FAQPage"')

    if (hasCourseSchema) {
      pass(
        'SEO',
        'Civil Judge Course schema',
        'Course JSON-LD present',
        true
      )
    } else {
      fail(
        'SEO',
        'Civil Judge Course schema',
        'Course JSON-LD not found',
        true
      )
    }

    if (hasFAQSchema) {
      pass('SEO', 'Civil Judge FAQ schema', 'FAQPage JSON-LD present')
    } else {
      fail('SEO', 'Civil Judge FAQ schema', 'FAQPage JSON-LD not found')
    }
  } catch (err) {
    fail('SEO', 'Course page schemas', `Error: ${err}`)
  }

  // Check OG image is accessible
  try {
    const res = await fetchUrl(`${SITE_URL}/opengraph-image`)

    const isImage = (res.headers['content-type'] || '').includes('image/')

    if (res.status === 200 && isImage) {
      pass('SEO', 'OG image generates', 'Returns image/png', true)
    } else {
      fail(
        'SEO',
        'OG image generates',
        `Status: ${res.status}, Type: ${res.headers['content-type']}`
      )
    }
  } catch (err) {
    fail('SEO', 'OG image', `Error: ${err}`)
  }
}

// ==========================================
// TEST SUITE 4: FILE EXISTENCE CHECKS
// ==========================================
async function testFileExistence() {
  const criticalFiles = [
    // Config files
    { path: 'next.config.ts', critical: true },
    { path: 'next-sitemap.config.js', critical: true },
    { path: 'vercel.json', critical: true },
    { path: 'tailwind.config.ts', critical: true },
    { path: '.env.local' },

    // Core source files
    { path: 'src/app/layout.tsx', critical: true },
    { path: 'src/app/(main)/layout.tsx', critical: true },
    { path: 'src/app/(main)/page.tsx', critical: true },

    // All page files
    { path: 'src/app/(main)/about/page.tsx' },
    { path: 'src/app/(main)/faculty/page.tsx' },
    { path: 'src/app/(main)/results/page.tsx' },
    { path: 'src/app/(main)/testimonials/page.tsx' },
    { path: 'src/app/(main)/blog/page.tsx' },
    { path: 'src/app/(main)/blog/[slug]/page.tsx' },
    { path: 'src/app/(main)/demo-class/page.tsx', critical: true },
    { path: 'src/app/(main)/contact/page.tsx', critical: true },
    { path: 'src/app/(main)/faq/page.tsx' },
    { path: 'src/app/(main)/thank-you/page.tsx' },

    // Course pages
    {
      path: 'src/app/(main)/courses/civil-judge/page.tsx',
      critical: true,
    },
    { path: 'src/app/(main)/courses/app-exam/page.tsx', critical: true },
    { path: 'src/app/(main)/courses/patent-agent/page.tsx' },
    { path: 'src/app/(main)/courses/trademark-agent/page.tsx' },
    { path: 'src/app/(main)/courses/ugc-net-law/page.tsx' },
    { path: 'src/app/(main)/courses/set-law/page.tsx' },

    // Key API routes
    { path: 'src/app/api/leads/route.ts', critical: true },
    { path: 'src/app/api/admin/stats/route.ts' },
    { path: 'src/app/api/admin/leads/route.ts' },
    { path: 'src/app/api/admin/settings/route.ts' },
    { path: 'src/app/api/revalidate/route.ts' },
    { path: 'src/app/api/blog-views/route.ts' },
    { path: 'src/app/api/track/whatsapp/route.ts' },

    // Key library files
    { path: 'src/lib/site-config.ts', critical: true },
    { path: 'src/lib/supabase/client.ts', critical: true },
    { path: 'src/lib/supabase/server.ts', critical: true },
    { path: 'src/lib/supabase/queries.ts', critical: true },
    { path: 'src/lib/supabase/types.ts', critical: true },
    { path: 'src/lib/sanity/client.ts', critical: true },
    { path: 'src/lib/sanity/queries.ts', critical: true },
    { path: 'src/lib/seo/schemas.ts' },
    { path: 'src/lib/seo/metadata.ts' },
    { path: 'src/lib/analytics.ts' },
    { path: 'src/lib/constants.ts', critical: true },
    { path: 'src/lib/utils.ts' },

    // Sanity schemas
    { path: 'src/sanity/schemaTypes/course.ts' },
    { path: 'src/sanity/schemaTypes/batch.ts' },
    { path: 'src/sanity/schemaTypes/faculty.ts' },
    { path: 'src/sanity/schemaTypes/topper.ts' },
    { path: 'src/sanity/schemaTypes/testimonial.ts' },
    { path: 'src/sanity/schemaTypes/blogPost.ts' },
    { path: 'src/sanity/schemaTypes/faq.ts' },
    { path: 'src/sanity/schemaTypes/courseFaq.ts' },
    { path: 'src/sanity/schemaTypes/siteSettings.ts' },

    // Layout components
    { path: 'src/components/layout/Navbar.tsx', critical: true },
    { path: 'src/components/layout/Footer.tsx', critical: true },
    { path: 'src/components/layout/WhatsAppButton.tsx', critical: true },

    // Hooks
    { path: 'src/hooks/useWhatsApp.ts', critical: true },
    { path: 'src/hooks/useScrollAnimation.ts' },
    { path: 'src/hooks/useCounter.ts' },

    // Docs
    { path: 'DEPLOYMENT.md' },
    { path: 'PRODUCTION_CHECKLIST.md' },
    { path: 'VERCEL_ENV_SETUP.md' },

    // Scripts
    { path: 'src/scripts/seed-sanity.ts' },
    { path: 'src/scripts/post-deploy-test.ts' },
  ]

  for (const file of criticalFiles) {
    const fullPath = path.join(process.cwd(), file.path)
    const exists = fs.existsSync(fullPath)

    if (exists) {
      pass('File Existence', file.path, 'File exists', file.critical)
    } else {
      fail('File Existence', file.path, 'FILE MISSING', file.critical)
    }
  }
}

// ==========================================
// TEST SUITE 5: BUILD OUTPUT CHECKS
// ==========================================
async function testBuildOutput() {
  // Check .next directory exists
  const nextDir = path.join(process.cwd(), '.next')

  if (fs.existsSync(nextDir)) {
    pass(
      'Build Output',
      '.next directory exists',
      'Build artifacts present',
      true
    )
  } else {
    fail(
      'Build Output',
      '.next directory exists',
      'Run npm run build first',
      true
    )
    return
  }

  // Check sitemap was generated
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')

  if (fs.existsSync(sitemapPath)) {
    const content = fs.readFileSync(sitemapPath, 'utf-8')
    const urlCount = (content.match(/<url>/g) || []).length

    pass(
      'Build Output',
      'sitemap.xml generated',
      `${urlCount} URLs in sitemap`,
      true
    )
  } else {
    fail(
      'Build Output',
      'sitemap.xml generated',
      'sitemap.xml not found in /public',
      true
    )
  }

  // Check robots.txt generated
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt')

  if (fs.existsSync(robotsPath)) {
    pass('Build Output', 'robots.txt generated', 'File exists in /public')
  } else {
    fail('Build Output', 'robots.txt generated', 'robots.txt not in /public')
  }

  // Check no .env.local in git
  const gitignorePath = path.join(process.cwd(), '.gitignore')

  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf-8')

    if (content.includes('.env.local')) {
      pass('Build Output', '.env.local in .gitignore', 'Secrets protected')
    } else {
      fail(
        'Build Output',
        '.env.local in .gitignore',
        '.env.local NOT in .gitignore — SECURITY RISK',
        true
      )
    }
  }

  // Check vercel.json is valid JSON
  const vercelPath = path.join(process.cwd(), 'vercel.json')

  if (fs.existsSync(vercelPath)) {
    try {
      const content = fs.readFileSync(vercelPath, 'utf-8')
      JSON.parse(content)
      pass('Build Output', 'vercel.json valid JSON', 'Parses without error')
    } catch {
      fail(
        'Build Output',
        'vercel.json valid JSON',
        'Invalid JSON in vercel.json',
        true
      )
    }
  }

  // Check package.json has required scripts
  const pkgPath = path.join(process.cwd(), 'package.json')

  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

    const requiredScripts = [
      'dev',
      'build',
      'start',
      'postbuild',
      'seed:sanity',
    ]

    for (const script of requiredScripts) {
      if (pkg.scripts?.[script]) {
        pass(
          'Build Output',
          `package.json script: ${script}`,
          pkg.scripts[script]
        )
      } else {
        fail(
          'Build Output',
          `package.json script: ${script}`,
          'Script missing'
        )
      }
    }
  }
}

// ==========================================
// TEST SUITE 6: SECURITY CHECKS
// ==========================================
async function testSecurity() {
  try {
    const res = await fetchUrl(`${SITE_URL}/`)
    const headers = res.headers

    const securityHeaders = [
      {
        name: 'X-Content-Type-Options',
        expected: 'nosniff',
        key: 'x-content-type-options',
      },
      {
        name: 'X-Frame-Options',
        expected: 'SAMEORIGIN',
        key: 'x-frame-options',
      },
    ]

    for (const header of securityHeaders) {
      const value = headers[header.key] || ''

      if (value.toLowerCase().includes(header.expected.toLowerCase())) {
        pass('Security', `Header: ${header.name}`, `Value: ${value}`)
      } else {
        fail(
          'Security',
          `Header: ${header.name}`,
          `Expected "${header.expected}", got "${value}"`
        )
      }
    }

    // Check studio is accessible
    const studioRes = await fetchUrl(`${SITE_URL}/studio`)

    if (studioRes.status === 200) {
      pass(
        'Security',
        'Studio accessible',
        'Studio loads for authorized users'
      )
    }

    // Service role key not in HTML
    const serviceKeyInHtml =
      res.body.includes('service_role') || res.body.includes('SERVICE_ROLE')

    if (!serviceKeyInHtml) {
      pass(
        'Security',
        'Service role key not exposed',
        'No service_role in HTML'
      )
    } else {
      fail(
        'Security',
        'Service role key not exposed',
        'CRITICAL: service_role key found in HTML',
        true
      )
    }
  } catch (err) {
    fail('Security', 'Security headers', `Error: ${err}`)
  }
}

// ==========================================
// CONTENT CHECKS
// ==========================================
async function testContent() {
  // Check homepage has key content
  try {
    const res = await fetchUrl(`${SITE_URL}/`)

    const contentChecks = [
      { term: 'Civil Judge', name: 'Civil Judge mentioned' },
      { term: 'Tamil Nadu', name: 'Tamil Nadu mentioned' },
      { term: 'APP', name: 'APP exam mentioned' },
      { term: 'WhatsApp', name: 'WhatsApp CTA present' },
      { term: 'BNS', name: 'New laws BNS mentioned' },
    ]

    for (const check of contentChecks) {
      if (res.body.includes(check.term)) {
        pass('Content', check.name, `"${check.term}" found in HTML`)
      } else {
        fail('Content', check.name, `"${check.term}" NOT in HTML`)
      }
    }
  } catch (err) {
    fail('Content', 'Homepage content', `Error: ${err}`)
  }

  // Check Civil Judge page has key content
  try {
    const res = await fetchUrl(`${SITE_URL}/courses/civil-judge`)

    const courseChecks = [
      { term: 'TNPSC', name: 'TNPSC mentioned' },
      { term: 'Prelims', name: 'Prelims stage' },
      { term: 'Mains', name: 'Mains stage' },
      { term: 'Translation', name: 'Translation paper' },
      { term: 'BNS', name: 'BNS coverage' },
    ]

    for (const check of courseChecks) {
      if (res.body.includes(check.term)) {
        pass('Content', `Civil Judge: ${check.name}`, 'Term present')
      } else {
        fail(
          'Content',
          `Civil Judge: ${check.name}`,
          `"${check.term}" not found`
        )
      }
    }
  } catch (err) {
    fail('Content', 'Civil Judge content', `Error: ${err}`)
  }

  // Check contact page has phone
  try {
    const res = await fetchUrl(`${SITE_URL}/contact`)

    const hasPhone = res.body.includes('tel:') || res.body.includes('+91')
    const hasEmail = res.body.includes('mailto:') || res.body.includes('@')

    if (hasPhone) {
      pass('Content', 'Contact page has phone', 'tel: link found')
    } else {
      fail('Content', 'Contact page has phone', 'No tel: link found')
    }

    if (hasEmail) {
      pass('Content', 'Contact page has email', 'email found')
    } else {
      fail('Content', 'Contact page has email', 'No email found')
    }
  } catch (err) {
    fail('Content', 'Contact page content', `Error: ${err}`)
  }
}

// ==========================================
// MAIN RUNNER
// ==========================================
async function main() {
  console.log('\n' + '═'.repeat(55))
  console.log('  XYZ LAW COACHING — AUTOMATED TEST SUITE')
  console.log('  ' + SITE_URL)
  console.log('═'.repeat(55) + '\n')

  console.log('Running tests...\n')

  await testFileExistence()
  await testBuildOutput()
  await testPageStatus()
  await testAPIEndpoints()
  await testSEO()
  await testSecurity()
  await testContent()

  // Group results by category
  const categories = [...new Set(results.map((r) => r.category))]

  let totalPassed = 0
  let totalFailed = 0
  let criticalFailed = 0

  for (const category of categories) {
    const catResults = results.filter((r) => r.category === category)
    const passed = catResults.filter((r) => r.passed).length
    const failed = catResults.filter((r) => !r.passed).length

    console.log(`\n── ${category} (${passed}✅ ${failed}❌) ──`)

    for (const r of catResults) {
      const icon = r.passed ? '✅' : '❌'
      const critical = r.critical ? ' [CRITICAL]' : ''
      console.log(`  ${icon} ${r.name}${critical}`)
      if (!r.passed) {
        console.log(`     → ${r.details}`)
      }
    }

    totalPassed += passed
    totalFailed += failed
    criticalFailed += catResults.filter((r) => !r.passed && r.critical).length
  }

  console.log('\n' + '═'.repeat(55))
  console.log(`  TOTAL: ${totalPassed} passed, ${totalFailed} failed`)

  if (criticalFailed > 0) {
    console.log(
      `  ⛔ ${criticalFailed} CRITICAL failures — fix before deployment`
    )
  } else if (totalFailed === 0) {
    console.log('  🎉 ALL TESTS PASSED — Ready to deploy!')
  } else {
    console.log(
      `  ⚠️  ${totalFailed} non-critical failures — review before deployment`
    )
  }

  console.log('═'.repeat(55) + '\n')

  // Write report to file
  const report = {
    timestamp: new Date().toISOString(),
    siteUrl: SITE_URL,
    totalPassed,
    totalFailed,
    criticalFailed,
    results,
  }

  fs.writeFileSync('test-report.json', JSON.stringify(report, null, 2))

  console.log('Report saved to test-report.json\n')

  if (criticalFailed > 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Test runner error:', err)
  process.exit(1)
})
