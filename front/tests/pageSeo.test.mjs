import test from 'node:test'
import assert from 'node:assert/strict'
import { canonicalPageUrl, createPageSeo, SITE_ORIGIN } from '../utils/pageSeo.js'

test('canonical URLs discard campaign parameters, fragments and trailing slashes', () => {
  assert.equal(canonicalPageUrl('/services/ups/?utm_source=ad&yclid=123#quiz'), `${SITE_ORIGIN}/services/ups`)
  assert.equal(canonicalPageUrl('/'), `${SITE_ORIGIN}/`)
  assert.throws(() => canonicalPageUrl('https://other.example/services/ups'), /public site origin/)
})

test('page metadata shares one public identity while keeping resource hints and viewport settings', () => {
  const head = createPageSeo({
    path: '/services/dgu/',
    title: 'ДГУ под ключ',
    description: 'Поставка и монтаж ДГУ',
    image: '/dgu/images/4cb4251f853540df.webp',
    imageAlt: 'Бизнес-центр',
    serviceType: 'Дизельные электростанции',
    areaServed: { '@type': 'Country', name: 'Россия' },
  }, {
    htmlAttrs: { lang: 'ru' },
    meta: [{ name: 'viewport', content: 'width=device-width,initial-scale=1' }],
    link: [{ rel: 'preload', as: 'font', href: '/fonts/manrope-cyrillic.woff2' }],
  })
  const canonical = `${SITE_ORIGIN}/services/dgu`
  assert.equal(head.link.filter(link => link.rel === 'canonical').length, 1)
  assert.equal(head.link.find(link => link.rel === 'canonical').href, canonical)
  assert.equal(head.meta.find(meta => meta.property === 'og:url').content, canonical)
  assert.equal(head.meta.find(meta => meta.name === 'twitter:card').content, 'summary_large_image')
  assert.equal(head.meta.find(meta => meta.property === 'og:image').content, `${SITE_ORIGIN}/dgu/images/4cb4251f853540df.webp`)
  assert.ok(head.link.some(link => link.as === 'font'))
  assert.ok(head.meta.some(meta => meta.name === 'viewport'))
  assert.equal(head.htmlAttrs.lang, 'ru')
  const { '@graph': graph } = JSON.parse(head.script[0].innerHTML)
  const service = graph.find(entity => entity['@type'] === 'Service')
  const page = graph.find(entity => entity['@type'] === 'WebPage')
  assert.equal(service.url, canonical)
  assert.equal(service.mainEntityOfPage['@id'], page['@id'])
  assert.equal(page.mainEntity['@id'], service['@id'])
  assert.ok(graph.some(entity => entity['@id'] === service.provider['@id']))
  assert.deepEqual(service.areaServed, { '@type': 'Country', name: 'Россия' })
})

test('home schema describes the organization and escapes embedded script delimiters', () => {
  const description = 'Текст </script><script>alert(1)</script>'
  const head = createPageSeo({ path: '/', title: 'Энергосистемы', description, image: '/img/background.webp', imageAlt: 'Объект' })
  const serialized = head.script[0].innerHTML
  assert.ok(!serialized.includes('</script>'))
  const { '@graph': graph } = JSON.parse(serialized)
  assert.ok(!graph.some(entity => entity['@type'] === 'Service'))
  assert.equal(graph.find(entity => entity['@type'] === 'WebPage').description, description)
  assert.equal(graph.find(entity => entity['@type'] === 'WebPage').mainEntity['@id'], graph.find(entity => entity['@type'] === 'Organization')['@id'])
})
