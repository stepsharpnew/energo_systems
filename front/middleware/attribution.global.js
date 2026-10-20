import { attributionSession } from '~/utils/attribution'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const query = attributionSession.resolve(to.query)
  if (Object.keys(query).some(key => !(key in to.query))) {
    return navigateTo({ path: to.path, query, hash: to.hash })
  }
})
