export interface PricingPlan {
  id: string
  name: string
  price: number
  sessions: number
  validDays: number
  perSession?: number
  features: string[]
  isPopular: boolean
  isTrial: boolean
  type: 'individual' | 'group'
}

export const individualPricing: PricingPlan[] = [
  {
    id: 'trial-individual',
    name: 'Пробное занятие',
    price: 1500,
    sessions: 1,
    validDays: 14,
    features: [
      'Знакомство с методикой',
      'Оценка состояния тела',
      'Рекомендации по программе',
    ],
    isPopular: false,
    isTrial: true,
    type: 'individual',
  },
  {
    id: 'single-individual',
    name: 'Разовое занятие',
    price: 4000,
    sessions: 1,
    validDays: 30,
    features: [
      'Персональная тренировка',
      'Индивидуальный подход',
      'Работа над техникой',
    ],
    isPopular: false,
    isTrial: false,
    type: 'individual',
  },
  {
    id: 'subscription-8',
    name: 'Абонемент на 8 занятий',
    price: 28000,
    sessions: 8,
    validDays: 45,
    perSession: 3500,
    features: [
      '8 персональных тренировок',
      'Экономия 12%',
      'Гибкий график',
      'Заморозка до 7 дней',
    ],
    isPopular: true,
    isTrial: false,
    type: 'individual',
  },
  {
    id: 'subscription-12',
    name: 'Абонемент на 12 занятий',
    price: 38400,
    sessions: 12,
    validDays: 60,
    perSession: 3200,
    features: [
      '12 персональных тренировок',
      'Экономия 20%',
      'Гибкий график',
      'Заморозка до 14 дней',
      'Приоритетная запись',
    ],
    isPopular: false,
    isTrial: false,
    type: 'individual',
  },
]

export const groupPricing: PricingPlan[] = [
  {
    id: 'trial-group',
    name: 'Пробное занятие',
    price: 800,
    sessions: 1,
    validDays: 14,
    features: [
      'Знакомство с группой',
      'Оценка уровня подготовки',
    ],
    isPopular: false,
    isTrial: true,
    type: 'group',
  },
  {
    id: 'single-group',
    name: 'Разовое занятие',
    price: 1500,
    sessions: 1,
    validDays: 30,
    features: [
      'Одно групповое занятие',
      'Мини-группа до 6 человек',
    ],
    isPopular: false,
    isTrial: false,
    type: 'group',
  },
  {
    id: 'subscription-group-8',
    name: 'Абонемент на 8 занятий',
    price: 9600,
    sessions: 8,
    validDays: 45,
    perSession: 1200,
    features: [
      '8 групповых тренировок',
      'Экономия 20%',
      'Заморозка до 7 дней',
    ],
    isPopular: true,
    isTrial: false,
    type: 'group',
  },
  {
    id: 'subscription-group-unlimited',
    name: 'Безлимит на месяц',
    price: 12000,
    sessions: 999,
    validDays: 30,
    features: [
      'Неограниченное посещение',
      'Все групповые форматы',
      'Приоритетная запись',
    ],
    isPopular: false,
    isTrial: false,
    type: 'group',
  },
]

export const allPricing = [...individualPricing, ...groupPricing]
