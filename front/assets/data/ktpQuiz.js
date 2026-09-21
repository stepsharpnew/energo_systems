import { equipmentQuestionnaires } from './equipmentQuestionnaires.js'

// Keep the existing engineering labels and values as the API's source of truth.
export const ktpFields = equipmentQuestionnaires.ktp.steps.flatMap((step) => step.fields)
const byKey = Object.fromEntries(ktpFields.map((field) => [field.key, field]))
const fields = (keys) => keys.map((key) => byKey[key])

export const ktpQuizSteps = [
  {
    shortTitle: 'Исполнение',
    title: 'Какое исполнение КТП вам нужно?',
    description: 'Выберите количество трансформаторов и материал корпуса.',
    fields: fields(['transformerCount', 'housingMaterial']),
  },
  {
    shortTitle: 'Подключение',
    title: 'Как подключить подстанцию?',
    description: 'Укажите схему и способы подключения на стороне ВН и НН.',
    fields: fields(['stationCircuit', 'hvInput', 'lvOutput']),
    details: fields(['serviceCorridor']),
    detailsTitle: 'Коридор обслуживания',
  },
  {
    shortTitle: 'Трансформаторы',
    title: 'Какие трансформаторы нужны?',
    description: 'Выберите мощность каждого трансформатора и его тип.',
    fields: fields(['transformerPower', 'transformerType']),
    details: fields(['connectionGroup']),
    detailsTitle: 'Схема и группа соединения обмоток',
  },
  {
    shortTitle: 'Комплектация',
    title: 'Напряжение и состав поставки',
    description: 'Укажите параметры РУВН и РУНН, а также необходимость поставки трансформаторов.',
    fields: fields(['hvVoltage', 'lvVoltage', 'transformerSupply']),
  },
  {
    shortTitle: 'Сторона ВН',
    title: 'Оборудование на стороне ВН',
    description: 'Выберите вводной аппарат. Если тип неизвестен, поможем с подбором.',
    fields: fields(['hvSwitchgear']),
    details: fields(['hvSwitchgearQuantity', 'airInputDisconnector', 'airInputDisconnectorType', 'hvSurgeProtection', 'hvFuses', 'hvMetering']),
    detailsTitle: 'Защита, учёт и дополнительные параметры ВН',
  },
  {
    shortTitle: 'Сторона НН',
    title: 'Распределение на стороне НН',
    description: 'Укажите вводной аппарат и параметры отходящих линий 0,4 кВ.',
    fields: fields(['lvIncomingDevice', 'outgoingLines']),
    details: fields(['lvIncomingCurrent', 'sectionDevice', 'currentTransformers', 'electricityMetering', 'earthFaultProtection', 'streetLighting', 'automaticTransfer', 'additionalRequirements']),
    detailsTitle: 'Учёт, автоматика и дополнительные требования',
  },
]

export const ktpChoiceDescriptions = {
  housingMaterial: {
    'Металл': { description: 'Металлический корпус' },
    'Сэндвич-панели (утеплённая)': { label: 'Сэндвич-панели', description: 'Утеплённый корпус' },
    'Бетон': { description: 'Бетонный корпус' },
    'Другое': { description: 'Уточним по вашему проекту' },
  },
}
