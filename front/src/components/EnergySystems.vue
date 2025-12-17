<template>
  <div class="energy-systems">
    <Header @open-contact-modal="openContactModal" />

    <Navigation :nav-items="navItems" @scroll-to="scrollToSection" />

    <HeroSection ref="heroSection" @open-contact-modal="openContactModal" />

    <ServicesCarousel
      ref="servicesSection"
      :services="services"
      @open-service-modal="openServiceModal"
    />

    <main class="main">
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
    </main>

    <Teleport to="body">
      <ServiceModal
        :show="showServiceModal"
        :service="modalService"
        @close="closeServiceModal"
        @open-contact-modal="handleServiceModalContact"
      />
    </Teleport>


    <Teleport to="body">
      <ContactModal
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
import CertificatesSection from "./energy-systems/CertificatesSection.vue";
import ClientsSection from "./energy-systems/ClientsSection.vue";
import ContactCTA from "./energy-systems/ContactCTA.vue";
import ContactModal from "./energy-systems/ContactModal.vue";
import ContentBlocks from "./energy-systems/ContentBlocks.vue";
import Footer from "./energy-systems/Footer.vue";
import Header from "./energy-systems/Header.vue";
import HeroSection from "./energy-systems/HeroSection.vue";
import Navigation from "./energy-systems/Navigation.vue";
import ProjectsShowcase from "./energy-systems/ProjectsShowcase.vue";
import ScrollToTop from "./energy-systems/ScrollToTop.vue";
import ServiceModal from "./energy-systems/ServiceModal.vue";
import ServicesCarousel from "./energy-systems/ServicesCarousel.vue";

export default {
  name: "EnergySystems",
  components: {
    Header,
    Navigation,
    HeroSection,
    ServicesCarousel,
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
          name: "Горизонтально направленное бурение (ГНБ). Проектируем, бурим и согласовываем под ключ",
          description:
            "Мы реализуем полный цикл работ по ГНБ: от разработки проектной документации и трассировки до выполнения пилотного бурения, калибровки и протяжки коммуникаций. Каждый этап контролируется, а результат соответствует всем строительным нормам.  Мы гарантируем точное соблюдение геометрии прокола и защиту трассы в соответствии СП 45.13330.",
          details:
            "Мы реализуем полный цикл работ по ГНБ: от разработки проектной документации и трассировки до выполнения пилотного бурения, калибровки и протяжки коммуникаций. Каждый этап контролируется, а результат соответствует всем строительным нормам.  Мы гарантируем точное соблюдение геометрии прокола и защиту трассы в соответствии СП 45.13330.",
          image: require("../assets/service/service-center0.jpg"),
          gallery: [
            require("../assets/additions/1.PNG"),
            require("../assets/additions/2.PNG"),
            require("../assets/additions/3.PNG"),
          ],
        },
        {
          id: "road",
          name: "Подключение к электросетям и увеличение мощности в Москве и МосОбласти.",
          description:
            "Компания «Энергосистемы» оказывает услуги по обеспечению потребителей электрической энергией. Вы можете заказать подключение к электросетям и увеличение мощности в Москве и Московской области. Наши специалисты выполняют комплекс работ, связанных с энергообеспечением предприятия, коммерческого или бытового объекта.",
          details:
            "Компания «Энергосистемы» оказывает услуги по обеспечению потребителей электрической энергией. Вы можете заказать подключение к электросетям и увеличение мощности в Москве и Московской области. Наши специалисты выполняют комплекс работ, связанных с энергообеспечением предприятия, коммерческого или бытового объекта.",
          image: require("../assets/service/service-center1.jpg"),
          gallery: [
            require("../assets/additions/4.PNG"),
            require("../assets/additions/5.PNG"),
            require("../assets/additions/6.PNG"),
          ],
        },
        {
          id: "water",
          name: "Получение и/или выполнение ТУ от энергоснабжающих организаций.",
          description:
            "Мы предоставляем комплекс услуг по получению и исполнению Технических Условий от сетевых компаний. ТУ — это обязательный документ, который определяет требования к подключению объекта к электросетям, включая допустимую мощность, точки присоединения и необходимые технические мероприятия. Мы обеспечиваем легитимное увеличение выделенной мощности или новое технологическое присоединение вашего объекта к системам электроснабжения.",
          details:
            "Мы предоставляем комплекс услуг по получению и исполнению Технических Условий от сетевых компаний. ТУ — это обязательный документ, который определяет требования к подключению объекта к электросетям, включая допустимую мощность, точки присоединения и необходимые технические мероприятия. Мы обеспечиваем легитимное увеличение выделенной мощности или новое технологическое присоединение вашего объекта к системам электроснабжения.",
          image: require("../assets/service/service-center2.jpg"),
          gallery: [
            require("../assets/additions/7.PNG"),
            require("../assets/additions/8.PNG"),
            require("../assets/additions/9.PNG"),
          ],
        },
        {
          id: "sewer",
          name: "Согласование проекта электроснабжения.",
          description:
            "Согласование проекта электроснабжения – это обязательный этап подключения к электросети новых объектов. Процедура предусматривает утверждение проектной документации несколькими инстанциями.",
          details:
            "Согласование проекта электроснабжения – это обязательный этап подключения к электросети новых объектов. Процедура предусматривает утверждение проектной документации несколькими инстанциями.",
          image: require("../assets/service/service-center3.jpg"),
          gallery: [
            require("../assets/additions/10.PNG"),
            require("../assets/additions/11.PNG"),
            require("../assets/additions/12.PNG"),
          ],
        },
        {
          id: "power",
          name: "Электромонтажные работы по собственным проектам или проектам заказчика.",
          description:
            "Компания «Энергосистемы» выполняет электромонтажные работы по собственным проектам или проектам заказчика на любых объектах по внутреннему и внешнему электроснабжению.",
          details:
            "Компания «Энергосистемы» выполняет электромонтажные работы по собственным проектам или проектам заказчика на любых объектах по внутреннему и внешнему электроснабжению.",
          image: require("../assets/service/service-center4.jpg"),
          gallery: [
            require("../assets/additions/13.PNG"),
            require("../assets/additions/14.PNG"),
            require("../assets/additions/15.PNG"),
          ],
        },
        {
          id: "gas",
          name: "Пуско-наладочные работы.",
          description:
            "Пуско-наладочными работами является комплекс работ, включающий проверку, настройку и испытания электрооборудования с целью обеспечения электрических параметров и режимов, заданных проектом. При выполнении пусконаладочных работ следует руководствоваться требованиями Правил устройства электроустановок, утвержденных в порядке, установленном СНиП.",
          details:
            "Пуско-наладочными работами является комплекс работ, включающий проверку, настройку и испытания электрооборудования с целью обеспечения электрических параметров и режимов, заданных проектом. При выполнении пусконаладочных работ следует руководствоваться требованиями Правил устройства электроустановок, утвержденных в порядке, установленном СНиП.",
          image: require("../assets/service/service-center5.jpg"),
          gallery: [
            require("../assets/additions/16.PNG"),
            require("../assets/additions/17.PNG"),
            require("../assets/additions/18.PNG"),
          ],
        },
        {
          id: "design",
          name: "Эксплуатация объектов электроснабжения и инжиниринговые услуги.",
          description:
            "Эксплуатация объектов электроснабжения осуществляется в соответствии с действующими нормативами. Компания «Энергосистемы» предлагает полный комплекс услуг по безопасному и бесперебойному использованию такого оборудования.",
          details:
            "Эксплуатация объектов электроснабжения осуществляется в соответствии с действующими нормативами. Компания «Энергосистемы» предлагает полный комплекс услуг по безопасному и бесперебойному использованию такого оборудования.",
          image: require("../assets/service/service-center6.jpg"),
          gallery: [
            require("../assets/additions/19.PNG"),
            require("../assets/additions/20.PNG"),
            require("../assets/additions/21.PNG"),
          ],
        },
        {
          id: "support",
          name: "Текущий или аварийный ремонт электрооборудования и кабельных линий.",
          description:
            "Мы выполняем аварийные и плановые ремонтные работы любой сложности для восстановления работоспособности электроустановок, распределительных устройств и силовых кабельных линий.",
          details:
            "Мы выполняем аварийные и плановые ремонтные работы любой сложности для восстановления работоспособности электроустановок, распределительных устройств и силовых кабельных линий.",
          image: require("../assets/service/service-center7.jpg"),
          gallery: [
            require("../assets/additions/22.PNG"),
            require("../assets/additions/23.PNG"),
            require("../assets/additions/24.PNG"),
          ],
        },
        {
          id: "heating",
          name: "Услуги электролаборатории в г.Солнечногорске",
          description:
            "Компания «Энергосистемы» предоставит сертифицированный техотчёт ЭТЛ. Гарантия 36 мес. На собственника электроустановки возлагается обязанность производить периодические профилактические испытания и измерения с обязательным оформлением технического отчёта. Проверку наличия технического отчёта по проведённым профилактическим испытаниям и измерениям осуществляют инспекции Госпожнадзора и Ростехнадзора",
          details:
            "Компания «Энергосистемы» предоставит сертифицированный техотчёт ЭТЛ. Гарантия 36 мес. На собственника электроустановки возлагается обязанность производить периодические профилактические испытания и измерения с обязательным оформлением технического отчёта. Проверку наличия технического отчёта по проведённым профилактическим испытаниям и измерениям осуществляют инспекции Госпожнадзора и Ростехнадзора",
          image: require("../assets/service/service-center8.jpg"),
          gallery: [
            require("../assets/additions/25.PNG"),
            require("../assets/additions/26.PNG"),
            require("../assets/additions/27.PNG"),
          ],
        },
        {
          id: "monitoring",
          name: "Вынос электросетей из пятна застройки.",
          description:
            "Наша компания проводит перенос существующих сетей энергоснабжения за пределы строительной площадки. Актуально, когда текущая инфраструктура находится в зоне планируемых строительно-монтажных работ и мешает освоению территории.",
          details:
            "Наша компания проводит перенос существующих сетей энергоснабжения за пределы строительной площадки. Актуально, когда текущая инфраструктура находится в зоне планируемых строительно-монтажных работ и мешает освоению территории.",
          image: require("../assets/service/service-center9.jpg"),
          gallery: [
            require("../assets/additions/28.PNG"),
            require("../assets/additions/29.PNG"),
            require("../assets/additions/30.PNG"),
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
          image: require("../assets/projects/project-1.jpg"),
        },
        {
          id: "proj2",
          client: "АО «Политехстрой»»",
          name: "Жилой дом по адресу г. Москва, ЮЗАО, Новые Черёмушки, кв. 10С, корпус 8.",
          address: "г. Москва ул. Новые Черёмушки, кв. 10С, корп. 8",
          details:
            "Проклади кабельную линию 2,4 км, смонтировали муфты, построили камеру подключения и выполнили ПНР.",
          image: require("../assets/projects/project-2.jpg"),
        },
        {
          id: "proj3",
          client: "ООО «МОНОТЕК СТРОЙ»",
          name: "Комплекс Работ по переустройству существующих кабельных сетей 10 кВ, 0,4 кВ",
          address:
            "г. Москва, Волоколамское шоссе, д. 63 стр.1,2,3,4,5,6,7,8,10,11,12,13",
          details:
            "11.02.2022г. - 12.04.2022г. Ведомость выполненных объемов работ. Переустройство существующих КЛ",
          image: require("../assets/projects/project-3.jpg"),
        },
        {
          id: "proj4",
          client: "ГК «Российские автомобильные дороги»",
          name: "А-113 строящаяся Центральная кольцевая дорога Московской области, пусковой комплекс № 3. Подготовка территории строительства. Переустройство трансформаторной подстанции «Васильково» № 368 на ПК 307",
          address: "г. Москва, Подстанция «Васильково» № 368",
          details:
            "11.02.2020г. - 15.07.2020г. Ведомость выполненных объемов работ. Установка видеонаблюдения Охранная сигнализация Сопряжение охранной сигнализации и видеонаблюдения Охранное освещение",
          image: require("../assets/projects/project-4.jpg"),
        },
        {
          id: "proj5",
          client: 'АО "МИСК"',
          name: "Электрификация транспортной развязки для индустриального парка Есипово «Завод по производству легковых автомобилей Mercedes-Benz»",
          address:
            'Московская область Солнечногорский район 49-53 км "М-10 "Россия"',
          details:
            '- 29.10.2021. Ведомость выполненных объемов работ. переустройство линий связи; переустройство линий ВЛ и КЛ 0.4-10 кВ; переустройство инженерных коммуникаций АЗС «Трасса», переустройство инженерных коммуникации АЗС "СТС"; видеонаблюдение по системе «Безопасный регион»; транспортная безопасность; строительство БКТП; электроосвещение транспортной развязки; электроосвещение М-10 «Россия»; архитектурное освещение путепровода.',
          image: require("../assets/projects/project-5.jpg"),
        },
        {
          id: "proj6",
          client: 'ООО "Триумф"',
          name: "Строительство трансформаторной подстанции (II категории надежности), прокладка кабельных линий 0.4 кВ, внутренние электромонтажные работы здания Спортивного комплекса «Металлург» и Административно-бытового корпуса для проведения 21 Чемпионата мира по футболу FIFA WORLD CUP RUSSIA 2018",
          address:
            "Московская область, Солнечнгорский р-н, г. Солнечногорск, г.п. Солнечногорск, парк имени Крупской",
          details:
            "октябрь 2017-декабрь 2017. Ведомость выполненных объемов работ. строительство 2БКТП (II категории надежности); строительство кабельной линии от БКТП до вновь строящегося здания Спортивного комплекса; вводно-распределительное устройство (ВРУ) и внутренние электромонтажные работы всего здания Спортивного комплекса; строительство кабельной линии до здания АБК, мачт освещения высотой 28 метров футбольного поля и информационного табло; освещение трибун наружное освещение прилегающей территории Спортивного комплекса «Металлург».",
          image: require("../assets/projects/project-6.jpg"),
        },
        {
          id: "proj7",
          client: 'ООО "ОПТИМУМ"',
          name: "Внутренние электромонтажные работы здания Спортивного комплекса «Глебовец» для проведения 21 Чемпионата мира по футболу FIFA WORLD CUP RUSSIA 2018 (Резервный стадион)",
          address: "Московская область. Истринский р-н, стадион Глебовский",
          details:
            "февраль 2018 - март 2018. Ведомость выполненных объемов работ. вводно-распределительное устройство (ВРУ) и внутренние электромонтажные работы всего здания Спортивного комплекса;",
          image: require("../assets/projects/project-7.jpg"),
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
          image: require("../assets/projects/project-8.jpg"),
        },
      ],
      clients: [
        {
          id: "client1",
          name: "Газпром",
          image: require("../assets/clients/client-1.png"),
        },
        {
          id: "client2",
          name: "РЖД",
          image: require("../assets/clients/client-2.png"),
        },
        {
          id: "client3",
          name: "ОЭК",
          image: require("../assets/clients/client-3.png"),
        },
        {
          id: "client4",
          name: "Ростелеком",
          image: require("../assets/clients/client-4.png"),
        },
        {
          id: "client5",
          name: "РОССЕТИ",
          image: require("../assets/clients/client-5.png"),
        },
        {
          id: "client6",
          name: "МОСОБЛЭНЕРГО",
          image: require("../assets/clients/client-6.png"),
        },
      ],
      certificates: [
        {
          id: "cert1",
          title: "Система менеджмента качества...",
          issuer: "ооо «Энергосистемы»",
          year: "2020",
          image: require("../assets/certificate/certificate-1.jpg"),
        },
        {
          id: "cert2",
          title: "Система экологического менеджмента...",
          issuer: "ооо «Энергосистемы»",
          year: "2020",
          image: require("../assets/certificate/certificate-2.jpg"),
        },
        {
          id: "cert3",
          title: "Система менеджмента охраны здоровья и безопасности труда...",
          issuer: "Bureau Veritas",
          year: "2020",
          image: require("../assets/certificate/certificate-3.jpg"),
        },
      ],
      navItems: [
        { key: "hero", label: "Главная" },
        { key: "services", label: "Услуги" },
        { key: "about", label: "О нас" },
        { key: "projects", label: "Проекты" },
        { key: "clients", label: "Клиенты" },
        { key: "certificates", label: "Сертификаты" },
        { key: "contact", label: "Контакты" },
      ],
      showServiceModal: false,
      modalService: null,
      showContactModal: false,
      contactModalServiceId: null,
      showScrollTop: false,
      scrollSmoother: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onWindowScroll, { passive: true });
    window.addEventListener("resize", this.handleResize, { passive: true });
    // Небольшая задержка для гарантии готовности DOM
    this.$nextTick(() => {
      setTimeout(() => {
        this.initScrollSmoother();
      }, 100);
    });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onWindowScroll);
    window.removeEventListener("resize", this.handleResize);
    // Уничтожаем ScrollSmoother
    if (this.scrollSmoother) {
      this.scrollSmoother.kill();
      this.scrollSmoother = null;
    }
  },
  methods: {
    openServiceModal(service) {
      this.modalService = service;
      this.showServiceModal = true;
    },
    closeServiceModal() {
      this.showServiceModal = false;
      this.modalService = null;
    },
    openContactModal() {
      this.contactModalServiceId = null;
      this.showContactModal = true;
    },
    closeContactModal() {
      this.showContactModal = false;
      this.contactModalServiceId = null;
    },
    handleServiceModalContact(service) {
      // Закрываем модалку услуги перед открытием контактной модалки
      this.closeServiceModal();
      // Устанавливаем выбранную услугу и открываем контактную модалку
      this.contactModalServiceId = service?.id || null;
      this.showContactModal = true;
    },
    scrollToSection(key) {
      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;

      if (!gsap || !ScrollTrigger) {
        // Fallback на нативный скролл, если GSAP недоступен
        const map = {
          hero: this.$refs.heroSection?.$el,
          services: this.$refs.servicesSection?.$el,
          about: this.$refs.aboutSection?.$el,
          projects: this.$refs.projectsSection?.$el,
          clients: this.$refs.clientsSection?.$el,
          certificates: this.$refs.certificatesSection?.$el,
          contact: this.$refs.contactSection?.$el,
        };
        const target = map[key];
        if (target && target.scrollIntoView) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      const map = {
        hero: this.$refs.heroSection?.$el,
        services: this.$refs.servicesSection?.$el,
        about: this.$refs.aboutSection?.$el,
        projects: this.$refs.projectsSection?.$el,
        clients: this.$refs.clientsSection?.$el,
        certificates: this.$refs.certificatesSection?.$el,
        contact: this.$refs.contactSection?.$el,
      };

      const target = map[key];
      if (!target) return;

      // Используем GSAP ScrollTo для плавного скролла
      const targetY = target.getBoundingClientRect().top + window.pageYOffset;

      // Если используется ScrollSmoother, используем его метод скролла
      if (this.scrollSmoother) {
        gsap.to(this.scrollSmoother, {
          duration: 1.2,
          scrollTop: targetY,
          ease: "power2.inOut",
          onComplete: () => {
            // Обновляем ScrollTrigger после завершения скролла
            ScrollTrigger.refresh();
            // Обновляем ScrollTrigger в дочерних компонентах
            if (
              this.$refs.aboutSection &&
              this.$refs.aboutSection.refreshScrollTrigger
            ) {
              this.$refs.aboutSection.refreshScrollTrigger();
            }
          },
        });
      } else {
        // Обычный скролл через GSAP ScrollTo
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetY,
            offsetY: 0,
          },
          ease: "power2.inOut",
          onComplete: () => {
            // Обновляем ScrollTrigger после завершения скролла
            ScrollTrigger.refresh();
            // Обновляем ScrollTrigger в дочерних компонентах
            if (
              this.$refs.aboutSection &&
              this.$refs.aboutSection.refreshScrollTrigger
            ) {
              this.$refs.aboutSection.refreshScrollTrigger();
            }
          },
        });
      }
    },
    onWindowScroll() {
      this.showScrollTop = window.scrollY > 400;
    },
    handleResize() {
      // Переинициализируем ScrollSmoother при изменении размера окна
      if (this.scrollSmoother) {
        const isMobile = window.innerWidth <= 992;
        if (isMobile && this.scrollSmoother) {
          this.scrollSmoother.kill();
          this.scrollSmoother = null;
        } else if (!isMobile && !this.scrollSmoother) {
          this.initScrollSmoother();
        } else if (this.scrollSmoother) {
          this.scrollSmoother.refresh();
        }
      }
    },
    initScrollSmoother() {
      // Проверяем, не мобильное ли устройство (отключаем на мобильных для производительности)
      const isMobile = window.innerWidth <= 992;
      if (isMobile) return;

      // Если ScrollSmoother уже создан, не создаем повторно
      if (this.scrollSmoother) return;

      const ScrollSmoother = this.$ScrollSmoother;
      const ScrollTrigger = this.$ScrollTrigger;
      const gsap = this.$gsap;

      if (!ScrollSmoother || !ScrollTrigger || !gsap) return;

      // Проверяем наличие необходимых элементов в DOM
      const wrapper = document.querySelector("#app");
      const content = document.querySelector(".energy-systems");
      if (!wrapper || !content) {
        console.warn("ScrollSmoother: необходимые элементы не найдены в DOM");
        return;
      }

      // Инициализируем ScrollSmoother
      this.scrollSmoother = ScrollSmoother.create({
        wrapper: "#app",
        content: ".energy-systems",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
      });

      // Применяем эффект data-speed для элементов с параллаксом
      this.$nextTick(() => {
        const speedElements = document.querySelectorAll("[data-speed]");
        speedElements.forEach((el) => {
          const speed = parseFloat(el.getAttribute("data-speed")) || 1;

          // Используем ScrollSmoother effects для параллакса
          this.scrollSmoother.effects(el, {
            speed: speed,
          });
        });
      });
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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
</style>
