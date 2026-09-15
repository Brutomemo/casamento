import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
})

async function measure(viewport) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.envelope-photo')
  await page.waitForFunction(() => {
    const img = document.querySelector('.envelope-photo')
    return img && img.complete && img.naturalWidth > 0
  })
  const data = await page.evaluate(() => {
    const q = (s) => {
      const el = document.querySelector(s)
      if (!el) return null
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        x: Math.round(r.x),
        y: Math.round(r.y),
        styleW: cs.width,
        styleH: cs.height,
      }
    }
    const img = document.querySelector('.envelope-photo')
    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      scene: q('.envelope-scene'),
      frame: q('.envelope-frame'),
      photo: q('.envelope-photo'),
      flap: q('.envelope-flap'),
      seal: q('.wax-seal'),
      natural: { w: img.naturalWidth, h: img.naturalHeight },
    }
  })
  console.log(JSON.stringify({ viewport, data }, null, 2))
  await page.close()
}

await measure({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true })
await measure({ width: 1280, height: 800, deviceScaleFactor: 1, isMobile: false })
await browser.close()
