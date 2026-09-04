export const equipmentQuestionnaires = {
  ktp: {
    title: 'Техническая анкета КТП',
    steps: [
      {
        title: 'Исполнение подстанции',
        description: 'Укажите конструкцию и способ подключения КТП.',
        fields: [
          {
            key: 'transformerCount',
            label: 'Количество силовых трансформаторов',
            type: 'number',
            required: true,
            placeholder: 'Например, 1 или 2'
          },
          {
            key: 'housingMaterial',
            label: 'Материал корпуса',
            type: 'select',
            required: true,
            options: ['Металл', 'Сэндвич-панели (утеплённая)', 'Бетон', 'Другое']
          },
          {
            key: 'stationCircuit',
            label: 'Тип подстанции по схеме',
            type: 'select',
            required: true,
            options: ['Тупиковая', 'Проходная']
          },
          {
            key: 'hvInput',
            label: 'Исполнение ввода ВН',
            type: 'select',
            required: true,
            options: ['Воздушный', 'Кабельный', 'Воздушно-кабельный']
          },
          {
            key: 'lvOutput',
            label: 'Исполнение вывода НН',
            type: 'select',
            required: true,
            options: ['Воздушный', 'Кабельный', 'Воздушно-кабельный']
          },
          {
            key: 'serviceCorridor',
            label: 'Коридор обслуживания',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          }
        ]
      },
      {
        title: 'Силовые трансформаторы',
        description: 'Основные электрические параметры и состав поставки.',
        fields: [
          {
            key: 'transformerPower',
            label: 'Мощность каждого трансформатора, кВА',
            type: 'select',
            required: true,
            options: ['25', '40', '63', '100', '160', '250', '400', '630', '1000', '1250', '1600', '2500', 'Другая']
          },
          {
            key: 'transformerType',
            label: 'Тип силового трансформатора',
            type: 'select',
            required: true,
            options: ['ТМ', 'ТМГ', 'ТЛС', 'ТСЛ', 'Другой', 'Нужно подобрать']
          },
          {
            key: 'connectionGroup',
            label: 'Схема и группа соединения обмоток',
            type: 'select',
            options: ['Y/Yn-0', 'D/Yn-11', 'Y/Zn-11', 'Другая', 'Нужно определить']
          },
          {
            key: 'hvVoltage',
            label: 'Номинальное напряжение РУВН, кВ',
            type: 'select',
            required: true,
            options: ['6', '10', 'Другое']
          },
          {
            key: 'lvVoltage',
            label: 'Номинальное напряжение РУНН, кВ',
            type: 'select',
            required: true,
            options: ['0,4', 'Другое']
          },
          {
            key: 'transformerSupply',
            label: 'Включить трансформаторы в поставку',
            type: 'select',
            required: true,
            options: ['Да', 'Нет', 'Нужно определить']
          }
        ]
      },
      {
        title: 'Сторона высокого напряжения',
        description: 'Коммутационные аппараты, защита и измерение на стороне ВН.',
        fields: [
          {
            key: 'hvSwitchgear',
            label: 'Коммутационный аппарат на вводе ВН',
            type: 'select',
            required: true,
            options: ['ВНР', 'ВНА', 'ВНП', 'РВЗ', 'РЛНД', 'Другой', 'Нужно подобрать']
          },
          {
            key: 'hvSwitchgearQuantity',
            label: 'Количество аппаратов на стороне ВН, шт.',
            type: 'number',
            placeholder: 'Укажите количество'
          },
          {
            key: 'airInputDisconnector',
            label: 'Разъединитель при воздушном вводе',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'airInputDisconnectorType',
            label: 'Тип или марка разъединителя',
            type: 'text',
            placeholder: 'Если определены проектом'
          },
          {
            key: 'hvSurgeProtection',
            label: 'Ограничители перенапряжения на стороне ВН',
            type: 'select',
            options: ['ОПН', 'РВО', 'РВН', 'Не требуются', 'Другие', 'Нужно подобрать']
          },
          {
            key: 'hvFuses',
            label: 'Высоковольтные предохранители: номинал и количество',
            type: 'text',
            placeholder: 'Например, 40 А — 3 шт.'
          },
          {
            key: 'hvMetering',
            label: 'Учёт на стороне ВН',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          }
        ]
      },
      {
        title: 'Сторона низкого напряжения',
        description: 'Ввод, секционирование, отходящие линии и дополнительные функции РУНН.',
        fields: [
          {
            key: 'lvIncomingDevice',
            label: 'Вводной коммутационный аппарат 0,4 кВ',
            type: 'select',
            required: true,
            options: ['Автоматический выключатель', 'Разъединитель', 'Разъединитель и автоматический выключатель', 'Другой', 'Нужно подобрать']
          },
          {
            key: 'lvIncomingCurrent',
            label: 'Номинальный ток вводного аппарата, А',
            type: 'number',
            placeholder: 'Укажите расчётный ток'
          },
          {
            key: 'sectionDevice',
            label: 'Секционный аппарат для двухтрансформаторной КТП',
            type: 'select',
            options: ['Автоматический выключатель', 'Разъединитель', 'Не требуется', 'Другой', 'Нужно подобрать']
          },
          {
            key: 'currentTransformers',
            label: 'Трансформаторы тока для учёта и измерения',
            type: 'textarea',
            placeholder: 'Тип, коэффициент трансформации, класс точности и количество'
          },
          {
            key: 'electricityMetering',
            label: 'Учёт электроэнергии',
            type: 'textarea',
            placeholder: 'Активный или активно-реактивный учёт, тип и количество счётчиков'
          },
          {
            key: 'outgoingLines',
            label: 'Отходящие линии 0,4 кВ',
            type: 'textarea',
            required: true,
            placeholder: 'Количество линий, типы аппаратов и номинальные токи фидеров'
          },
          {
            key: 'earthFaultProtection',
            label: 'Защита от замыкания на землю',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'streetLighting',
            label: 'Фидер уличного освещения',
            type: 'select',
            options: ['Не требуется', 'С фотореле', 'С реле времени', 'Другое']
          },
          {
            key: 'automaticTransfer',
            label: 'АВР для двухтрансформаторной КТП',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'additionalRequirements',
            label: 'Дополнительные технические требования',
            type: 'textarea',
            placeholder: 'Укажите особые требования к комплектации и исполнению'
          }
        ]
      }
    ]
  },
  krun: {
    title: 'Техническая анкета КРУН',
    steps: [
      {
        title: 'Схема и основные параметры',
        description: 'Исходные данные для компоновки распределительного устройства.',
        fields: [
          {
            key: 'inputOutputExecution',
            label: 'Исполнение вводов и выводов',
            type: 'select',
            required: true,
            options: ['Кабель / кабель', 'Кабель / воздух', 'Воздух / воздух', 'Воздух / кабель']
          },
          {
            key: 'executionType',
            label: 'Обозначение или требуемый тип исполнения',
            type: 'text',
            placeholder: 'Если указан в проекте'
          },
          {
            key: 'mainCircuit',
            label: 'Номер или описание схемы главных соединений',
            type: 'text',
            required: true,
            placeholder: 'Номер типовой схемы либо краткое описание'
          },
          {
            key: 'ratedVoltage',
            label: 'Номинальное напряжение, кВ',
            type: 'select',
            required: true,
            options: ['6', '10', 'Другое']
          },
          {
            key: 'ratedCurrent',
            label: 'Номинальный ток ячейки и выключателя, А',
            type: 'select',
            required: true,
            options: ['630', '1000', '1250', '1600', 'Другой']
          },
          {
            key: 'cellQuantity',
            label: 'Общее количество ячеек, шт.',
            type: 'number',
            required: true,
            placeholder: 'Укажите количество'
          }
        ]
      },
      {
        title: 'Коммутация и измерение',
        description: 'Состав высоковольтного и измерительного оборудования.',
        fields: [
          {
            key: 'breakerType',
            label: 'Тип выключателя',
            type: 'select',
            required: true,
            options: ['Вакуумный', 'Элегазовый', 'Другой', 'Нужно подобрать']
          },
          {
            key: 'currentTransformerRatedCurrent',
            label: 'Номинальный ток трансформаторов тока, А',
            type: 'text',
            placeholder: 'Например, 200/5'
          },
          {
            key: 'currentTransformerQuantity',
            label: 'Количество трансформаторов тока, шт.',
            type: 'number',
            placeholder: 'Укажите количество'
          },
          {
            key: 'currentTransformerAccuracy',
            label: 'Класс точности трансформаторов тока',
            type: 'text',
            placeholder: 'Для измерения, учёта и защиты'
          },
          {
            key: 'auxiliaryTransformer',
            label: 'Трансформатор собственных нужд',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'voltageTransformer',
            label: 'Трансформатор напряжения',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'inputSurgeProtection',
            label: 'Ограничители перенапряжения на вводе',
            type: 'select',
            options: ['Требуются', 'Не требуются', 'Нужно определить']
          },
          {
            key: 'outputSurgeProtection',
            label: 'Ограничители перенапряжения на выводе',
            type: 'select',
            options: ['Требуются', 'Не требуются', 'Нужно определить']
          }
        ]
      },
      {
        title: 'Защита и автоматика',
        description: 'Функции релейной защиты, автоматики и коммерческого учёта.',
        fields: [
          {
            key: 'earthFaultProtection',
            label: 'Защита от замыкания на землю по 3I0',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'groundConductorBreakProtection',
            label: 'Защита от обрыва заземляющей жилы',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'microprocessorProtection',
            label: 'Тип микропроцессорной защиты',
            type: 'text',
            placeholder: 'Тип устройства или требуемые функции'
          },
          {
            key: 'undervoltageProtection',
            label: 'Защита минимального напряжения',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'meterType',
            label: 'Тип счётчика электроэнергии',
            type: 'text',
            placeholder: 'Если определён проектом'
          },
          {
            key: 'meterModem',
            label: 'Модем для передачи данных',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'autoreclosing',
            label: 'Автоматическое повторное включение',
            type: 'select',
            options: ['Однократное', 'Двукратное', 'Не требуется', 'Нужно определить']
          }
        ]
      },
      {
        title: 'Кабели и конструкция',
        description: 'Требования к подключению и наружному исполнению.',
        fields: [
          {
            key: 'cableQuantityAndSection',
            label: 'Количество и сечение кабелей',
            type: 'textarea',
            required: true,
            placeholder: 'По каждому вводу и отходящему присоединению'
          },
          {
            key: 'rigidCouplingSkids',
            label: 'Салазки с жёсткой сцепкой',
            type: 'select',
            options: ['Требуются', 'Не требуются', 'Нужно определить']
          },
          {
            key: 'airConnectionFence',
            label: 'Ограждение при воздушном вводе или выводе',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'additionalRequirements',
            label: 'Дополнительные технические требования',
            type: 'textarea',
            placeholder: 'Укажите требования проекта, особенности площадки и комплектации'
          }
        ]
      }
    ]
  },
  kso: {
    title: 'Техническая анкета КСО',
    steps: [
      {
        title: 'Конфигурация РУ',
        description: 'Параметры сети и состав камер для однолинейной схемы.',
        fields: [
          {
            key: 'ksoSeries',
            label: 'Серия или конструктив КСО',
            type: 'select',
            options: ['Серия 200', 'Серия 300', 'Другая', 'Нужно подобрать']
          },
          {
            key: 'mainCircuit',
            label: 'Номер или описание схемы главных соединений',
            type: 'text',
            required: true,
            placeholder: 'Номер типовой схемы либо краткое описание'
          },
          {
            key: 'ratedVoltage',
            label: 'Номинальное напряжение, кВ',
            type: 'select',
            required: true,
            options: ['6', '10', 'Другое']
          },
          {
            key: 'busbarRatedCurrent',
            label: 'Номинальный ток сборных шин, А',
            type: 'select',
            required: true,
            options: ['630', '1000', '1250', '1600', '2000', 'Другой']
          },
          {
            key: 'shortCircuitCurrent',
            label: 'Ток термической стойкости, кА',
            type: 'number',
            placeholder: 'По проекту или расчёту'
          },
          {
            key: 'cellQuantity',
            label: 'Количество камер, шт.',
            type: 'number',
            required: true,
            placeholder: 'Общее количество'
          },
          {
            key: 'layout',
            label: 'Расположение камер',
            type: 'select',
            options: ['В один ряд', 'В два ряда', 'По плану помещения', 'Нужно определить']
          }
        ]
      },
      {
        title: 'Вводы и присоединения',
        description: 'Коммутационные аппараты и компоновка присоединений.',
        fields: [
          {
            key: 'inputExecution',
            label: 'Исполнение ввода',
            type: 'select',
            required: true,
            options: ['Кабельный снизу', 'Кабельный сверху', 'Шинный', 'Другое']
          },
          {
            key: 'inputDevice',
            label: 'Коммутационный аппарат вводной камеры',
            type: 'select',
            required: true,
            options: ['Вакуумный выключатель', 'Выключатель нагрузки', 'Разъединитель', 'Другой', 'Нужно подобрать']
          },
          {
            key: 'sectionDevice',
            label: 'Коммутационный аппарат секционной камеры',
            type: 'select',
            options: ['Вакуумный выключатель', 'Выключатель нагрузки', 'Разъединитель', 'Секционная камера не требуется', 'Другой']
          },
          {
            key: 'outgoingCells',
            label: 'Отходящие присоединения',
            type: 'textarea',
            required: true,
            placeholder: 'Количество, назначение, номинальный ток и аппарат каждой камеры'
          },
          {
            key: 'busbarMaterialAndSection',
            label: 'Материал и сечение сборных шин',
            type: 'text',
            placeholder: 'Если определены проектом'
          },
          {
            key: 'earthingSwitches',
            label: 'Заземляющие ножи',
            type: 'select',
            options: ['Предусмотреть', 'Не требуются', 'По типовой схеме', 'Нужно определить']
          }
        ]
      },
      {
        title: 'Учёт, измерение и защита',
        description: 'Вторичные цепи и функции каждой группы камер.',
        fields: [
          {
            key: 'currentTransformers',
            label: 'Трансформаторы тока',
            type: 'textarea',
            placeholder: 'Коэффициенты, классы точности, нагрузки и количество'
          },
          {
            key: 'voltageTransformers',
            label: 'Трансформаторы напряжения',
            type: 'textarea',
            placeholder: 'Тип, схема и классы точности'
          },
          {
            key: 'relayProtection',
            label: 'Релейная защита и автоматика',
            type: 'textarea',
            placeholder: 'Функции защиты, автоматики и сигнализации'
          },
          {
            key: 'metering',
            label: 'Коммерческий и технический учёт',
            type: 'textarea',
            placeholder: 'Типы счётчиков и камеры установки'
          },
          {
            key: 'auxiliaryVoltage',
            label: 'Напряжение оперативных цепей',
            type: 'select',
            options: ['220 В переменного тока', '220 В постоянного тока', '110 В постоянного тока', 'Другое', 'Нужно определить']
          },
          {
            key: 'arcProtection',
            label: 'Дуговая защита',
            type: 'select',
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          }
        ]
      },
      {
        title: 'Условия размещения',
        description: 'Конструктивные и эксплуатационные требования к камерам.',
        fields: [
          {
            key: 'climateExecution',
            label: 'Климатическое исполнение и категория размещения',
            type: 'text',
            placeholder: 'По проекту и условиям помещения'
          },
          {
            key: 'enclosureProtection',
            label: 'Требуемая степень защиты оболочки',
            type: 'text',
            placeholder: 'Например, IP31'
          },
          {
            key: 'heatingAndLighting',
            label: 'Обогрев и внутреннее освещение',
            type: 'select',
            options: ['Требуются оба', 'Только обогрев', 'Только освещение', 'Не требуются', 'Нужно определить']
          },
          {
            key: 'cableParameters',
            label: 'Количество и сечение подключаемых кабелей',
            type: 'textarea',
            placeholder: 'Для вводов и отходящих линий'
          },
          {
            key: 'additionalRequirements',
            label: 'Дополнительные технические требования',
            type: 'textarea',
            placeholder: 'Габариты, блокировки, цвет, маркировка и другие требования проекта'
          }
        ]
      }
    ]
  },
  pku: {
    title: 'Техническая анкета ПКУ',
    steps: [
      {
        title: 'Основные параметры',
        description: 'Схема включения и исполнение пункта коммерческого учёта.',
        fields: [
          {
            key: 'ratedVoltage',
            label: 'Номинальное напряжение, кВ',
            type: 'select',
            required: true,
            options: ['6', '10']
          },
          {
            key: 'meterConnection',
            label: 'Схема подключения счётчика',
            type: 'select',
            required: true,
            options: ['3 ТТ + 3 ТН', '2 ТТ + 3 ТН', '2 ТТ + 2 ТН', 'Другая']
          },
          {
            key: 'meterCabinetLocation',
            label: 'Расположение шкафа учёта',
            type: 'select',
            required: true,
            options: ['На опоре', 'Отдельностоящий', 'В помещении', 'Другое']
          },
          {
            key: 'deviceQuantity',
            label: 'Количество заказываемых устройств, шт.',
            type: 'number',
            required: true,
            placeholder: 'Укажите количество'
          }
        ]
      },
      {
        title: 'Измерительные цепи',
        description: 'Параметры трансформаторов тока, напряжения и счётчика.',
        fields: [
          {
            key: 'voltageTransformerAccuracy',
            label: 'Класс точности измерительной обмотки ТН',
            type: 'select',
            required: true,
            options: ['0,2', '0,5', 'Другой']
          },
          {
            key: 'currentTransformerPrimaryCurrent',
            label: 'Номинальный первичный ток ТТ, А',
            type: 'select',
            required: true,
            options: ['5', '10', '15', '20', '50', '75', '100', '150', '200', '300', '400', '600', 'Другой']
          },
          {
            key: 'currentTransformerAccuracy',
            label: 'Класс точности измерительной обмотки ТТ',
            type: 'select',
            required: true,
            options: ['0,2S', '0,5S', '0,2', '0,5', 'Другой']
          },
          {
            key: 'meterType',
            label: 'Тип счётчика электроэнергии',
            type: 'text',
            required: true,
            placeholder: 'Укажите тип или требования сетевой организации'
          },
          {
            key: 'surgeProtectionSets',
            label: 'Количество комплектов ограничителей перенапряжения',
            type: 'select',
            options: ['1 комплект', '2 комплекта', 'Не требуются', 'Нужно определить']
          }
        ]
      },
      {
        title: 'Передача данных и поставка',
        description: 'Интеграция в систему учёта и условия получения оборудования.',
        fields: [
          {
            key: 'gsmDataTransfer',
            label: 'Передача данных по GSM',
            type: 'select',
            required: true,
            options: ['Требуется', 'Не требуется', 'Нужно определить']
          },
          {
            key: 'communicationPort',
            label: 'Порт связи',
            type: 'select',
            options: ['RS-485', 'RS-232', 'Токовая петля', 'Несколько интерфейсов', 'Другой', 'Нужно определить']
          },
          {
            key: 'askueRequirements',
            label: 'Требования к интеграции в АСКУЭ',
            type: 'textarea',
            placeholder: 'Протокол, оператор связи, система верхнего уровня и другие условия'
          },
          {
            key: 'deliveryMethod',
            label: 'Предпочтительный способ получения',
            type: 'select',
            options: ['Самовывоз', 'Доставка до объекта', 'Нужно согласовать']
          },
          {
            key: 'additionalRequirements',
            label: 'Дополнительные технические требования',
            type: 'textarea',
            placeholder: 'Укажите требования проекта и сетевой организации'
          }
        ]
      }
    ]
  }
}
