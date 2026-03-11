export interface ScheduleSlot {
  id: string
  day: string
  dayShort: string
  time: string
  type: 'individual' | 'group'
  title: string
  spotsTotal?: number
  spotsLeft?: number
}

export const weekDays = [
  { full: 'Понедельник', short: 'Пн' },
  { full: 'Вторник', short: 'Вт' },
  { full: 'Среда', short: 'Ср' },
  { full: 'Четверг', short: 'Чт' },
  { full: 'Пятница', short: 'Пт' },
  { full: 'Суббота', short: 'Сб' },
  { full: 'Воскресенье', short: 'Вс' },
]

export const schedule: ScheduleSlot[] = [
  // Понедельник
  {
    id: 'mon-1',
    day: 'Понедельник',
    dayShort: 'Пн',
    time: '09:00',
    type: 'group',
    title: 'Пилатес для начинающих',
    spotsTotal: 6,
    spotsLeft: 2,
  },
  {
    id: 'mon-2',
    day: 'Понедельник',
    dayShort: 'Пн',
    time: '11:00',
    type: 'individual',
    title: 'Индивидуальное занятие',
  },
  {
    id: 'mon-3',
    day: 'Понедельник',
    dayShort: 'Пн',
    time: '18:00',
    type: 'group',
    title: 'Пилатес после работы',
    spotsTotal: 6,
    spotsLeft: 4,
  },
  // Вторник
  {
    id: 'tue-1',
    day: 'Вторник',
    dayShort: 'Вт',
    time: '10:00',
    type: 'individual',
    title: 'Индивидуальное занятие',
  },
  {
    id: 'tue-2',
    day: 'Вторник',
    dayShort: 'Вт',
    time: '12:00',
    type: 'group',
    title: 'Пилатес для беременных',
    spotsTotal: 4,
    spotsLeft: 1,
  },
  {
    id: 'tue-3',
    day: 'Вторник',
    dayShort: 'Вт',
    time: '19:00',
    type: 'group',
    title: 'Средний уровень',
    spotsTotal: 6,
    spotsLeft: 3,
  },
  // Среда
  {
    id: 'wed-1',
    day: 'Среда',
    dayShort: 'Ср',
    time: '09:00',
    type: 'group',
    title: 'Пилатес для начинающих',
    spotsTotal: 6,
    spotsLeft: 5,
  },
  {
    id: 'wed-2',
    day: 'Среда',
    dayShort: 'Ср',
    time: '11:00',
    type: 'individual',
    title: 'Индивидуальное занятие',
  },
  {
    id: 'wed-3',
    day: 'Среда',
    dayShort: 'Ср',
    time: '17:00',
    type: 'individual',
    title: 'Индивидуальное занятие',
  },
  // Четверг
  {
    id: 'thu-1',
    day: 'Четверг',
    dayShort: 'Чт',
    time: '10:00',
    type: 'group',
    title: 'Пилатес для беременных',
    spotsTotal: 4,
    spotsLeft: 2,
  },
  {
    id: 'thu-2',
    day: 'Четверг',
    dayShort: 'Чт',
    time: '18:00',
    type: 'group',
    title: 'Пилатес после работы',
    spotsTotal: 6,
    spotsLeft: 0,
  },
  // Пятница
  {
    id: 'fri-1',
    day: 'Пятница',
    dayShort: 'Пт',
    time: '09:00',
    type: 'individual',
    title: 'Индивидуальное занятие',
  },
  {
    id: 'fri-2',
    day: 'Пятница',
    dayShort: 'Пт',
    time: '11:00',
    type: 'group',
    title: 'Средний уровень',
    spotsTotal: 6,
    spotsLeft: 4,
  },
  {
    id: 'fri-3',
    day: 'Пятница',
    dayShort: 'Пт',
    time: '17:00',
    type: 'individual',
    title: 'Индивидуальное занятие',
  },
  // Суббота
  {
    id: 'sat-1',
    day: 'Суббота',
    dayShort: 'Сб',
    time: '10:00',
    type: 'group',
    title: 'Выходной пилатес',
    spotsTotal: 6,
    spotsLeft: 3,
  },
  {
    id: 'sat-2',
    day: 'Суббота',
    dayShort: 'Сб',
    time: '12:00',
    type: 'individual',
    title: 'Индивидуальное занятие',
  },
]

export function getScheduleByDay(day: string): ScheduleSlot[] {
  return schedule.filter((slot) => slot.day === day)
}

export function getGroupClasses(): ScheduleSlot[] {
  return schedule.filter((slot) => slot.type === 'group')
}
