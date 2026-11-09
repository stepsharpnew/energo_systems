<template>
  <div class="energy-systems">
    <a class="skip-link" href="#main-content" @click.prevent="skipToContent">Перейти к содержанию</a>
    <Header @open-contact-modal="openContactModal" />

    <Navigation :nav-items="navItems" />

    <main id="main-content" ref="mainContent" tabindex="-1">
      <HeroSection ref="heroSection" @open-contact-modal="openContactModal" />

      <ServicesCarousel
        ref="servicesSection"
        :services="services"
        @open-service-modal="openServiceModal"
      />

      <EquipmentCatalogTeaser />

      <div class="main">
        <div class="container-1">
          <ContentBlocks ref="aboutSection" />

          <ProjectsShowcase
            ref="projectsSection"
            :projects="projects"
          />

          <ClientsSection ref="clientsSection" :clients="clients" />

          <CertificatesSection
            ref="certificatesSection"
            :certificates="certificates"
          />

          <ContactCTA
            ref="contactSection"
            @open-contact-modal="openContactModal"
          />
        </div>
      </div>
    </main>

    <Teleport to="body">
      <ServiceModal
        v-if="serviceModalRequested"
        :show="showServiceModal"
        :service="modalService"
        @close="closeServiceModal"
        @open-contact-modal="handleServiceModalContact"
      />
    </Teleport>


    <Teleport to="body">
      <ContactModal
        v-if="contactModalRequested"
        :show="showContactModal"
        :services="services"
        :selected-service-id="contactModalServiceId"
        @close="closeContactModal"
      />
    </Teleport>

    <Footer />

    <Teleport to="body">
      <ScrollToTop :show="showScrollTop" />
    </Teleport>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { scrollToPageSection } from '~/utils/nativeScroll.js';
import CertificatesSection from "./energy-systems/CertificatesSection.vue";
import ClientsSection from "./energy-systems/ClientsSection.vue";
import ContactCTA from "./energy-systems/ContactCTA.vue";
const ContactModal = defineAsyncComponent(() => import("./energy-systems/ContactModal.vue"));
import ContentBlocks from "./energy-systems/ContentBlocks.vue";
import EquipmentCatalogTeaser from "./equipment/EquipmentCatalogTeaser.vue";
import Footer from "./energy-systems/Footer.vue";
import Header from "./energy-systems/Header.vue";
import HeroSection from "./energy-systems/HeroSection.vue";
import Navigation from "./energy-systems/Navigation.vue";
import ProjectsShowcase from "./energy-systems/ProjectsShowcase.vue";
import ScrollToTop from "./energy-systems/ScrollToTop.vue";
const ServiceModal = defineAsyncComponent(() => import("./energy-systems/ServiceModal.vue"));
import ServicesCarousel from "./energy-systems/ServicesCarousel.vue";

export default {
  name: "EnergySystems",
  components: {
    Header,
    Navigation,
    HeroSection,
    ServicesCarousel,
    EquipmentCatalogTeaser,
    ContentBlocks,
    ProjectsShowcase,
    ClientsSection,
    CertificatesSection,
    ContactCTA,
    Footer,
    ServiceModal,
    ContactModal,
    ScrollToTop,
  },
  data() {
    return {
      services: [
        {
          id: "hdd",
          name: "ГНБ под ключ: горизонтально направленное бурение и проколы под дорогами",
          description:
            "Выполняем горизонтально направленное бурение и проколы под дорогами для водопровода, канализации, газа, кабеля, футляров и гильз. Работаем без вскрытия покрытия и нарушения благоустройства.",
          details:
            "ГНБ под ключ: обследуем объект, подбираем технологию, выполняем пилотное бурение, расширение скважины и протяжку трубы или кабеля. Работаем в городской застройке, под дорогами, ж/д путями, водоемами и на участках с действующими коммуникациями.",
          image: '/img/service/service-center0.webp',
          imageWidth: 1200,
          imageHeight: 898,
          gallery: [
            '/img/additions/1.PNG',
            '/img/additions/2.PNG',
            '/img/additions/3.PNG',
          ],
        },
        {
          id: "road",
          name: "Подключение к электросетям и увеличение мощности в Москве и МосОбласти.",
          description:
            "Компания «Энергосистемы» оказывает услуги по обеспечению потребителей электрической энергией. Вы можете заказать подключение к электросетям и увеличение мощности в Москве и Московской области. Наши специалисты выполняют комплекс работ, связанных с энергообеспечением предприятия, коммерческого или бытового объекта.",
          details:
            "Компания «Энергосистемы» оказывает услуги по обеспечению потребителей электрической энергией. Вы можете заказать подключение к электросетям и увеличение мощности в Москве и Московской области. Наши специалисты выполняют комплекс работ, связанных с энергообеспечением предприятия, коммерческого или бытового объекта.",
          image: '/img/service/service-center1.webp',
          imageWidth: 800,
          imageHeight: 533,
          gallery: [
            '/img/additions/4.PNG',
            '/img/additions/5.PNG',
            '/img/additions/6.PNG',
          ],
        },
        {
          id: "water",
          name: "Получение и/или выполнение ТУ от энергоснабжающих организаций.",
          description:
            "Мы предоставляем комплекс услуг по получению и исполнению Технических Условий от сетевых компаний. ТУ — это обязательный документ, который определяет требования к подключению объекта к электросетям, включая допустимую мощность, точки присоединения и необходимые технические мероприятия. Мы обеспечиваем легитимное увеличение выделенной мощности или новое технологическое присоединение вашего объекта к системам электроснабжения.",
          details:
            "Мы предоставляем комплекс услуг по получению и исполнению Технических Условий от сетевых компаний. ТУ — это обязательный документ, который определяет требования к подключению объекта к электросетям, включая допустимую мощность, точки присоединения и необходимые технические мероприятия. Мы обеспечиваем легитимное увеличение выделенной мощности или новое технологическое присоединение вашего объекта к системам электроснабжения.",
          image: '/img/service/service-center2.webp',
          imageWidth: 800,
          imageHeight: 533,
          gallery: [
            '/img/additions/7.PNG',
            '/img/additions/8.PNG',
            '/img/additions/9.PNG',
          ],
        },
        {
          id: "sewer",
          name: "Согласование проекта электроснабжения.",
          description:
            "Согласование проекта электроснабжения – это обязательный этап подключения к электросети новых объектов. Процедура предусматривает утверждение проектной документации несколькими инстанциями.",
          details:
            "Согласование проекта электроснабжения – это обязательный этап подключения к электросети новых объектов. Процедура предусматривает утверждение проектной документации несколькими инстанциями.",
          image: '/img/service/service-center3.webp',
          imageWidth: 800,
          imageHeight: 533,
          gallery: [
            '/img/additions/10.PNG',
            '/img/additions/11.PNG',
            '/img/additions/12.PNG',
          ],
        },
        {
          id: "power",
          name: "Электромонтажные работы по собственным проектам или проектам заказчика.",
          description:
            "Компания «Энергосистемы» выполняет электромонтажные работы по собственным проектам или проектам заказчика на любых объектах по внутреннему и внешнему электроснабжению.",
          details:
            "Компания «Энергосистемы» выполняет электромонтажные работы по собственным проектам или проектам заказчика на любых объектах по внутреннему и внешнему электроснабжению.",
          image: '/img/service/service-center4.webp',
          imageWidth: 800,
          imageHeight: 533,
          gallery: [
            '/img/additions/13.PNG',
            '/img/additions/14.PNG',
            '/img/additions/15.PNG',
          ],
        },
        {
          id: "gas",
          name: "Пуско-наладочные работы.",
          description:
            "Пуско-наладочными работами является комплекс работ, включающий проверку, настройку и испытания электрооборудования с целью обеспечения электрических параметров и режимов, заданных проектом. При выполнении пусконаладочных работ следует руководствоваться требованиями Правил устройства электроустановок, утвержденных в порядке, установленном СНиП.",
          details:
            "Пуско-наладочными работами является комплекс работ, включающий проверку, настройку и испытания электрооборудования с целью обеспечения электрических параметров и режимов, заданных проектом. При выполнении пусконаладочных работ следует руководствоваться требованиями Правил устройства электроустановок, утвержденных в порядке, установленном СНиП.",
          image: '/img/service/service-center5.webp',
          imageWidth: 800,
          imageHeight: 533,
          gallery: [
            '/img/additions/16.PNG',
            '/img/additions/17.PNG',
            '/img/additions/18.PNG',
          ],
        },
        {
          id: "design",
          name: "Эксплуатация объектов электроснабжения и инжиниринговые услуги.",
          description:
            "Эксплуатация объектов электроснабжения осуществляется в соответствии с действующими нормативами. Компания «Энергосистемы» предлагает полный комплекс услуг по безопасному и бесперебойному использованию такого оборудования.",
          details:
            "Эксплуатация объектов электроснабжения осуществляется в соответствии с действующими нормативами. Компания «Энергосистемы» предлагает полный комплекс услуг по безопасному и бесперебойному использованию такого оборудования.",
          image: '/img/service/service-center6.webp',
          imageWidth: 800,
          imageHeight: 533,
          gallery: [
            '/img/additions/19.PNG',
            '/img/additions/20.PNG',
            '/img/additions/21.PNG',
          ],
        },
        {
          id: "support",
          name: "Текущий или аварийный ремонт электрооборудования и кабельных линий.",
          description:
            "Мы выполняем аварийные и плановые ремонтные работы любой сложности для восстановления работоспособности электроустановок, распределительных устройств и силовых кабельных линий.",
          details:
            "Мы выполняем аварийные и плановые ремонтные работы любой сложности для восстановления работоспособности электроустановок, распределительных устройств и силовых кабельных линий.",
          image: '/img/service/service-center7.webp',
          imageWidth: 800,
          imageHeight: 533,
          gallery: [
            '/img/additions/22.PNG',
            '/img/additions/23.PNG',
            '/img/additions/24.PNG',
          ],
        },
        {
          id: "heating",
          name: "Услуги электролаборатории в г. Солнечногорске",
          description:
            "Компания «Энергосистемы» предоставит сертифицированный техотчёт ЭТЛ. Гарантия 36 мес. На собственника электроустановки возлагается обязанность производить периодические профилактические испытания и измерения с обязательным оформлением технического отчёта. Проверку наличия технического отчёта по проведённым профилактическим испытаниям и измерениям осуществляют инспекции Госпожнадзора и Ростехнадзора",
          details:
            "Компания «Энергосистемы» предоставит сертифицированный техотчёт ЭТЛ. Гарантия 36 мес. На собственника электроустановки возлагается обязанность производить периодические профилактические испытания и измерения с обязательным оформлением технического отчёта. Проверку наличия технического отчёта по проведённым профилактическим испытаниям и измерениям осуществляют инспекции Госпожнадзора и Ростехнадзора",
          image: '/img/service/service-center8.webp',
          imageWidth: 800,
          imageHeight: 533,
          gallery: [
            '/img/additions/25.PNG',
            '/img/additions/26.PNG',
            '/img/additions/27.PNG',
          ],
        },
        {
          id: "monitoring",
          name: "Вынос электросетей из пятна застройки.",
          description:
            "Наша компания проводит перенос существующих сетей энергоснабжения за пределы строительной площадки. Актуально, когда текущая инфраструктура находится в зоне планируемых строительно-монтажных работ и мешает освоению территории.",
          details:
            "Наша компания проводит перенос существующих сетей энергоснабжения за пределы строительной площадки. Актуально, когда текущая инфраструктура находится в зоне планируемых строительно-монтажных работ и мешает освоению территории.",
          image: '/img/service/service-center9.webp',
          imageWidth: 800,
          imageHeight: 533,
          gallery: [
            '/img/additions/28.PNG',
            '/img/additions/29.PNG',
            '/img/additions/30.PNG',
          ],
        },
      ],
      projects: [
        {
          id: "proj1",
          client: "ООО «БарсПром-М»»",
          name: "Монтаж систем Силового оборудования, Наружного электроосвещения, Электрического освещения в МОП, Линий электропередачи кабельных, Заземления и молниезащиты, и Локально вычислительную сеть",
          address: "г. Москва, 2-й Квартал Капотня 1, корп.3",
          details:
            "18.03.2022г. - в процессе. Монтаж наружного электроосвещения Монтаж систем Силового оборудования Монтаж ЛЭП Монтаж электрического освещения в МОП ЛВС",
          image: '/img/projects/project-1.jpg',
        },
        {
          id: "proj2",
          client: "АО «Политехстрой»»",
          name: "Жилой дом по адресу г. Москва, ЮЗАО, Новые Черёмушки, кв. 10С, корпус 8.",
          address: "г. Москва ул. Новые Черёмушки, кв. 10С, корп. 8",
          details:
            "Проклади кабельную линию 2,4 км, смонтировали муфты, построили камеру подключения и выполнили ПНР.",
          image: '/img/projects/project-2.jpg',
        },
        {
          id: "proj3",
          client: "ООО «МОНОТЕК СТРОЙ»",
          name: "Комплекс Работ по переустройству существующих кабельных сетей 10 кВ, 0,4 кВ",
          address:
            "г. Москва, Волоколамское шоссе, д. 63 стр.1,2,3,4,5,6,7,8,10,11,12,13",
          details:
            "11.02.2022г. - 12.04.2022г. Ведомость выполненных объемов работ. Переустройство существующих КЛ",
          image: '/img/projects/project-3.jpg',
        },
        {
          id: "proj4",
          client: "ГК «Российские автомобильные дороги»",
          name: "А-113 строящаяся Центральная кольцевая дорога Московской области, пусковой комплекс № 3. Подготовка территории строительства. Переустройство трансформаторной подстанции «Васильково» № 368 на ПК 307",
          address: "г. Москва, Подстанция «Васильково» № 368",
          details:
            "11.02.2020г. - 15.07.2020г. Ведомость выполненных объемов работ. Установка видеонаблюдения Охранная сигнализация Сопряжение охранной сигнализации и видеонаблюдения Охранное освещение",
          image: '/img/projects/project-4.webp',
        },
        {
          id: "proj5",
          client: 'АО "МИСК"',
          name: "Электрификация транспортной развязки для индустриального парка Есипово «Завод по производству легковых автомобилей Mercedes-Benz»",
          address:
            'Московская область Солнечногорский район 49-53 км "М-10 "Россия"',
          details:
            '- 29.10.2021. Ведомость выполненных объемов работ. переустройство линий связи; переустройство линий ВЛ и КЛ 0.4-10 кВ; переустройство инженерных коммуникаций АЗС «Трасса», переустройство инженерных коммуникации АЗС "СТС"; видеонаблюдение по системе «Безопасный регион»; транспортная безопасность; строительство БКТП; электроосвещение транспортной развязки; электроосвещение М-10 «Россия»; архитектурное освещение путепровода.',
          image: '/img/projects/project-5.webp',
        },
        {
          id: "proj6",
          client: 'ООО "Триумф"',
          name: "Строительство трансформаторной подстанции (II категории надежности), прокладка кабельных линий 0.4 кВ, внутренние электромонтажные работы здания Спортивного комплекса «Металлург» и Административно-бытового корпуса для проведения 21 Чемпионата мира по футболу FIFA WORLD CUP RUSSIA 2018",
          address:
            "Московская область, Солнечнгорский р-н, г. Солнечногорск, г.п. Солнечногорск, парк имени Крупской",
          details:
            "октябрь 2017-декабрь 2017. Ведомость выполненных объемов работ. строительство 2БКТП (II категории надежности); строительство кабельной линии от БКТП до вновь строящегося здания Спортивного комплекса; вводно-распределительное устройство (ВРУ) и внутренние электромонтажные работы всего здания Спортивного комплекса; строительство кабельной линии до здания АБК, мачт освещения высотой 28 метров футбольного поля и информационного табло; освещение трибун наружное освещение прилегающей территории Спортивного комплекса «Металлург».",
          image: '/img/projects/project-6.jpg',
        },
        {
          id: "proj7",
          client: 'ООО "ОПТИМУМ"',
          name: "Внутренние электромонтажные работы здания Спортивного комплекса «Глебовец» для проведения 21 Чемпионата мира по футболу FIFA WORLD CUP RUSSIA 2018 (Резервный стадион)",
          address: "Московская область. Истринский р-н, стадион Глебовский",
          details:
            "февраль 2018 - март 2018. Ведомость выполненных объемов работ. вводно-распределительное устройство (ВРУ) и внутренние электромонтажные работы всего здания Спортивного комплекса;",
          image: '/img/projects/project-7.jpg',
        },
        {
          id: "proj8",
          client:
            "АНО «Россия - страна возможностей» Обособленное подразделение «МАСТЕРСКАЯ УПРАВЛЕНИЯ «СЕНЕЖ»",
          name: "Строительство 2БКТП , прокладка кабельных линий 0.4 кВ до всех локаций жизнедеятельности и творчества АНО «Россия - страна возможностей»",
          address:
            "Московская область, г.Солнечногорск, Территория дома отдыха «Сенеж»",
          details:
            "июнь 2019 – июль 2019. Ведомость выполненных объемов работ строительство 2БКТП(II категории надежности);строительство кабельных линий к модульному городку и комплексу взаимосвязанных обслуживающих объектов, составляющих и обеспечивающих функционирования системы (летний кинотеатр, сцена, беседки, фотокабины, столовая и т.д.), расположенных на территории площадью 3.5 га.",
          image: '/img/projects/project-8.jpg',
        },
      ],
      clients: [
        {
          id: "client1",
          name: "Газпром",
          image: '/img/clients/client-1.png',
        },
        {
          id: "client2",
          name: "РЖД",
          image: '/img/clients/client-2.png',
        },
        {
          id: "client3",
          name: "ОЭК",
          image: '/img/clients/client-3.png',
        },
        {
          id: "client4",
          name: "Ростелеком",
          image: '/img/clients/client-4.png',
        },
        {
          id: "client5",
          name: "РОССЕТИ",
          image: '/img/clients/client-5.png',
        },
        {
          id: "client6",
          name: "МОСОБЛЭНЕРГО",
          image: '/img/clients/client-6.png',
        },
      ],
      certificates: [
        {
          id: "cert1",
          title: "Архивный сертификат: система менеджмента качества",
          issuer: "Орган по сертификации ООО «Бизнес Эксперт»",
          image: '/img/certificate/certificate-1.jpg',
          imageWidth: 634,
          imageHeight: 895,
          thumbnail: '/img/certificate/certificate-1-preview.webp',
          thumbnailWidth: 602,
          thumbnailHeight: 850,
        },
        {
          id: "cert2",
          title: "Архивный сертификат: система экологического менеджмента",
          issuer: "Орган по сертификации ООО «Бизнес Эксперт»",
          image: '/img/certificate/certificate-2.jpg',
          imageWidth: 631,
          imageHeight: 893,
          thumbnail: '/img/certificate/certificate-2-preview.webp',
          thumbnailWidth: 601,
          thumbnailHeight: 850,
        },
        {
          id: "cert3",
          title: "Архивный сертификат: система менеджмента охраны здоровья и безопасности труда",
          issuer: "Орган по сертификации ООО «Бизнес Эксперт»",
          image: '/img/certificate/certificate-3.jpg',
          imageWidth: 633,
          imageHeight: 894,
          thumbnail: '/img/certificate/certificate-3-preview.webp',
          thumbnailWidth: 602,
          thumbnailHeight: 850,
        },
        {
          id: "thanks-rosseti-2026",
          title: "Благодарность за оперативное восстановление электроснабжения",
          issuer: "ПАО «Россети Московский регион»",
          image: '/img/1234.jpg',
          imageWidth: 1700,
          imageHeight: 2338,
          thumbnail: '/img/1234-preview.webp',
          thumbnailWidth: 618,
          thumbnailHeight: 850,
        },
      ],
      navItems: [
        { key: "gnb", label: "ГНБ под ключ", href: "/services/hdd", featured: true },
        { key: "hero", label: "Главная", href: "/#hero" },
        { key: "services", label: "Услуги", href: "/#services" },
        { key: "equipment", label: "Оборудование", href: "/equipment" },
        { key: "about", label: "О нас", href: "/#about" },
        { key: "projects", label: "Проекты", href: "/#projects" },
        { key: "clients", label: "Клиенты", href: "/#clients" },
        { key: "certificates", label: "Документы", href: "/#certificates" },
        { key: "contact", label: "Контакты", href: "/#contact" },
      ],
      serviceModalRequested: false,
      showServiceModal: false,
      modalService: null,
      contactModalRequested: false,
      showContactModal: false,
      contactModalServiceId: null,
      showScrollTop: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onWindowScroll, { passive: true });
    this.onWindowScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onWindowScroll);
  },
  methods: {
    openServiceModal(service) {
      this.serviceModalRequested = true;
      this.modalService = service;
      this.showServiceModal = true;
    },
    closeServiceModal() {
      this.showServiceModal = false;
      this.modalService = null;
    },
    openContactModal() {
      this.contactModalRequested = true;
      this.contactModalServiceId = null;
      this.showContactModal = true;
    },
    closeContactModal() {
      this.showContactModal = false;
      this.contactModalServiceId = null;
    },
    handleServiceModalContact(service) {
      this.contactModalRequested = true;
      // Закрываем модалку услуги перед открытием контактной модалки
      this.closeServiceModal();
      // Устанавливаем выбранную услугу и открываем контактную модалку
      this.contactModalServiceId = service?.id || null;
      this.showContactModal = true;
    },
    skipToContent() {
      this.$refs.mainContent?.focus({ preventScroll: true });
      scrollToPageSection(this.$refs.mainContent, this.$el.querySelector('.main-nav'));
    },
    onWindowScroll() {
      this.showScrollTop = window.scrollY > 400;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.energy-systems {
  min-height: 100vh;
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  color: #333;
  background: #fff;
}

.container-1 {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.main {
  padding: 40px 0;
}
.skip-link {
  position: fixed;
  top: -80px;
  left: 16px;
  z-index: 100;
  padding: 12px 18px;
  border-radius: 8px;
  color: #fff;
  background: #102234;
  text-decoration: none;
}
.skip-link:focus { top: 12px; outline: 3px solid #f7aa33; }
</style>
