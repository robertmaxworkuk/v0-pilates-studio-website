export interface WorkingHours {
  day: string
  hours: string
}

export interface SocialLink {
  platform: string
  url: string
  icon?: string
}

export interface StudioInfo {
  name: string
  address: string
  metro: string
  phone: string
  email: string
  workingHours: WorkingHours[]
  socialLinks: SocialLink[]
  mapUrl?: string
  description: string
  features: string[]
}

export const studioInfo: StudioInfo = {
  name: 'Студия пилатеса Ксении',
  address: 'ул. Примерная, д. 123, офис 45',
  metro: 'м. Центральная',
  phone: '+79001234567',
  email: 'studio@example.com',
  workingHours: [
    { day: 'Понедельник', hours: '09:00 – 21:00' },
    { day: 'Вторник', hours: '09:00 – 21:00' },
    { day: 'Среда', hours: '09:00 – 21:00' },
    { day: 'Четверг', hours: '09:00 – 21:00' },
    { day: 'Пятница', hours: '09:00 – 20:00' },
    { day: 'Суббота', hours: '10:00 – 15:00' },
    { day: 'Воскресенье', hours: 'Выходной' },
  ],
  socialLinks: [
    { platform: 'Telegram', url: 'https://t.me/example' },
    { platform: 'WhatsApp', url: 'https://wa.me/79001234567' },
    { platform: 'Instagram', url: 'https://instagram.com/example' },
  ],
  description: `Уютная студия в центре города с профессиональным оборудованием для пилатеса. 
Здесь создана атмосфера спокойствия и концентрации — всё для того, чтобы вы могли полностью погрузиться в практику.`,
  features: [
    'Профессиональное оборудование Balanced Body',
    'Просторный светлый зал',
    'Раздевалка с душем',
    'Чай и вода для гостей',
    'Удобная парковка рядом',
    'Тихий район без шума',
  ],
}

export const benefits = [
  {
    id: '1',
    title: 'Здоровая спина',
    description: 'Пилатес укрепляет глубокие мышцы, поддерживающие позвоночник, и помогает избавиться от болей в спине.',
    icon: 'spine',
  },
  {
    id: '2',
    title: 'Красивая осанка',
    description: 'Регулярные занятия формируют правильную осанку и грациозные движения.',
    icon: 'posture',
  },
  {
    id: '3',
    title: 'Гибкость и сила',
    description: 'Сочетание растяжки и силовых упражнений делает тело одновременно гибким и сильным.',
    icon: 'flexibility',
  },
  {
    id: '4',
    title: 'Снятие стресса',
    description: 'Осознанное дыхание и плавные движения помогают расслабиться и снять напряжение.',
    icon: 'relax',
  },
  {
    id: '5',
    title: 'Подтянутое тело',
    description: 'Пилатес формирует длинные, подтянутые мышцы без излишнего объёма.',
    icon: 'body',
  },
  {
    id: '6',
    title: 'Для любого возраста',
    description: 'Безопасная система тренировок, которая подходит людям любого возраста и уровня подготовки.',
    icon: 'all-ages',
  },
]
