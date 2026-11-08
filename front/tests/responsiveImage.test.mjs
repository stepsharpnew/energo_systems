import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { gzipSync, inflateSync } from 'node:zlib'
import manifest from '../data/imageManifest.json' with { type: 'json' }
import { equipmentCatalog } from '../assets/data/equipmentCatalog.js'
import { imageAttrs, imageDimensions, imageSource, imageSrcset } from '../utils/responsiveImage.js'

const publicFile = src => fileURLToPath(new URL('../public' + src, import.meta.url))

test('equipment previews do not request originals and fullscreen metadata is intrinsic', async () => {
  for (const equipment of equipmentCatalog) {
    for (const original of equipment.gallery) {
      const dimensions = imageDimensions(original)
      assert.ok(dimensions.width > 0 && dimensions.height > 0, `${original} needs fullscreen dimensions`)
      const thumbnail = imageSource(original, 240)
      assert.notEqual(thumbnail, original, `${original} must have a thumbnail`)
      assert.ok((await stat(publicFile(thumbnail))).size < (await stat(publicFile(original))).size)
      const preview = imageAttrs(original, { width: 800, sizes: '50vw' })
      assert.notEqual(preview.src, original)
      assert.equal(preview.sizes, '50vw')
      assert.deepEqual({ width: preview.width, height: preview.height }, dimensions)
    }
  }
})

test('all generated variants exist, retain aspect ratio and are ordered without upscaling', async () => {
  for (const [original, image] of Object.entries(manifest)) {
    let lastWidth = 0
    for (const variant of image.variants) {
      assert.ok(variant.width > lastWidth && variant.width <= image.width, original)
      assert.ok(Math.abs(variant.height - image.height * variant.width / image.width) <= 1, original)
      assert.ok((await stat(publicFile(variant.src))).size > 0, variant.src)
      lastWidth = variant.width
    }
  }
})

test('responsive hero has mobile and desktop choices and unknown assets remain usable', async () => {
  const hero = imageAttrs('/img/background.webp', { width: 1200 })
  assert.match(hero.srcset, /480w/)
  assert.match(hero.srcset, /1600w/)
  assert.notEqual(imageSource('/img/background.webp', 480), hero.src)
  assert.deepEqual(imageAttrs('/missing-image.svg'), { src: '/missing-image.svg', decoding: 'async' })
  assert.deepEqual(imageDimensions('/missing-image.svg'), {})
  const bytes = await readFile(new URL('../data/imageManifest.json', import.meta.url))
  assert.ok(gzipSync(bytes).length < 15_000, 'shared image metadata must stay below 15 KB gzip')
})

for (const original of ['/ups/hero-house.jpg', '/hdd/hero-gnb.jpg', '/dgu/images/4cb4251f853540df.webp']) {
test(`${original} LCP has smaller responsive AVIF sources and keeps the WebP fallback`, async () => {
  const image = manifest[original]
  assert.ok(image.avifVariants.length >= 3)
  assert.match(imageSrcset(original, 'avif'), /480w/)
  assert.match(imageAttrs(original).srcset, /\.webp /)
  let lastWidth = 0
  for (const variant of image.avifVariants) {
    assert.ok(variant.width > lastWidth && variant.width <= image.width)
    assert.ok(Math.abs(variant.height - image.height * variant.width / image.width) <= 1)
    const bytes = await readFile(publicFile(variant.src))
    assert.equal(bytes.toString('ascii', 4, 8), 'ftyp')
    assert.ok(bytes.subarray(8, 32).includes(Buffer.from('avif')))
    lastWidth = variant.width
  }
  const avif = image.avifVariants.find(variant => variant.width === 800)
  const webp = image.variants.find(variant => variant.width === 800)
  assert.ok((await stat(publicFile(avif.src))).size < (await stat(publicFile(webp.src))).size * .65,
    'the mobile LCP image must save at least 35% without lowering its dimensions')
  assert.equal(imageSrcset('/missing-image.svg', 'avif'), undefined)
})
}


test('Adobe RGB logo previews preserve the original color-management profile', async () => {
  const original = '/img/clients/client-1.png'
  const png = await readFile(publicFile(original))
  let profile
  for (let offset = 8; offset < png.length;) {
    const size = png.readUInt32BE(offset)
    if (png.toString('ascii', offset + 4, offset + 8) === 'iCCP') {
      const data = png.subarray(offset + 8, offset + 8 + size)
      profile = inflateSync(data.subarray(data.indexOf(0) + 2))
      break
    }
    offset += size + 12
  }
  assert.ok(profile?.length > 0, 'the source must have a real non-sRGB ICC profile')
  assert.ok(profile.includes(Buffer.from('Adobe RGB (1998)')), 'the fixture must cover a wider gamut than sRGB')
  let checked = 0
  for (const variant of manifest[original].variants) {
    if (variant.src === original) continue
    const webp = await readFile(publicFile(variant.src))
    let actual
    for (let offset = 12; offset + 8 <= webp.length;) {
      const size = webp.readUInt32LE(offset + 4)
      if (webp.toString('ascii', offset, offset + 4) === 'ICCP') {
        actual = webp.subarray(offset + 8, offset + 8 + size)
        break
      }
      offset += 8 + size + (size % 2)
    }
    assert.deepEqual(actual, profile, `${variant.src} must retain its Adobe RGB source profile`)
    checked++
  }
  assert.ok(checked > 0, 'at least one encoded logo preview must be checked')
})
