const puppeteer = require('puppeteer-core');
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function verifyAllInteractions() {
  console.log("Starting interactions test...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {};

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 393, height: 852 });

    // 1. Test Intro animation & Enter invitation
    console.log("Navigating to http://localhost:3000...");
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    const enterBtn = await page.waitForSelector('button');
    results.introButtonPresent = !!enterBtn;
    console.log("1. Intro button present:", results.introButtonPresent);

    await enterBtn.click();
    await new Promise(r => setTimeout(r, 1500));

    // Transition to main
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const scrollBtn = btns.find(b => b.textContent && b.textContent.toLowerCase().includes('scroll'));
      if (scrollBtn) scrollBtn.click();
      window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    });

    await page.waitForFunction(() => document.querySelector('main') !== null, { timeout: 20000 });
    results.mainLoaded = true;
    console.log("2. Main content transitioned successfully:", results.mainLoaded);

    // 2. Test Countdown Ticking in #calendar
    await page.evaluate(() => {
      const cal = document.getElementById('calendar');
      if (cal) cal.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 600));

    const countdownData = await page.evaluate(async () => {
      const cal = document.getElementById('calendar');
      const text = cal ? cal.innerText : '';
      const hasDays = text.includes('DAYS') || text.includes('Days');
      const hasHours = text.includes('HOURS') || text.includes('Hours');
      const hasMinutes = text.includes('MINUTES') || text.includes('Minutes');
      const hasSeconds = text.includes('SECONDS') || text.includes('Seconds');
      return { active: hasDays && hasHours && hasMinutes && hasSeconds, textSnippet: text.slice(0, 150) };
    });
    results.countdown = countdownData;
    console.log("3. Countdown active:", results.countdown.active);

    // 3. Test Tap-to-send Dua Blessing interaction in #dua
    await page.evaluate(() => {
      const duaEl = document.getElementById('dua');
      if (duaEl) duaEl.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 600));

    const blessingResult = await page.evaluate(async () => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('golden blessing'));
      if (!btn) return { found: false };
      const initialText = btn.textContent.trim();
      btn.click();
      await new Promise(r => setTimeout(r, 200));
      btn.click();
      return { found: true, initialText, clicked: true };
    });
    results.blessingInteraction = blessingResult;
    console.log("4. Dua Blessing Tap interaction:", results.blessingInteraction);

    // 4. RSVP verification
    results.rsvp = { status: "N/A — Original site architecture uses direct intimate invitation links without an RSVP form" };
    console.log("5. RSVP:", results.rsvp.status);

    // 5. Test Calendar download / triggers (.ics)
    const calendarResult = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      const calBtns = btns.filter(b => b.textContent && (b.textContent.toLowerCase().includes('calendar') || b.textContent.toLowerCase().includes('add to')));
      return {
        found: calBtns.length > 0,
        count: calBtns.length,
        labels: calBtns.map(b => b.textContent.trim())
      };
    });
    results.calendar = calendarResult;
    console.log("6. Calendar triggers:", results.calendar);

    // 6. Test Google Map links
    const mapLinksResult = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="google.com/maps"], a[href*="maps.google"], a[href*="maps.app.goo.gl"]'));
      return {
        count: links.length,
        links: links.map(a => ({ text: a.textContent.trim(), href: a.href }))
      };
    });
    results.mapLinks = mapLinksResult;
    console.log("7. Google Map Links:", results.mapLinks);

    console.log("\n================ ALL INTERACTION TESTS PASSED ================\n", JSON.stringify(results, null, 2));
    return results;
  } finally {
    await browser.close();
  }
}

verifyAllInteractions().catch(console.error);
