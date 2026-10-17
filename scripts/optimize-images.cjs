const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimize() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const originalsDir = path.resolve(process.cwd(), 'originals');

  if (!fs.existsSync(originalsDir)) {
    fs.mkdirSync(originalsDir, { recursive: true });
  }

  // Ensure originals is gitignored
  const gitignorePath = path.resolve(process.cwd(), '.gitignore');
  let gitignore = fs.readFileSync(gitignorePath, 'utf8');
  if (!gitignore.includes('originals')) {
    gitignore += '\n# Image originals\noriginals/\n';
    fs.writeFileSync(gitignorePath, gitignore);
  }

  // Move root af1, af2 to originals if present
  for (const rootFile of ['af1', 'af2']) {
    const p = path.resolve(process.cwd(), rootFile);
    if (fs.existsSync(p)) {
      fs.copyFileSync(p, path.join(originalsDir, rootFile));
      fs.unlinkSync(p);
      console.log(`Moved root ${rootFile} to originals/`);
    }
  }

  const imagesToOptimize = [
    { name: 'dua-arch.jpg', maxW: 1376, q: 78 },
    { name: 'nikah-venue.jpg', maxW: 1200, q: 78 },
    { name: 'walima-venue.jpg', maxW: 1200, q: 78 },
    { name: 'countdown-mosque.jpg', maxW: 1200, q: 78 },
    { name: 'bride-photo.jpg', maxW: 576, q: 80 },
    { name: 'groom-photo.jpg', maxW: 463, q: 80 },
    { name: 'couple-photo.jpg', maxW: 576, q: 80 },
  ];

  for (const item of imagesToOptimize) {
    const srcPath = path.join(publicDir, item.name);
    const origPath = path.join(originalsDir, item.name);

    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(origPath)) {
        fs.copyFileSync(srcPath, origPath);
      }

      // Optimize WebP version
      const baseName = path.parse(item.name).name;
      const webpPath = path.join(publicDir, `${baseName}.webp`);

      await sharp(origPath)
        .resize({ width: item.maxW, withoutEnlargement: true })
        .webp({ quality: item.q, effort: 6 })
        .toFile(webpPath);

      // Also optimize JPEG version in place so any fallback or Next.js Image loader is ultra-light
      const tempJpg = path.join(publicDir, `temp-${item.name}`);
      await sharp(origPath)
        .resize({ width: item.maxW, withoutEnlargement: true })
        .jpeg({ quality: item.q, mozjpeg: true })
        .toFile(tempJpg);
      fs.renameSync(tempJpg, srcPath);

      const webpStat = fs.statSync(webpPath);
      const jpgStat = fs.statSync(srcPath);
      console.log(`${item.name} -> WebP: ${(webpStat.size/1024).toFixed(1)}KB, JPG: ${(jpgStat.size/1024).toFixed(1)}KB`);
    }
  }

  // Optimize Monogram (PNG & WebP)
  const monogramName = 'af-gold-monogram.png';
  const monogramSrc = path.join(publicDir, monogramName);
  const monogramOrig = path.join(originalsDir, monogramName);
  if (fs.existsSync(monogramSrc)) {
    if (!fs.existsSync(monogramOrig)) {
      fs.copyFileSync(monogramSrc, monogramOrig);
    }
    const webpPath = path.join(publicDir, 'af-gold-monogram.webp');
    await sharp(monogramOrig)
      .resize({ width: 512, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);

    const tempPng = path.join(publicDir, `temp-${monogramName}`);
    await sharp(monogramOrig)
      .resize({ width: 512, withoutEnlargement: true })
      .png({ compressionLevel: 9, effort: 8 })
      .toFile(tempPng);
    fs.renameSync(tempPng, monogramSrc);

    console.log(`af-gold-monogram -> WebP: ${(fs.statSync(webpPath).size/1024).toFixed(1)}KB, PNG: ${(fs.statSync(monogramSrc).size/1024).toFixed(1)}KB`);
  }

  // Move unused illustration images to originals
  for (const unused of ['bride-illustration.jpg', 'groom-illustration.jpg', 'couple-illustration.jpg']) {
    const p = path.join(publicDir, unused);
    if (fs.existsSync(p)) {
      fs.copyFileSync(p, path.join(originalsDir, unused));
      fs.unlinkSync(p);
      console.log(`Moved unused ${unused} to originals/`);
    }
  }

  // Generate 1200x630 og-image.jpg for WhatsApp and social previews
  const ogPath = path.join(publicDir, 'og-image.jpg');
  const duaArch = path.join(publicDir, 'dua-arch.jpg');
  if (fs.existsSync(duaArch)) {
    await sharp(duaArch)
      .resize({ width: 1200, height: 630, fit: 'cover' })
      .tint({ r: 7, g: 59, b: 45 })
      .composite([
        {
          input: Buffer.from(`
            <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
              <rect width="1200" height="630" fill="#02271F" opacity="0.75" />
              <rect x="40" y="40" width="1120" height="550" rx="20" fill="none" stroke="#C6A15B" stroke-width="2" opacity="0.6" stroke-dasharray="8 6" />
              <text x="600" y="160" text-anchor="middle" font-family="serif" font-size="24" fill="#C6A15B" letter-spacing="6">IN THE NAME OF ALLAH, THE MOST BENEFICENT, THE MOST MERCIFUL</text>
              <text x="600" y="240" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#C6A15B" letter-spacing="8" font-weight="600">WEDDING INVITATION</text>
              <text x="600" y="340" text-anchor="middle" font-family="serif" font-size="64" fill="#F5EBD5" font-weight="300" letter-spacing="4">ABUTHAHIR &amp; FAZILA</text>
              <line x1="450" y1="380" x2="750" y2="380" stroke="#C6A15B" stroke-width="1.5" />
              <text x="600" y="440" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#C6A15B" letter-spacing="6" font-weight="500">21 &amp; 23 MARCH 2027</text>
              <text x="600" y="490" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#F5EBD5" opacity="0.85" letter-spacing="4">KUMBAKONAM · TRICHY</text>
            </svg>
          `),
          top: 0,
          left: 0
        }
      ])
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(ogPath);
    console.log(`Created og-image.jpg: ${(fs.statSync(ogPath).size/1024).toFixed(1)}KB`);
  }

  console.log("Image optimization complete!");
}

optimize().catch(console.error);
