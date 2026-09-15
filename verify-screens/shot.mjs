import puppeteer from 'puppeteer-core'
import { mkdir } from 'node:fs/promises'

const outDir = 'c:/casamento/verify-screens'
await mkdir(outDir, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
})

async function shot(name, viewport) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForSelector('.envelope-photo', { timeout: 8000 })
  await page.waitForFunction(() => {
    const img = document.querySelector('.envelope-photo')
    return img && img.complete && img.naturalWidth > 0
  })
  await new Promise((r) => setTimeout(r, 400))
  await page.screenshot({ path: `${outDir}/${name}.png` })
  await page.close()
}

await shot('cover-mobile', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true })
await shot('cover-desktop', { width: 1280, height: 800, deviceScaleFactor: 1, isMobile: false })

const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true })
await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded', timeout: 30000 })
await page.waitForSelector('.wax-seal')
await page.click('.wax-seal')
await new Promise((r) => setTimeout(r, 500))
await page.screenshot({ path: `${outDir}/cover-opening.png` })
await page.close()

await browser.close()
console.log('ok')
