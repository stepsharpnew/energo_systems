export const SITE_ORIGIN = 'https://e-systems.su'

export function canonicalPageUrl(path) {
  const url = new URL(path, SITE_ORIGIN)
  if (url.origin !== SITE_ORIGIN) throw new Error('A site canonical must use the public site origin')
  url.search = ''
  url.hash = ''
  url.pathname = url.pathname.replace(/\/+$/, '') || '/'
  return url.href
}

// Fixed page data keeps canonical URLs independent of campaign parameters and
// the index.html/trailing-slash aliases served by the static host.
export function createPageSeo({ path, title, description, image, imageAlt, serviceType, areaServed }, head = {}) {
  const url = canonicalPageUrl(path)
  const imageUrl = new URL(image, SITE_ORIGIN).href
  const organizationId = `${SITE_ORIGIN}/#organization`
  const websiteId = `${SITE_ORIGIN}/#website`
  const pageId = `${url}#webpage`
  const organization = {
    '@type': 'Organization',
    '@id': organizationId,
    name: 'Энергосистемы',
    legalName: 'ООО «Энергосистемы»',
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/img/image.png`,
    email: 'sales@e-systems.su',
  }
  const graph = [
    organization,
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_ORIGIN}/`,
      name: 'Энергосистемы',
      inLanguage: 'ru-RU',
      publisher: { '@id': organizationId },
    },
    {
      '@type': 'WebPage',
      '@id': pageId,
      url,
      name: title,
      description,
      inLanguage: 'ru-RU',
      isPartOf: { '@id': websiteId },
      primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl, caption: imageAlt },
      mainEntity: { '@id': serviceType ? `${url}#service` : organizationId },
    },
  ]
  if (serviceType) graph.push({
    '@type': 'Service',
    '@id': `${url}#service`,
    name: serviceType,
    serviceType,
    description,
    url,
    image: imageUrl,
    areaServed,
    provider: { '@id': organizationId },
    mainEntityOfPage: { '@id': pageId },
  })

  return {
    ...head,
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:site_name', content: 'Энергосистемы' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:alt', content: imageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: imageAlt },
      ...(head.meta || []),
    ],
    link: [{ rel: 'canonical', href: url }, ...(head.link || [])],
    script: [{
      key: 'page-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c'),
    }, ...(head.script || [])],
  }
}
