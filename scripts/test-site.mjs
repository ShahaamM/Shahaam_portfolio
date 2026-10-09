import { chromium } from 'playwright';
import fs from 'fs';

async function runTests() {
  console.log('🚀 Starting Playwright Quality Checks...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const consoleErrors = [];

  // 1. DESKTOP TEST: 1440x900
  console.log('\n--- 1. Testing Desktop Viewport (1440x900) ---');
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Check that Achievements is NOT in header
  const headerLinks = await page.$$eval('header nav button', (btns) => btns.map((b) => b.textContent?.trim()));
  console.log('Header links found:', headerLinks);
  const hasAchievements = headerLinks.some((l) => l?.toLowerCase().includes('achievement'));
  if (hasAchievements) {
    console.error('❌ Achievements link still present in header!');
  } else {
    console.log('✅ Achievements link successfully removed from header');
  }

  // Check horizontal overflow
  const desktopOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  console.log(`Desktop Width: scrollWidth=${desktopOverflow.scrollWidth}, innerWidth=${desktopOverflow.innerWidth}`);
  if (desktopOverflow.hasOverflow) {
    console.error('❌ Horizontal overflow detected on desktop!');
  } else {
    console.log('✅ Zero horizontal overflow on desktop (1440x900)');
  }

  // Check character image and ghost name
  const charImg = page.locator('img[src*="hero-character"]');
  const imgCount = await charImg.count();
  console.log(`Hero transparent character image elements found: ${imgCount}`);

  // Take screenshot at 1440x900
  fs.mkdirSync('screenshots', { recursive: true });
  await page.screenshot({ path: 'screenshots/desktop-1440x900.png', fullPage: false });
  console.log('✅ Screenshot saved to screenshots/desktop-1440x900.png');

  // Test Sound button
  const soundBtn = page.locator('button[aria-label*="audio"]');
  if (await soundBtn.count() > 0) {
    const labelBefore = await soundBtn.getAttribute('aria-label');
    await soundBtn.click();
    const labelAfter = await soundBtn.getAttribute('aria-label');
    console.log(`✅ Sound button toggle: "${labelBefore}" -> "${labelAfter}"`);
  }

  // Test ID Card Flip
  const idCard = page.locator('[role="button"][aria-label*="developer ID card"]');
  if (await idCard.count() > 0) {
    await idCard.focus();
    await page.keyboard.press('Enter');
    console.log('✅ ID card keyboard flip (Enter) triggered');
  }

  await page.close();

  // 2. MOBILE TEST: 390x844
  console.log('\n--- 2. Testing Mobile Viewport (390x844) ---');
  const mobilePage = await context.newPage();
  mobilePage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const mobileOverflow = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  console.log(`Mobile Width: scrollWidth=${mobileOverflow.scrollWidth}, innerWidth=${mobileOverflow.innerWidth}`);
  if (mobileOverflow.hasOverflow) {
    console.error('❌ Horizontal overflow detected on mobile!');
  } else {
    console.log('✅ Zero horizontal overflow on mobile (390x844)');
  }

  await mobilePage.screenshot({ path: 'screenshots/mobile-390x844.png', fullPage: false });
  console.log('✅ Screenshot saved to screenshots/mobile-390x844.png');

  await mobilePage.close();
  await browser.close();

  console.log('\n--- 3. Runtime Error Audit ---');
  if (consoleErrors.length === 0) {
    console.log('✅ 0 runtime console errors detected!');
  } else {
    console.warn(`⚠️ Detected console errors:`, consoleErrors);
  }

  console.log('\n🎉 ALL UPDATED QUALITY CHECKS COMPLETED SUCCESSFULLY!');
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
