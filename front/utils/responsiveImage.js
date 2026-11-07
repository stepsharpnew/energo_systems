import manifest from '../data/imageManifest.json' with { type: 'json' }

export function imageDimensions(src) {
  const image = manifest[src]
  return image ? { width: image.width, height: image.height } : {}
}

export function imageSource(src, width = 800) {
  const variants = manifest[src]?.variants || []
  return (variants.find(image => image.width >= width) || variants.at(-1))?.src || src
}

// Keep the original aspect ratio. CSS remains responsible for the page's crop.
export function imageAttrs(src, { sizes = '100vw', width = 800 } = {}) {
  const image = manifest[src]
  if (!image) return { src, decoding: 'async' }
  return {
    src: imageSource(src, width),
    ...(image.variants.length ? {
      srcset: image.variants.map(variant => `${variant.src} ${variant.width}w`).join(', '),
      sizes,
    } : {}),
    width: image.width,
    height: image.height,
    decoding: 'async',
  }
}
