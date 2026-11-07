import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import fonts from '../data/fontManifest.json' with { type: 'json' }
import { landingFontPreloads } from '../utils/landingFonts.js'

test('local landing fonts are the unchanged, versioned Google Fonts WOFF2 binaries', async () => {
  assert.equal(fonts.length, 14)
  for (const font of fonts) {
    const bytes = await readFile(new URL('../public' + font.src, import.meta.url))
    assert.equal(bytes.toString('ascii', 0, 4), 'wOF2', font.src)
    assert.equal(bytes.length, font.bytes, font.src)
    assert.equal(createHash('sha256').update(bytes).digest('hex'), font.sha256, font.src)
    assert.match(font.source, /^https:\/\/fonts\.gstatic\.com\//)
  }
  for (const filename of ['Manrope-OFL.txt', 'PTSerif-OFL.txt']) {
    const license = await readFile(new URL('../public/fonts/' + filename, import.meta.url), 'utf8')
    assert.match(license, /SIL OPEN FONT LICENSE Version 1\.1/)
    assert.match(license, /Copyright/)
  }
})

test('local CSS preserves the original subsets, weights and font-display behavior', async () => {
  const css = await readFile(new URL('../assets/styles/landing-fonts.css', import.meta.url), 'utf8')
  assert.doesNotMatch(css, /https?:\/\//, 'font rendering must not require Google stylesheet/font requests')
  const faces = [...css.matchAll(/@font-face\s*\{([^}]+)\}/g)].map(match => match[1])
  for (const font of fonts) {
    const matching = faces.filter(face => face.includes(`url(${font.src})`))
    assert.equal(matching.length, font.weights.length)
    assert.deepEqual(matching.map(face => Number(face.match(/font-weight:\s*(\d+)/)[1])), font.weights)
    assert.ok(matching.every(face => /font-display:\s*swap/.test(face) && /unicode-range:/.test(face)))
  }
})

test('critical Cyrillic and Latin Manrope subsets are preloaded by all service landings', async () => {
  assert.deepEqual(landingFontPreloads.map(link => link.href), ['/fonts/manrope-v23-cyrillic.woff2', '/fonts/manrope-v23-latin.woff2'])
  for (const preload of landingFontPreloads) {
    assert.equal(preload.as, 'font')
    assert.equal(preload.type, 'font/woff2')
    assert.equal(preload.crossorigin, 'anonymous')
  }
  for (const page of ['hdd', 'ups', 'dgu']) {
    const source = await readFile(new URL(`../pages/services/${page}.vue`, import.meta.url), 'utf8')
    assert.match(source, /import '~\/assets\/styles\/landing-fonts\.css'/)
    assert.match(source, /link: landingFontPreloads/)
    assert.doesNotMatch(source, /fonts\.(?:googleapis|gstatic)\.com/)
  }
})
