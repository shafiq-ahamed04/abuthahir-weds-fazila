const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function run() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const files = fs.readdirSync(publicDir);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];

  const images = [];
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (imageExtensions.includes(ext)) {
      const fullPath = path.join(publicDir, f);
      const stat = fs.statSync(fullPath);
      images.push({
        filename: f,
        sizeBytes: stat.size,
        sizeKB: (stat.size / 1024).toFixed(1) + ' KB'
      });
    }
  }

  // Launch browser to inspect rendered dimensions at 393px and 1280px
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 393, height: 852 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Click Enter and Bismillah to reveal all sections
  await page.waitForSelector('button');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const enterBtn = btns.find(b => b.textContent && b.textContent.toLowerCase().includes('enter')) || btns[0];
    if (enterBtn) enterBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const scrollBtn = btns.find(b => b.textContent && b.textContent.toLowerCase().includes('scroll'));
    if (scrollBtn) scrollBtn.click();
    window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));
  });
  await page.waitForFunction(() => !!document.querySelector('main'), { timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));

  // Get displayed sizes on mobile
  const mobileImgSizes = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      displayWidth: Math.round(img.getBoundingClientRect().width),
      displayHeight: Math.round(img.getBoundingClientRect().height)
    }));
  });

  // Switch to desktop viewport (1280x900)
  await page.setViewport({ width: 1280, height: 900 });
  await new Promise(r => setTimeout(r, 1000));

  const desktopImgSizes = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      displayWidth: Math.round(img.getBoundingClientRect().width),
      displayHeight: Math.round(img.getBoundingClientRect().height)
    }));
  });

  await browser.close();

  // Combine image data
  for (const img of images) {
    const mMatch = mobileImgSizes.find(m => m.src.includes(img.filename) || (m.currentSrc && m.currentSrc.includes(encodeURIComponent(img.filename))));
    const dMatch = desktopImgSizes.find(d => d.src.includes(img.filename) || (d.currentSrc && d.currentSrc.includes(encodeURIComponent(img.filename))));
    img.naturalDimensions = mMatch ? `${mMatch.naturalWidth}x${mMatch.naturalHeight}` : (dMatch ? `${dMatch.naturalWidth}x${dMatch.naturalHeight}` : 'unknown');
    img.mobileDisplaySize = mMatch ? `${mMatch.displayWidth}x${mMatch.displayHeight} px` : 'not rendered in main / cover only';
    img.desktopDisplaySize = dMatch ? `${dMatch.displayWidth}x${dMatch.displayHeight} px` : 'not rendered in main / cover only';
  }

  // JS libraries & sizes
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = { ...pkg.dependencies };
  const jsLibraries = [];

  for (const [name, version] of Object.entries(deps)) {
    let sizeBytes = 0;
    try {
      const depPath = path.resolve('node_modules', name);
      if (fs.existsSync(depPath)) {
        const getDirSize = (dir) => {
          let s = 0;
          for (const item of fs.readdirSync(dir)) {
            const full = path.join(dir, item);
            const stat = fs.statSync(full);
            if (stat.isDirectory()) s += getDirSize(full);
            else s += stat.size;
          }
          return s;
        };
        sizeBytes = getDirSize(depPath);
      }
    } catch (e) {}

    jsLibraries.push({
      name,
      version,
      packageSizeBytes: sizeBytes,
      packageSizeKB: (sizeBytes / 1024).toFixed(1) + ' KB'
    });
  }

  const result = { images, jsLibraries };
  fs.writeFileSync('stage-a-assets.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
}

run().catch(console.error);
