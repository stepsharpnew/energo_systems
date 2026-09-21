export const generatorQuizQuestions = [
  {
    id: 'loads',
    title: 'Что должно работать при отключении света?',
    description: 'Можно выбрать несколько вариантов',
    multiple: true,
    exclusiveOption: 'whole-house',
    options: [
      { id: 'lights', label: 'Свет и розетки' },
      { id: 'heating', label: 'Котёл отопления и насосы' },
      { id: 'water', label: 'Скважина / водоснабжение' },
      { id: 'kitchen', label: 'Кухня: плита, духовка' },
      { id: 'climate', label: 'Кондиционеры, тёплые полы' },
      { id: 'whole-house', label: 'Весь дом полностью' },
    ],
  },
  {
    id: 'area',
    title: 'Какая площадь дома?',
    description: 'Выберите один вариант',
    options: [
      { id: 'under-100', label: 'До 100 м²' },
      { id: '100-200', label: '100–200 м²' },
      { id: '200-300', label: '200–300 м²' },
      { id: 'over-300', label: 'Больше 300 м²' },
    ],
  },
  {
    id: 'fuel',
    title: 'На каком топливе удобнее?',
    description: 'Выберите один вариант',
    options: [
      { id: 'gas', label: 'Магистральный газ на участке' },
      { id: 'propane', label: 'Пропан: газгольдер или баллоны' },
      { id: 'petrol', label: 'Бензин' },
      { id: 'help', label: 'Подберите самый выгодный' },
    ],
  },
  {
    id: 'timing',
    title: 'Когда нужна установка?',
    description: 'Выберите один вариант',
    options: [
      { id: 'week', label: 'В течение недели' },
      { id: 'month', label: 'В течение месяца' },
      { id: 'quarter', label: 'Через 1–3 месяца' },
      { id: 'exploring', label: 'Пока изучаю варианты' },
    ],
  },
]
