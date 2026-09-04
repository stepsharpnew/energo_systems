export const equipmentCatalog = [
  {
    slug: 'mtp',
    name: 'МТП',
    eyebrow: 'Мачтовые подстанции',
    shortDescription: 'Компактное решение для приёма, преобразования и распределения электроэнергии на объектах с воздушным вводом.',
    description: 'Мачтовые трансформаторные подстанции применяют для электроснабжения удалённых, сельскохозяйственных, инфраструктурных и небольших производственных объектов. «Энергосистемы» поможет определить требуемую мощность, схему подключения, состав защиты и подходящее конструктивное исполнение.',
    applications: [
      'Населённые пункты и индивидуальная застройка',
      'Сельскохозяйственные и фермерские объекты',
      'Удалённые площадки и объекты инфраструктуры'
    ],
    gallery: [
      '/img/equipment/mtp-1.jpg',
      '/img/equipment/mtp-2.jpg',
      '/img/equipment/mtp-3.jpg'
    ],
    questionnaire: null,
    questionnaireFile: null
  },
  {
    slug: 'ktp',
    name: 'КТП',
    eyebrow: 'Комплектные подстанции',
    shortDescription: 'Подстанции для приёма, преобразования и распределения электроэнергии в сетях объектов различного назначения.',
    description: 'Комплектные трансформаторные подстанции подбираются под электрическую схему, расчётную мощность, способ ввода и вывода, условия размещения и требования объекта. Возможны одно- и двухтрансформаторные, тупиковые и проходные исполнения в различных типах корпуса.',
    applications: [
      'Промышленные и складские комплексы',
      'Коммерческие и общественные здания',
      'Жилая застройка и инженерная инфраструктура'
    ],
    gallery: [
      '/img/equipment/ktp-1.jpg',
      '/img/equipment/ktp-2.jpg',
      '/img/equipment/ktp-3.jpg',
      '/img/equipment/ktp-4.jpg'
    ],
    questionnaire: 'ktp',
    questionnaireFile: '/equipment/questionnaires/ktp-questionnaire.docx'
  },
  {
    slug: 'bktp',
    name: 'БКТП',
    eyebrow: 'Блочные подстанции',
    shortDescription: 'Блочные подстанции в готовой оболочке для комплексного электроснабжения жилых, коммерческих и промышленных объектов.',
    description: 'Блочные комплектные трансформаторные подстанции объединяют помещения распределительных устройств, трансформаторные отсеки и вспомогательные системы. Конфигурация определяется мощностью объекта, категорией электроснабжения, схемой распределения и условиями размещения.',
    applications: [
      'Жилые кварталы и объекты городской застройки',
      'Торговые, логистические и деловые комплексы',
      'Промышленные площадки и объекты генерации'
    ],
    gallery: [
      '/img/equipment/bktp-1.jpg',
      '/img/equipment/bktp-2.jpg',
      '/img/equipment/bktp-3.jpg',
      '/img/equipment/bktp-4.jpg'
    ],
    questionnaire: null,
    questionnaireFile: null
  },
  {
    slug: 'krun',
    name: 'КРУН',
    eyebrow: 'Наружное распределение',
    shortDescription: 'Комплектные распределительные устройства для приёма и распределения электроэнергии при установке на открытом воздухе.',
    description: 'КРУН формируется из функциональных ячеек с коммутационными аппаратами, устройствами защиты, измерения и учёта. При подборе учитываются схема главных соединений, номинальные параметры сети, исполнение вводов и выводов, а также условия эксплуатации.',
    applications: [
      'Распределительные подстанции и центры питания',
      'Промышленные площадки и добывающие объекты',
      'Наружные электроустановки инфраструктурных объектов'
    ],
    gallery: [
      '/img/equipment/krun-1.jpg',
      '/img/equipment/krun-2.jpg',
      '/img/equipment/krun-3.jpg',
      '/img/equipment/krun-4.jpg'
    ],
    questionnaire: 'krun',
    questionnaireFile: '/equipment/questionnaires/krun-questionnaire.docx'
  },
  {
    slug: 'krun-cells',
    name: 'Ячейки КРУН',
    eyebrow: 'Функциональные модули',
    shortDescription: 'Отдельные наружные ячейки для ввода, секционирования, распределения, защиты и измерения в сетях среднего напряжения.',
    description: 'Ячейка КРУН решает конкретную задачу в схеме распределительного устройства: принимает или передаёт электроэнергию, выполняет коммутацию, защищает присоединение либо обеспечивает измерение и учёт. Компоновка выбирается по однолинейной схеме и параметрам сети.',
    applications: [
      'Расширение действующих распределительных устройств',
      'Вводные, секционные и отходящие присоединения',
      'Узлы учёта, измерения и защиты наружной установки'
    ],
    gallery: [
      '/img/equipment/krun-cells-1.jpg',
      '/img/equipment/krun-cells-2.jpg'
    ],
    questionnaire: null,
    questionnaireFile: null
  },
  {
    slug: 'kso',
    name: 'КСО',
    eyebrow: 'Камеры обслуживания',
    shortDescription: 'Камеры сборные одностороннего обслуживания для комплектования распределительных устройств среднего напряжения.',
    description: 'КСО применяют для построения распределительных устройств внутри электротехнических помещений. Набор камер, главная схема, коммутационные аппараты, измерительные цепи и устройства защиты определяются параметрами сети и назначением каждого присоединения.',
    applications: [
      'Закрытые распределительные устройства подстанций',
      'Электроснабжение производственных предприятий',
      'Реконструкция и расширение существующих РУ'
    ],
    gallery: ['/img/equipment/kso-temporary.jpg'],
    questionnaire: 'kso',
    questionnaireFile: '/equipment/questionnaires/kso-questionnaire.docx'
  },
  {
    slug: 'kru',
    name: 'КРУ',
    eyebrow: 'Внутреннее распределение',
    shortDescription: 'Комплектные распределительные устройства для управления, защиты и распределения электроэнергии внутри помещений.',
    description: 'КРУ комплектуются ячейками различного назначения и позволяют сформировать распределительное устройство по однолинейной схеме объекта. При подборе учитываются номинальное напряжение и ток, ток короткого замыкания, тип коммутационного аппарата и состав релейной защиты.',
    applications: [
      'Главные понизительные и распределительные подстанции',
      'Энергоёмкие промышленные объекты',
      'Центры питания коммерческой и транспортной инфраструктуры'
    ],
    gallery: ['/img/equipment/kru-temporary.jpg'],
    questionnaire: null,
    questionnaireFile: null
  },
  {
    slug: 'yakno',
    name: 'ЯКНО',
    eyebrow: 'Отдельностоящие ячейки',
    shortDescription: 'Комплектные ячейки наружной установки для подключения и защиты отдельных высоковольтных потребителей.',
    description: 'ЯКНО используют как самостоятельный коммутационный и защитный пункт наружной установки. Состав оборудования подбирается по напряжению сети, мощности и характеру нагрузки, схеме подключения, способу прокладки кабеля и требованиям к перемещению установки.',
    applications: [
      'Карьерная, дробильная и насосная техника',
      'Временные и передвижные электроустановки',
      'Отдельные высоковольтные двигатели и трансформаторы'
    ],
    gallery: ['/img/equipment/yakno-temporary.jpg'],
    questionnaire: null,
    questionnaireFile: null
  },
  {
    slug: 'pku',
    name: 'ПКУ',
    eyebrow: 'Коммерческий учёт',
    shortDescription: 'Пункты коммерческого учёта для измерения электроэнергии на стороне среднего напряжения.',
    description: 'ПКУ объединяет измерительные трансформаторы, счётчик, защитные элементы и шкаф вторичных цепей. Конфигурация определяется номинальным напряжением, схемой подключения, требуемыми классами точности и способом передачи данных в систему учёта.',
    applications: [
      'Граница балансовой принадлежности сетей',
      'Учёт потребления промышленных и коммерческих объектов',
      'Узлы учёта на воздушных и кабельных линиях'
    ],
    gallery: ['/img/equipment/pku-temporary.jpg'],
    questionnaire: 'pku',
    questionnaireFile: '/equipment/questionnaires/pku-questionnaire.docx'
  },
  {
    slug: 'power-transformers',
    name: 'Силовые трансформаторы',
    eyebrow: 'Преобразование напряжения',
    shortDescription: 'Масляные и сухие трансформаторы для преобразования электроэнергии в сетях промышленных, инфраструктурных и гражданских объектов.',
    description: 'Силовой трансформатор выбирается по расчётной мощности, напряжениям обмоток, схеме и группе соединения, потерям, способу регулирования и условиям установки. Подбор выполняется с учётом электрической схемы и характера нагрузки объекта.',
    applications: [
      'Комплектные и распределительные подстанции',
      'Промышленные предприятия и центры обработки данных',
      'Объекты жилой, коммерческой и транспортной инфраструктуры'
    ],
    gallery: ['/img/equipment/transformers-temporary.jpg'],
    questionnaire: null,
    questionnaireFile: null
  },
  {
    slug: 'vru-shcho',
    name: 'ВРУ и панели ЩО',
    eyebrow: 'Низковольтное распределение',
    shortDescription: 'Вводные устройства и распределительные панели для приёма, учёта, защиты и распределения электроэнергии до 1 кВ.',
    description: 'ВРУ и панели ЩО комплектуются под однолинейную схему объекта, расчётные токи, количество отходящих линий, требования к учёту, резервированию и автоматическому вводу резерва. Состав секций определяется назначением и режимами работы электроустановки.',
    applications: [
      'Жилые и общественные здания',
      'Промышленные и складские объекты',
      'Распределительные пункты и трансформаторные подстанции'
    ],
    gallery: ['/img/equipment/vru-shcho-temporary.jpg'],
    questionnaire: null,
    questionnaireFile: null
  }
]

// Временные изображения подлежат замене на собственные фотографии.
// Здесь сохранены страницы-источники, с которых получены текущие файлы.
export const equipmentImageSources = [
  {
    asset: '/img/equipment/kso-temporary.jpg',
    sourceUrl: 'https://ktp-energo.ru/catalog/kamery-sbornye-odnostoronnego-obsluzhivaniya/',
    imageUrl: 'https://ktp-energo.ru/wp-content/uploads/2023/04/kso.jpg'
  },
  {
    asset: '/img/equipment/kru-temporary.jpg',
    sourceUrl: 'https://ktp-energo.ru/catalog/komplektnye-raspredelitelnye-ustrojstva/',
    imageUrl: 'https://ktp-energo.ru/wp-content/uploads/2023/04/kru.jpg'
  },
  {
    asset: '/img/equipment/yakno-temporary.jpg',
    sourceUrl: 'https://ktp-energo.ru/catalog/yachejka-komplektnaya-naruzhnoj-ustanovki-otdelnostoyashhaya/',
    imageUrl: 'https://ktp-energo.ru/wp-content/uploads/2023/04/yakno-2.jpg'
  },
  {
    asset: '/img/equipment/pku-temporary.jpg',
    sourceUrl: 'https://ktp-energo.ru/catalog/punkt-kommercheskogo-ucheta-elektroenergii/',
    imageUrl: 'https://ktp-energo.ru/wp-content/uploads/2023/04/pku.jpg'
  },
  {
    asset: '/img/equipment/transformers-temporary.jpg',
    sourceUrl: 'https://ktp-energo.ru/catalog/transformatory/',
    imageUrl: 'https://ktp-energo.ru/wp-content/uploads/2023/04/tmg.jpg'
  },
  {
    asset: '/img/equipment/vru-shcho-temporary.jpg',
    sourceUrl: 'https://ktp-energo.ru/catalog/nizkovoltnoe-oborudovanie/',
    imageUrl: 'https://ktp-energo.ru/wp-content/uploads/2023/04/shho-70.jpg'
  }
]
