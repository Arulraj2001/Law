const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

interface TestResult {
  name: string;
  passed: boolean;
  details: string;
}

async function runTests(): Promise<void> {
  const results: TestResult[] = [];

  console.log(`\n🧪 Running post-deploy tests for\n   ${SITE_URL}\n`);

  // Test 1: Homepage loads
  results.push(await testUrl("Homepage", `${SITE_URL}/`, 200));

  // Test 2: Civil Judge course page
  results.push(
    await testUrl("Civil Judge page", `${SITE_URL}/courses/civil-judge`, 200)
  );

  // Test 3: Blog page
  results.push(await testUrl("Blog page", `${SITE_URL}/blog`, 200));

  // Test 4: API - leads endpoint
  results.push(
    await testApi("Leads API", `${SITE_URL}/api/leads`, "POST", {
      name: "Test User",
      phone: "9876543210",
      course_interest: "Civil Judge",
      form_type: "enquiry",
    })
  );

  // Test 5: Sitemap exists
  results.push(await testUrl("Sitemap", `${SITE_URL}/sitemap.xml`, 200));

  // Test 6: Robots exists
  results.push(await testUrl("Robots.txt", `${SITE_URL}/robots.txt`, 200));

  // Test 7: Studio accessible
  results.push(await testUrl("Studio", `${SITE_URL}/studio`, 200));

  // Test 8: 404 page
  results.push(await testUrl("404 page", `${SITE_URL}/nonexistent-xyz-123`, 404));

  // Test 9: Admin stats API
  results.push(await testUrl("Admin stats API", `${SITE_URL}/api/admin/stats`, 200));

  // Test 10: OG image
  results.push(await testUrl("OG image", `${SITE_URL}/opengraph-image`, 200));

  // Print results
  const passed = results.filter((r) => r.passed);
  const failed = results.filter((r) => !r.passed);

  console.log("─".repeat(50));
  results.forEach((r) => {
    const icon = r.passed ? "✅" : "❌";
    console.log(`${icon} ${r.name}`);
    if (!r.passed) {
      console.log(`   → ${r.details}`);
    }
  });
  console.log("─".repeat(50));
  console.log(`\nResults: ${passed.length} passed, ${failed.length} failed\n`);

  if (failed.length > 0) {
    process.exit(1);
  }
}

async function testUrl(
  name: string,
  url: string,
  expectedStatus: number
): Promise<TestResult> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "PostDeployTest/1.0",
      },
    });
    const passed = res.status === expectedStatus;
    return {
      name,
      passed,
      details: passed
        ? `${res.status} OK`
        : `Expected ${expectedStatus}, got ${res.status}`,
    };
  } catch (error) {
    return {
      name,
      passed: false,
      details: `Network error: ${error}`,
    };
  }
}

async function testApi(
  name: string,
  url: string,
  method: string,
  body: object
): Promise<TestResult> {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    const passed = res.status === 200 && data.success === true;
    return {
      name,
      passed,
      details: passed
        ? "API responded correctly"
        : `Status: ${res.status}, Response: ${JSON.stringify(data)}`,
    };
  } catch (error) {
    return {
      name,
      passed: false,
      details: `Error: ${error}`,
    };
  }
}

runTests();
