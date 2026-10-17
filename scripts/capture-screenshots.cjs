const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function captureScreenshots(prefix = 'before') {
  const outDir = path.resolve(process.cwd(), 'screenshots', prefix);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  try {
    for (const vp of [
      { width: 393, height: 852, name: 'mobile', isMobile: true },
      { width: 1280, height: 900, name: 'desktop', isMobile: false }
    ]) {
      console.log(`Capturing ${prefix} at ${vp.name} (${vp.width}x${vp.height})...`);
      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile
      });

      await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1000));

      // 1. Cover screenshot
      await page.screenshot({ path: path.join(outDir, `01-cover-${vp.name}.png`), fullPage: false });

      // Click Enter button
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const enterBtn = btns.find(b => b.textContent && b.textContent.toLowerCase().includes('enter')) || btns[0];
        if (enterBtn) enterBtn.click();
      });

      await new Promise(r => setTimeout(r, 1500));
      // 2. Bismillah screenshot
      await page.screenshot({ path: path.join(outDir, `02-bismillah-${vp.name}.png`), fullPage: false });

      // Transition to MainContent
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const scrollBtn = btns.find(b => b.textContent && b.textContent.toLowerCase().includes('scroll'));
        if (scrollBtn) scrollBtn.click();
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
      });

      await page.waitForFunction(() => !!document.querySelector('main'), { timeout: 15000 });
      // Allow entrance animations to settle
      await new Promise(r => setTimeout(r, 2000));

      // 3. Main full page
      await page.screenshot({ path: path.join(outDir, `03-main-fullpage-${vp.name}.png`), fullPage: true });

      // 4. Section by section screenshots
      const sectionIds = ['story', 'groom', 'bride', 'quranic-verses', 'celebrations', 'calendar', 'dua'];
      for (const id of sectionIds) {
        const el = await page.$(`#${id}`);
        if (el) {
          await page.evaluate((selector) => {
            const target = document.querySelector(selector);
            if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
          }, `#${id}`);
          await new Promise(r => setTimeout(r, 600));
          await el.screenshot({ path: path.join(outDir, `section-${id}-${vp.name}.png`) });
        }
      }

      await page.close();
    }
    console.log(`All ${prefix} screenshots captured successfully in ${outDir}`);
  } finally {
    await browser.close();
  }
}

const prefix = process.argv[2] || 'before';
captureScreenshots(prefix).catch(err => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
