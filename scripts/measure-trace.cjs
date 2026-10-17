const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function measure(traceFileName, outputMetricsName) {
  console.log(`Starting measurement: ${traceFileName}...`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=393,852'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: 393,
      height: 852,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true
    });

    const client = await page.createCDPSession();

    // 4x CPU Throttling
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    // Slow 4G Network Throttling
    // Slow 4G: Latency 400ms, Download 400kbps (50KB/s), Upload 400kbps (50KB/s)
    await client.send('Network.enable');
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 400,
      downloadThroughput: (400 * 1024) / 8,
      uploadThroughput: (400 * 1024) / 8,
      connectionType: 'cellular4g'
    });

    console.log("Navigating to http://localhost:3000...");
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 60000 });

    console.log("Waiting for Enter Invitation button...");
    await page.waitForSelector('button', { timeout: 45000 });
    
    // Click the Enter Invitation button
    console.log("Clicking Enter button...");
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const enterBtn = btns.find(b => b.textContent && b.textContent.toLowerCase().includes('enter')) || btns[0];
      if (enterBtn) enterBtn.click();
    });

    // Wait for Bismillah scene or transition to mount
    console.log("Waiting for Bismillah transition or main...");
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 500));
      const hasMain = await page.evaluate(() => !!document.querySelector('main'));
      if (hasMain) break;
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const scrollBtn = btns.find(b => b.textContent && b.textContent.toLowerCase().includes('scroll'));
        if (scrollBtn) scrollBtn.click();
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      });
    }

    // Wait for main content to appear with 60s timeout
    console.log("Waiting for <main> to be present...");
    await page.waitForFunction(() => {
      return document.querySelector('main') !== null;
    }, { timeout: 60000 });

    // Let any entrance animations stabilize
    await new Promise(r => setTimeout(r, 1500));

    console.log("Main content loaded. Starting FPS monitor and tracing...");

    // Start in-page FPS tracker
    await page.evaluate(() => {
      window.__fpsData = [];
      let lastTime = performance.now();
      window.__trackingFPS = true;

      function loop(now) {
        if (!window.__trackingFPS) return;
        const delta = now - lastTime;
        lastTime = now;
        if (delta > 0) {
          const fps = 1000 / delta;
          window.__fpsData.push({ time: now, fps, delta });
        }
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    });

    // Start CDP / Puppeteer trace
    const tracePath = path.resolve(process.cwd(), traceFileName);
    await page.tracing.start({
      path: tracePath,
      screenshots: false,
      categories: [
        '-*',
        'devtools.timeline',
        'v8',
        'v8.execute',
        'disabled-by-default-devtools.timeline',
        'disabled-by-default-devtools.timeline.frame',
        'toplevel',
        'blink.user_timing'
      ]
    });

    console.log("Scrolling smoothly from top to bottom...");
    // Steady scroll down over ~10-12 seconds
    const scrollInfo = await page.evaluate(async () => {
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = window.innerHeight;
      const totalScroll = scrollHeight - clientHeight;
      const step = 20; // px per tick
      const delay = 16; // ~60fps tick rate
      let current = 0;

      while (current < totalScroll) {
        current = Math.min(current + step, totalScroll);
        window.scrollTo(0, current);
        await new Promise(r => setTimeout(r, delay));
      }
      // Wait a tiny moment at bottom
      await new Promise(r => setTimeout(r, 500));
      return { scrollHeight, totalScroll };
    });

    console.log(`Scrolled total ${scrollInfo.totalScroll}px. Stopping trace...`);

    // Stop FPS tracking
    const fpsRecords = await page.evaluate(() => {
      window.__trackingFPS = false;
      return window.__fpsData || [];
    });

    await page.tracing.stop();
    console.log("Trace saved to " + tracePath);

    // Process FPS
    let avgFps = 0;
    let minFps = 60;
    if (fpsRecords.length > 0) {
      // Filter out initial startup frame anomalies
      const validFps = fpsRecords.slice(5).map(f => Math.min(60, f.fps));
      if (validFps.length > 0) {
        avgFps = validFps.reduce((a, b) => a + b, 0) / validFps.length;
        // 1st percentile / min fps
        const sorted = [...validFps].sort((a, b) => a - b);
        minFps = sorted[Math.floor(sorted.length * 0.01)] || sorted[0];
      }
    }

    // Parse the trace file
    console.log("Parsing trace file...");
    const traceJson = JSON.parse(fs.readFileSync(tracePath, 'utf8'));
    const events = traceJson.traceEvents || [];

    let totalScriptingTime = 0;
    let totalPaintCompositeTime = 0;
    const longTasks = [];
    const layoutShifts = [];

    // Scripting event names
    const scriptEvents = new Set([
      'FunctionCall',
      'EvaluateScript',
      'v8.compile',
      'v8.compileModule',
      'MajorGC',
      'MinorGC',
      'FireAnimationFrame',
      'TimerFire',
      'XHRReadyStateChange',
      'EventDispatch'
    ]);

    // Paint / Composite event names
    const paintEvents = new Set([
      'Paint',
      'CompositeLayers',
      'UpdateLayerTree',
      'LayoutImage',
      'PaintImage',
      'Rasterize',
      'RasterTask'
    ]);

    // Find top-level / long tasks (>50ms)
    // RunTask / toplevel events in devtools.timeline
    for (const ev of events) {
      const durMs = (ev.dur || 0) / 1000;

      if (ev.name === 'RunTask' || ev.name === 'Task' || ev.cat.includes('toplevel')) {
        if (durMs >= 50) {
          longTasks.push({
            name: ev.name,
            duration: durMs,
            ts: ev.ts / 1000,
            args: ev.args
          });
        }
      }

      if (scriptEvents.has(ev.name)) {
        totalScriptingTime += durMs;
      } else if (paintEvents.has(ev.name)) {
        totalPaintCompositeTime += durMs;
      }

      if (ev.name === 'LayoutShift' && ev.args && ev.args.data) {
        layoutShifts.push({
          score: ev.args.data.score || 0,
          weightedScore: ev.args.data.weighted_score_delta || 0,
          hadRecentInput: ev.args.data.had_recent_input,
          impactedNodes: ev.args.data.impacted_nodes || []
        });
      }
    }

    // Inspect long tasks to find scripts responsible
    // We can match timestamps with FunctionCall / EvaluateScript inside those ranges
    for (const lt of longTasks) {
      const start = lt.ts * 1000;
      const end = (lt.ts + lt.duration) * 1000;
      const subScripts = events.filter(e => e.ts >= start && (e.ts + (e.dur || 0)) <= end && (e.name === 'EvaluateScript' || e.name === 'FunctionCall'));
      const urls = new Set();
      for (const s of subScripts) {
        if (s.args?.data?.url) urls.add(s.args.data.url);
        if (s.args?.data?.scriptName) urls.add(s.args.data.scriptName);
      }
      lt.responsibleScripts = Array.from(urls);
    }

    const metrics = {
      avgFps: Number(avgFps.toFixed(1)),
      minFps: Number(minFps.toFixed(1)),
      totalFrames: fpsRecords.length,
      longTaskCount: longTasks.length,
      longTasks: longTasks.map(t => ({
        durationMs: Number(t.duration.toFixed(1)),
        scripts: t.responsibleScripts
      })),
      totalScriptingTimeMs: Number(totalScriptingTime.toFixed(1)),
      totalPaintCompositeTimeMs: Number(totalPaintCompositeTime.toFixed(1)),
      layoutShiftCount: layoutShifts.length,
      layoutShifts: layoutShifts.slice(0, 5)
    };

    fs.writeFileSync(outputMetricsName, JSON.stringify(metrics, null, 2));
    console.log("Measurement completed:", metrics);
    return metrics;
  } finally {
    await browser.close();
  }
}

const args = process.argv.slice(2);
const traceFile = args[0] || 'trace-scroll-baseline.json';
const outputFile = args[1] || 'stage-a-trace-metrics.json';
measure(traceFile, outputFile).catch(err => {
  console.error("Error during measurement:", err);
  process.exit(1);
});
