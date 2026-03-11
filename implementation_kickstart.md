# Implementation Kickstart: Pilates Studio Landing Page

## Scope & Constraints

### Project Type
- **Frontend-only** single-page landing (no backend, no database)
- **Primary CTA**: "Записаться на пробное занятие" (единая по всей странице)
- **Tech Stack**: Next.js 16, React, TypeScript, Tailwind CSS, shadcn/ui
- **Mobile-first**: все компоненты адаптивны

### Design Constraints
- Цветовая палитра: taupe, rose, clay, ivory (muted tones, без ярко-зеленого)
- Типографика: editorial-style, премиум, спокойный
- Анимации: subtle fade-in on scroll, hover-эффекты (не навязчивые)
- Фотографии: placeholder-структура для легкой замены реальными фото

### Data Constraints
- Тренер: Ксения, 15 лет опыта, сертификаты школы Елены Волковой, 10 лет тренер пилатеса
- Отзывы: шаблонные (будут заменены реальными)
- Контакты студии: шаблонные (будут заменены реальными)

---

## Route Breakdown

| Route | Description |
|-------|-------------|
| `/` | Главная и единственная страница (single-page landing) |

Все секции на одной странице с якорной навигацией:
- `#hero` — Hero секция
- `#about` — О тренере
- `#method` — Методика
- `#benefits` — Преимущества пилатеса
- `#programs` — Программы тренировок
- `#pricing` — Цены и абонементы
- `#schedule` — Расписание
- `#testimonials` — Отзывы
- `#faq` — FAQ
- `#studio` — Студия
- `#contact` — Контакты

---

## Component Inventory

### Layout Components (`/components/layout/`)
| Component | Description |
|-----------|-------------|
| `header.tsx` | Sticky header с навигацией, логотип, CTA кнопка |
| `mobile-nav.tsx` | Sheet/drawer мобильное меню |
| `footer.tsx` | Подвал с контактами, ссылками, copyright |
| `section-wrapper.tsx` | Обертка секций с padding, max-width, анимацией |

### Section Components (`/components/sections/`)
| Component | Description |
|-----------|-------------|
| `hero-section.tsx` | Editorial hero с фото, заголовком, CTA |
| `about-section.tsx` | О тренере Ксении с фото и credentials |
| `method-section.tsx` | Философия и методика обучения |
| `benefits-section.tsx` | Сетка преимуществ пилатеса |
| `programs-section.tsx` | Карточки программ (индивидуальные, групповые, онлайн) |
| `pricing-section.tsx` | Тарифы и абонементы |
| `schedule-section.tsx` | Расписание занятий |
| `testimonials-section.tsx` | Слайдер/сетка отзывов |
| `faq-section.tsx` | Accordion с вопросами |
| `studio-section.tsx` | Галерея студии, атмосфера |
| `contact-section.tsx` | Форма записи, карта, контакты |

### UI Components (`/components/ui/` — уже есть из shadcn)
- Button, Card, Accordion, Sheet, Input, Textarea, Badge
- Дополнительно создам: `testimonial-card.tsx`, `program-card.tsx`, `pricing-card.tsx`

### Shared Components (`/components/shared/`)
| Component | Description |
|-----------|-------------|
| `cta-button.tsx` | Единая CTA кнопка с scroll-to-contact |
| `section-heading.tsx` | Стилизованные заголовки секций |
| `image-placeholder.tsx` | Компонент для фото с fallback |
| `fade-in.tsx` | Wrapper для scroll-анимации |

---

## Lib Modules Inventory (`/lib/`)

| Module | Description |
|--------|-------------|
| `data/trainer.ts` | Данные о тренере (имя, опыт, сертификаты, bio) |
| `data/programs.ts` | Массив программ тренировок |
| `data/pricing.ts` | Тарифы, абонементы, цены |
| `data/testimonials.ts` | Шаблонные отзывы |
| `data/faq.ts` | Вопросы и ответы |
| `data/schedule.ts` | Расписание занятий |
| `data/studio.ts` | Информация о студии, контакты |
| `utils.ts` | Уже есть (cn function) |
| `format.ts` | Форматирование цен, дат |

---

## Data Model Overview

### Trainer
```
- name: string (Ксения)
- experience: string (15 лет в пилатесе)
- trainerExperience: string (10 лет как тренер)
- certifications: string[] (Школа Елены Волковой, ...)
- bio: string (краткая биография)
- philosophy: string (подход к тренировкам)
```

### Program
```
- id: string
- title: string (Индивидуальные занятия, Групповые, ...)
- description: string
- duration: string (60 мин)
- level: string (для всех уровней)
- features: string[]
- image: string (placeholder path)
```

### PricingPlan
```
- id: string
- name: string (Пробное, Разовое, Абонемент 8, Абонемент 12)
- price: number
- sessions: number
- validDays: number (срок действия)
- features: string[]
- isPopular: boolean
- isTrial: boolean
```

### Testimonial
```
- id: string
- name: string
- age: number (опционально)
- occupation: string (опционально)
- text: string
- rating: number (1-5)
- avatar: string (placeholder)
```

### FAQ
```
- id: string
- question: string
- answer: string
```

### ScheduleSlot
```
- day: string (Понедельник, ...)
- time: string (10:00)
- type: string (групповое/индивидуальное)
- spotsLeft: number (опционально)
```

### StudioInfo
```
- address: string (placeholder)
- phone: string (placeholder)
- email: string (placeholder)
- workingHours: { day: string, hours: string }[]
- socialLinks: { platform: string, url: string }[]
```

---

## Pricing Display Flow

### Inputs
- Базовые цены из `data/pricing.ts`
- Тип программы (индивидуальная/групповая)

### Processing
1. Загрузка тарифов из статических данных
2. Форматирование цен (пробелы, ₽)
3. Расчет "экономии" для абонементов (опционально показать)

### Outputs
- Отформатированные карточки тарифов
- Выделение "популярного" тарифа
- CTA кнопка ведет к форме записи

---

## UI State Flows

### Navigation State
```
User clicks nav link → smooth scroll to section → update active nav item (optional)
```

### Mobile Menu State
```
User clicks hamburger → Sheet opens → User clicks link → Sheet closes → scroll to section
```

### CTA Button Flow
```
User clicks "Записаться на пробное занятие" → smooth scroll to #contact section → focus on first form field
```

### Contact Form State (UI-only demo)
```
User fills form → validation → "Submit" → show success toast/message (no actual submission)
```

### FAQ Accordion State
```
User clicks question → accordion expands → other items collapse (single-open mode)
```

### Scroll Animation State
```
Section enters viewport → fade-in animation triggers (once)
```

---

## Color Palette (Proposed)

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | #FDFBF7 | Ivory/cream page background |
| `--foreground` | #3D3633 | Primary text (warm charcoal) |
| `--primary` | #C9A98C | Taupe/clay CTA buttons |
| `--primary-foreground` | #FDFBF7 | Text on primary |
| `--secondary` | #E8DDD4 | Secondary backgrounds |
| `--secondary-foreground` | #3D3633 | Text on secondary |
| `--accent` | #D4A5A5 | Rose accent (subtle) |
| `--accent-foreground` | #3D3633 | Text on accent |
| `--muted` | #F5F0EA | Muted backgrounds |
| `--muted-foreground` | #8B7E74 | Muted text |
| `--card` | #FFFFFF | Card backgrounds |
| `--card-foreground` | #3D3633 | Card text |
| `--border` | #E8DDD4 | Borders |

---

## Typography (Proposed)

| Element | Font | Weight | Size (mobile → desktop) |
|---------|------|--------|-------------------------|
| H1 (Hero) | Cormorant Garamond | 500 | 2.5rem → 4rem |
| H2 (Section) | Cormorant Garamond | 500 | 2rem → 3rem |
| H3 (Card) | Cormorant Garamond | 500 | 1.5rem → 1.75rem |
| Body | Inter | 400 | 1rem |
| Body Large | Inter | 400 | 1.125rem |
| Small/Caption | Inter | 400 | 0.875rem |

---

## Milestones (Suggested Sequencing)

### Milestone 1: Foundation
- [ ] Настройка цветовой палитры в globals.css
- [ ] Настройка шрифтов (Cormorant Garamond + Inter)
- [ ] Создание layout компонентов (header, footer, section-wrapper)
- [ ] Создание shared компонентов (cta-button, section-heading, fade-in)

### Milestone 2: Data Layer
- [ ] Создание всех data-файлов в /lib/data/
- [ ] Создание format.ts для форматирования

### Milestone 3: Core Sections
- [ ] Hero Section
- [ ] About Section (тренер Ксения)
- [ ] Method Section
- [ ] Benefits Section

### Milestone 4: Programs & Pricing
- [ ] Programs Section с карточками
- [ ] Pricing Section с тарифами

### Milestone 5: Social Proof & Info
- [ ] Testimonials Section
- [ ] FAQ Section
- [ ] Schedule Section

### Milestone 6: Contact & Polish
- [ ] Studio Section
- [ ] Contact Section с формой
- [ ] Mobile navigation
- [ ] Scroll animations
- [ ] Final polish и responsive проверка

---

## File Structure (Final)

```
/app
  layout.tsx (updated with fonts, metadata)
  page.tsx (main landing page)
  globals.css (updated palette)

/components
  /layout
    header.tsx
    mobile-nav.tsx
    footer.tsx
    section-wrapper.tsx
  /sections
    hero-section.tsx
    about-section.tsx
    method-section.tsx
    benefits-section.tsx
    programs-section.tsx
    pricing-section.tsx
    schedule-section.tsx
    testimonials-section.tsx
    faq-section.tsx
    studio-section.tsx
    contact-section.tsx
  /shared
    cta-button.tsx
    section-heading.tsx
    image-placeholder.tsx
    fade-in.tsx
  /ui (existing shadcn components)

/lib
  utils.ts (existing)
  format.ts
  /data
    trainer.ts
    programs.ts
    pricing.ts
    testimonials.ts
    faq.ts
    schedule.ts
    studio.ts
```

---

## Awaiting Approval

Перед началом реализации прошу подтвердить:

1. **Цветовая палитра** — устраивает предложенная (taupe/rose/ivory)?
2. **Типографика** — Cormorant Garamond (заголовки) + Inter (текст)?
3. **Структура секций** — порядок и состав устраивает?
4. **Milestone-подход** — можем идти последовательно?

**Ожидаю вашего "Одобрено" или комментариев для корректировки.**
