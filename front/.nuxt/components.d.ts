
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'EnergySystems': typeof import("../components/EnergySystems.vue")['default']
    'HelloWorld': typeof import("../components/HelloWorld.vue")['default']
    'EnergySystemsCertificatesSection': typeof import("../components/energy-systems/CertificatesSection.vue")['default']
    'EnergySystemsClientsSection': typeof import("../components/energy-systems/ClientsSection.vue")['default']
    'EnergySystemsContactCTA': typeof import("../components/energy-systems/ContactCTA.vue")['default']
    'EnergySystemsContactModal': typeof import("../components/energy-systems/ContactModal.client.vue")['default']
    'EnergySystemsContactModal': typeof import("../components/energy-systems/ContactModal.vue")['default']
    'EnergySystemsContentBlocks': typeof import("../components/energy-systems/ContentBlocks.vue")['default']
    'EnergySystemsFooter': typeof import("../components/energy-systems/Footer.vue")['default']
    'EnergySystemsHeader': typeof import("../components/energy-systems/Header.vue")['default']
    'EnergySystemsHeroSection': typeof import("../components/energy-systems/HeroSection.vue")['default']
    'EnergySystemsNavigation': typeof import("../components/energy-systems/Navigation.vue")['default']
    'EnergySystemsPreloader': typeof import("../components/energy-systems/Preloader.vue")['default']
    'EnergySystemsProjectsShowcase': typeof import("../components/energy-systems/ProjectsShowcase.vue")['default']
    'EnergySystemsScrollToTop': typeof import("../components/energy-systems/ScrollToTop.vue")['default']
    'EnergySystemsServiceModal': typeof import("../components/energy-systems/ServiceModal.vue")['default']
    'EnergySystemsServicesCarousel': typeof import("../components/energy-systems/ServicesCarousel.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'EnergySystemsContactModal': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyEnergySystems': LazyComponent<typeof import("../components/EnergySystems.vue")['default']>
    'LazyHelloWorld': LazyComponent<typeof import("../components/HelloWorld.vue")['default']>
    'LazyEnergySystemsCertificatesSection': LazyComponent<typeof import("../components/energy-systems/CertificatesSection.vue")['default']>
    'LazyEnergySystemsClientsSection': LazyComponent<typeof import("../components/energy-systems/ClientsSection.vue")['default']>
    'LazyEnergySystemsContactCTA': LazyComponent<typeof import("../components/energy-systems/ContactCTA.vue")['default']>
    'LazyEnergySystemsContactModal': LazyComponent<typeof import("../components/energy-systems/ContactModal.client.vue")['default']>
    'LazyEnergySystemsContactModal': LazyComponent<typeof import("../components/energy-systems/ContactModal.vue")['default']>
    'LazyEnergySystemsContentBlocks': LazyComponent<typeof import("../components/energy-systems/ContentBlocks.vue")['default']>
    'LazyEnergySystemsFooter': LazyComponent<typeof import("../components/energy-systems/Footer.vue")['default']>
    'LazyEnergySystemsHeader': LazyComponent<typeof import("../components/energy-systems/Header.vue")['default']>
    'LazyEnergySystemsHeroSection': LazyComponent<typeof import("../components/energy-systems/HeroSection.vue")['default']>
    'LazyEnergySystemsNavigation': LazyComponent<typeof import("../components/energy-systems/Navigation.vue")['default']>
    'LazyEnergySystemsPreloader': LazyComponent<typeof import("../components/energy-systems/Preloader.vue")['default']>
    'LazyEnergySystemsProjectsShowcase': LazyComponent<typeof import("../components/energy-systems/ProjectsShowcase.vue")['default']>
    'LazyEnergySystemsScrollToTop': LazyComponent<typeof import("../components/energy-systems/ScrollToTop.vue")['default']>
    'LazyEnergySystemsServiceModal': LazyComponent<typeof import("../components/energy-systems/ServiceModal.vue")['default']>
    'LazyEnergySystemsServicesCarousel': LazyComponent<typeof import("../components/energy-systems/ServicesCarousel.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyEnergySystemsContactModal': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const EnergySystems: typeof import("../components/EnergySystems.vue")['default']
export const HelloWorld: typeof import("../components/HelloWorld.vue")['default']
export const EnergySystemsCertificatesSection: typeof import("../components/energy-systems/CertificatesSection.vue")['default']
export const EnergySystemsClientsSection: typeof import("../components/energy-systems/ClientsSection.vue")['default']
export const EnergySystemsContactCTA: typeof import("../components/energy-systems/ContactCTA.vue")['default']
export const EnergySystemsContactModal: typeof import("../components/energy-systems/ContactModal.client.vue")['default']
export const EnergySystemsContactModal: typeof import("../components/energy-systems/ContactModal.vue")['default']
export const EnergySystemsContentBlocks: typeof import("../components/energy-systems/ContentBlocks.vue")['default']
export const EnergySystemsFooter: typeof import("../components/energy-systems/Footer.vue")['default']
export const EnergySystemsHeader: typeof import("../components/energy-systems/Header.vue")['default']
export const EnergySystemsHeroSection: typeof import("../components/energy-systems/HeroSection.vue")['default']
export const EnergySystemsNavigation: typeof import("../components/energy-systems/Navigation.vue")['default']
export const EnergySystemsPreloader: typeof import("../components/energy-systems/Preloader.vue")['default']
export const EnergySystemsProjectsShowcase: typeof import("../components/energy-systems/ProjectsShowcase.vue")['default']
export const EnergySystemsScrollToTop: typeof import("../components/energy-systems/ScrollToTop.vue")['default']
export const EnergySystemsServiceModal: typeof import("../components/energy-systems/ServiceModal.vue")['default']
export const EnergySystemsServicesCarousel: typeof import("../components/energy-systems/ServicesCarousel.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const EnergySystemsContactModal: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyEnergySystems: LazyComponent<typeof import("../components/EnergySystems.vue")['default']>
export const LazyHelloWorld: LazyComponent<typeof import("../components/HelloWorld.vue")['default']>
export const LazyEnergySystemsCertificatesSection: LazyComponent<typeof import("../components/energy-systems/CertificatesSection.vue")['default']>
export const LazyEnergySystemsClientsSection: LazyComponent<typeof import("../components/energy-systems/ClientsSection.vue")['default']>
export const LazyEnergySystemsContactCTA: LazyComponent<typeof import("../components/energy-systems/ContactCTA.vue")['default']>
export const LazyEnergySystemsContactModal: LazyComponent<typeof import("../components/energy-systems/ContactModal.client.vue")['default']>
export const LazyEnergySystemsContactModal: LazyComponent<typeof import("../components/energy-systems/ContactModal.vue")['default']>
export const LazyEnergySystemsContentBlocks: LazyComponent<typeof import("../components/energy-systems/ContentBlocks.vue")['default']>
export const LazyEnergySystemsFooter: LazyComponent<typeof import("../components/energy-systems/Footer.vue")['default']>
export const LazyEnergySystemsHeader: LazyComponent<typeof import("../components/energy-systems/Header.vue")['default']>
export const LazyEnergySystemsHeroSection: LazyComponent<typeof import("../components/energy-systems/HeroSection.vue")['default']>
export const LazyEnergySystemsNavigation: LazyComponent<typeof import("../components/energy-systems/Navigation.vue")['default']>
export const LazyEnergySystemsPreloader: LazyComponent<typeof import("../components/energy-systems/Preloader.vue")['default']>
export const LazyEnergySystemsProjectsShowcase: LazyComponent<typeof import("../components/energy-systems/ProjectsShowcase.vue")['default']>
export const LazyEnergySystemsScrollToTop: LazyComponent<typeof import("../components/energy-systems/ScrollToTop.vue")['default']>
export const LazyEnergySystemsServiceModal: LazyComponent<typeof import("../components/energy-systems/ServiceModal.vue")['default']>
export const LazyEnergySystemsServicesCarousel: LazyComponent<typeof import("../components/energy-systems/ServicesCarousel.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyEnergySystemsContactModal: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
