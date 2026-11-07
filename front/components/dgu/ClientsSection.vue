<template>
<section class="section section--clients" id="clients">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Нам доверяют те, кому нельзя без света —</span>
      мы работаем для них по всей России
    </h2>
    <p class="clients__lead">Резервное электроснабжение для энергетики, транспорта, связи и девелоперов: проектируем, поставляем и запускаем станции по всей России.</p>
  </div>
  <div class="marquee" data-marquee :class="{ 'is-running': !reduced }">
    <ul class="marquee__track" data-marquee-track>
      <li v-for="(client, index) in displayedClients" :key="index" class="client" :aria-hidden="index >= clients.length ? 'true' : undefined">
        <img v-if="client.src" decoding="async" class="client__logo" :src="client.src" :alt="client.alt" height="52">
        <span v-else class="client__name">{{ client.logo }}</span>
        <b>{{ client.name }}</b><span>{{ client.description }}</span>
      </li>
    </ul>
  </div>
</section>
</template>

<script setup>
const props = defineProps({ reduced: Boolean })
const clients = [
  {
    "name": "Россети",
    "description": "Электросетевой комплекс",
    "src": "/dgu/images/0e4cfab103ed3454.png",
    "alt": "Россети",
    "logo": ""
  },
  {
    "name": "Газпром",
    "description": "Газовая отрасль",
    "src": "/dgu/images/8a896a3d449c5a2b.png",
    "alt": "Газпром",
    "logo": ""
  },
  {
    "name": "ГК «Автодор»",
    "description": "ЦКАД: переустройство ТП «Васильково»",
    "src": "/dgu/images/834e41311891f73e.png",
    "alt": "Автодор",
    "logo": ""
  },
  {
    "name": "РЖД",
    "description": "Железнодорожный транспорт",
    "src": "/dgu/images/004405609ed59f92.png",
    "alt": "РЖД",
    "logo": ""
  },
  {
    "name": "МИСК",
    "description": "Электрификация развязки на М-10",
    "src": "",
    "alt": "",
    "logo": "МИСК"
  },
  {
    "name": "ОЭК",
    "description": "Электросети Москвы",
    "src": "/dgu/images/5b60555ffa8ddc27.png",
    "alt": "ОЭК",
    "logo": ""
  },
  {
    "name": "Триумф",
    "description": "Электромонтаж СК «Металлург» к ЧМ-2018",
    "src": "",
    "alt": "",
    "logo": "Триумф"
  },
  {
    "name": "АНО «Россия — страна возможностей»",
    "description": "Электроснабжение, Сенеж, 2БКТП",
    "src": "/dgu/images/5602c296c2649a62.png",
    "alt": "Россия — страна возможностей",
    "logo": ""
  },
  {
    "name": "Ростелеком",
    "description": "Связь",
    "src": "/dgu/images/85b0616e01b347ac.png",
    "alt": "Ростелеком",
    "logo": ""
  },
  {
    "name": "ООО «Оптимум»",
    "description": "Электромонтаж СК «Глебовец» к ЧМ-2018",
    "src": "",
    "alt": "",
    "logo": "Оптимум"
  },
  {
    "name": "Монотек Строй",
    "description": "Кабельные сети 10/0,4 кВ, Волоколамское шоссе",
    "src": "/dgu/images/a1f27d0276bde9d7.png",
    "alt": "Монотекстрой",
    "logo": ""
  },
  {
    "name": "Мособлэнерго",
    "description": "Электросети Московской области",
    "src": "/dgu/images/e8d7986511ca1a70.png",
    "alt": "Мособлэнерго",
    "logo": ""
  },
  {
    "name": "АО «Политехстрой»",
    "description": "Электроснабжение жилого дома, Новые Черёмушки",
    "src": "",
    "alt": "",
    "logo": "Политехстрой"
  },
  {
    "name": "ООО «БарсПром-М»",
    "description": "Силовое оборудование и освещение, Капотня",
    "src": "",
    "alt": "",
    "logo": "БарсПром-М"
  }
]
const displayedClients = computed(() => props.reduced ? clients : [...clients, ...clients])
</script>
