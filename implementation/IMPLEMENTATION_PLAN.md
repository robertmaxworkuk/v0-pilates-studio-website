# План внедрения серверной части и админ-панели Pilatta (Supabase + Next.js App Router)

## 1. Архитектура и Технический стек
- **База данных и Auth:** Supabase (PostgreSQL, Supabase Auth, Row Level Security).
- **Пакеты Supabase для Next.js:** `@supabase/ssr` (для работы с куками и сессиями на сервере/клиенте), `@supabase/supabase-js`.
- **Фронтенд:** Next.js 14+ (App Router), React Server Components (RSC), Client Components.
- **Работа с формами и валидация:** `react-hook-form` + `@hookform/resolvers/zod` + `zod`.
- **UI Компоненты:** Shadcn UI (обязательные компоненты: `Form`, `Input`, `Button`, `Dialog`, `Toast` (через Sonner), `Table` (через TanStack Table), `Calendar`, `Select`, `DropdownMenu`).
- **Уведомления:** Библиотека `sonner` (интегрированный с Shadcn, обязательное позиционирование: `top-right`). Заменяет стандартный toast для повышения эстетичности.
- **Data Mutation:** Next.js Server Actions (`use server`) для всех операций записи/обновления/удаления (CRUD), без создания отдельных API Routes.

### 1.1. Руководство по фирменному стилю (UI/UX Style Guide)
Все новые страницы (в том числе админ-панель) должны строго наследовать дизайн-систему лендинга:
- **Цветовая палитра:** Использование существующих CSS-переменных. Теплые фоны (`--background: oklch(0.985 0.003 75)`), элегантные акценты (`--primary: oklch(0.55 0.12 35)`). Никаких "дефолтных" синих кнопок или серых админских фонов — интерфейс должен ощущаться премиально и тепло.
- **Скругления (Border Radius):** Единый мягкий радиус `0.75rem` (`--radius`) везде: от инпутов регистрации до карточек сессий.
- **Типографика:** Базовый `font-sans` из глобального конфига для обеспечения премиальной читаемости.
- **Glassmorphism:** Активное использование эффекта матового стекла (`backdrop-blur`) и полупрозрачных фонов для компонентов навигации (верхняя шапка, выпадающие меню) и диалоговых окон. Дашборды не должны выглядеть как сухие таблицы.
- **Анимации:** Мягкие CSS фреймворк-анимации на наведение (hover), интерактивные отклики при клике на сессии в расписании.
- **Уведомления:** Всплывающие уведомления об успешных бронированиях или ошибках будут отображаться **справа сверху** с использованием библиотеки Sonner, стилизованной под общую палитру студии.

---

## 2. Схема Базы Данных (Supabase PostgreSQL)

Будет реализована единая реляционная схема. Все даты/время хранятся строго в формате `timestamptz`.

### 2.1. Таблица `users_profile` (Автоматически связывается с `auth.users`)

*Примечание по безопасности (Пароли): Пароли пользователей никогда не хранятся в этой или любой другой публичной таблице БД. Они надежно хэшируются алгоритмом bcrypt и управляются изолированным ядром Supabase Auth (системная таблица `auth.users`). Через наше приложение (клиент/сервер) мы передаем пароль напрямую в Supabase Auth при входе/регистрации, а в `users_profile` храним только безопасные бизнес-данные (имя, номер телефона).*

- `id` (UUID, Primary Key, Foreign Key References `auth.users(id)` `ON DELETE CASCADE`).
- `email` (TEXT, Unique, Not Null) - *синхронизируется с auth.users*.
- `first_name` (TEXT, Not Null).
- `last_name` (TEXT, Not Null).
- `avatar_url` (TEXT, Nullable) - *Прямая ссылка на загруженное фото профиля (аватар) из Supabase Storage*.
- `phone` (TEXT, Nullable).
- `country` (TEXT, Nullable).
- `city` (TEXT, Nullable).
- `address_line` (TEXT, Nullable) - *Улица, дом, квартира*.
- `postal_code` (TEXT, Nullable).
- `role` (ENUM: `'user'`, `'client'`, `'trainer'`, `'admin'`) - *По умолчанию `'user'`. Изменяется администратором. Тренеры могут видеть свои классы и отмечать посещаемость*.
- `status` (ENUM: `'active'`, `'blocked'`) - *По умолчанию `'active'`. Заблокированные пользователи не могут совершать бронирования*.
- `created_at` (TIMESTAMPTZ, Default `now()`).
- `updated_at` (TIMESTAMPTZ, Default `now()`).

### 2.2. Таблица `session_types` (Шаблоны/Типы тренировок)
- `id` (UUID, Primary Key, Default `uuid_generate_v4()`).
- `title` (TEXT, Not Null) - *Например: "Ранняя пташка: Реформер", "Пилатес для беременных"*.
- `description` (TEXT, Nullable).
- `default_price` (NUMERIC, Not Null).
- `default_capacity` (INTEGER, Not Null) - *Типовое количество мест (напр. 4 или 6)*.
- `default_duration_minutes` (INTEGER, Not Null) - *Продолжительность по умолчанию (напр. 55)*.
- `is_active` (BOOLEAN, Default `true`) - *Soft delete. Если тип тренировки больше не проводится, он скрывается из списка создания новых сессий, но старые записи не ломаются*.
- `image_url` (TEXT, Nullable) - *Прямая ссылка на главную обложку в бакете Supabase Storage*.
- `gallery_urls` (TEXT[], Nullable) - *Массив ссылок на дополнительные фотографии для создания галереи (слайдера) в карточке занятия*.
- `created_at` (TIMESTAMPTZ).

### 2.3. Таблица `session_tags` (Настраиваемые теги)
Справочник гибких тегов для категоризации занятий (например: "Для беременных", "Новички", "Интенсив"). Управляется администратором.
- `id` (UUID, Primary Key, Default `uuid_generate_v4()`).
- `name` (TEXT, Unique, Not Null) - *Название тега*.
- `color_scheme` (TEXT, Nullable) - *Название стилевого токена или HEX для кастомной заливки компонента Badge в UI*.

### 2.4. Таблица `session_type_tags` (Связь Many-to-Many)
- `session_type_id` (UUID, Foreign Key References `session_types(id)` `ON DELETE CASCADE`).
- `tag_id` (UUID, Foreign Key References `session_tags(id)` `ON DELETE CASCADE`).
- **Primary Key:** составной `(session_type_id, tag_id)`.

### 2.5. Таблица `sessions` (Конкретные занятия в расписании календаря)
- `id` (UUID, Primary Key, Default `uuid_generate_v4()`).
- `type_id` (UUID, Foreign Key References `session_types(id)`).
- `instructor_id` (UUID, Foreign Key References `users_profile(id)`) - *Ссылка на профиль тренера, который ведет это занятие*.
- `title` (TEXT, Not Null) - *Наследуется из шаблона, доступно для изменения админом*.
- `description` (TEXT, Nullable).
- `price` (NUMERIC, Not Null).
- `max_capacity` (INTEGER, Not Null).
- `location` (TEXT, Not Null) - *Например: "Зал Реформеров", "Большой зал"*.
- `start_time` (TIMESTAMPTZ, Not Null).
- `end_time` (TIMESTAMPTZ, Not Null).
- `status` (ENUM: `'scheduled'`, `'ongoing'`, `'completed'`, `'cancelled'`) - *По умолчанию `'scheduled'`*.
- `cancel_reason` (TEXT, Nullable).
- `canceled_at` (TIMESTAMPTZ, Nullable).
- `created_at` (TIMESTAMPTZ).

### 2.6. Таблица `bookings` (Бронирования клиентов)
- `id` (UUID, Primary Key, Default `uuid_generate_v4()`).
- `session_id` (UUID, Foreign Key References `sessions(id)` `ON DELETE RESTRICT`).
- `user_id` (UUID, Foreign Key References `users_profile(id)`).
- `status` (ENUM: `'booked'`, `'cancelled_by_user'`, `'cancelled_by_admin'`, `'attended'`, `'no_show'`) - *По умолчанию `'booked'`*.
- `is_paid` (BOOLEAN, Default `false`) - *Отметка об оплате. Так как онлайн-эквайринг пока не подключен, этот статус проставляется администратором вручную после оплаты в студии*.
- `booked_at` (TIMESTAMPTZ, Default `now()`).
- `canceled_at` (TIMESTAMPTZ, Nullable).
- **Важно (Constraint):** Создание уникального составного индекса `CREATE UNIQUE INDEX unique_active_booking ON bookings (session_id, user_id) WHERE status = 'booked';` (предотвращает двойную запись одного профиля на одну сессию).

### 2.8. Таблица `global_settings` (Глобальные настройки студии)
Хранение системных параметров Key-Value для управления через админку, без необходимости делать деплой.
- `key` (TEXT, Primary Key) - *Примеры: `'cancellation_timeout_hours'`*.
- `value` (JSONB, Not Null).

### 2.9. Таблицы истории и аудита (History & Audit Logging)
Вместо единой таблицы аудита, в соответствии с запросом, мы разделяем потоки истории для максимальной прозрачности:

#### 1. `user_history` (История изменений пользователей)
- `id` (UUID, Primary Key).
- `user_id` (UUID, Foreign Key References `users_profile(id)` `ON DELETE CASCADE`).
- `changed_by` (UUID, Nullable, References `users_profile(id)`) - *Кто внес изменения (сам юзер или админ)*.
- `action` (TEXT) - *Например: `'ROLE_CHANGED'`, `'STATUS_CHANGED'`, `'PROFILE_UPDATED'`*.
- `old_data` (JSONB, Nullable), `new_data` (JSONB, Nullable).
- `created_at` (TIMESTAMPTZ, Default `now()`).

#### 2. `session_history` (История изменений занятий)
- `id` (UUID, Primary Key).
- `session_id` (UUID, Foreign Key References `sessions(id)` `ON DELETE CASCADE`).
- `action` (TEXT) - *Например: `'TIME_CHANGED'`, `'CANCELLED'`, `'CAPACITY_CHANGED'`*.
- `reason` (TEXT, Nullable) - *Причина отмены или переноса*.
- `created_at` (TIMESTAMPTZ, Default `now()`).

#### 3. `booking_history` (История бронирований)
- `id` (UUID, Primary Key).
- `booking_id` (UUID, Foreign Key References `bookings(id)` `ON DELETE CASCADE`).
- `action` (TEXT) - *Например: `'STATUS_UPDATED'`, `'PAYMENT_STATUS_CHANGED'`*.
- `old_status` (TEXT), `new_status` (TEXT).
- `created_at` (TIMESTAMPTZ, Default `now()`).

*Замечание: все эти таблицы заполняются автоматически через PostgeSQL Триггеры при выполнении UPDATE или DELETE в родительских таблицах.*

### 2.10. Таблица `user_packages` (Абонементы и Пакеты тренировок)
Архитектурная реализация возможности продажи пакетов (например, "10 занятий на реформере").
- `id` (UUID, Primary Key).
- `user_id` (UUID, Foreign Key References `users_profile(id)` `ON DELETE CASCADE`).
- `name` (TEXT) - *Название пакета*.
- `total_sessions` (INTEGER, Nullable) - *Общее количество (null для безлимита)*.
- `used_sessions` (INTEGER, Default `0`) - *Сколько тренировок забронировано или посещено*.
- `expires_at` (TIMESTAMPTZ, Nullable) - *Срок действия пакета*.
- `is_active` (BOOLEAN, Default `true`).
*Механика списания тренировок: при создании записи (`status='booked'`) `used_sessions` увеличивается на 1. При отмене типа `'cancelled_by_user'` или `'cancelled_by_admin'` — возвращается (-1). При `'attended'` или `'no_show'` — остается списанным.*

---

## 3. Политики безопасности на уровне строк (Row Level Security - RLS)

Инфраструктура Auth в Supabase защищается на корневом уровне БД:
- **`users_profile`**: Клиент (`role='user'|'client'`) имеет права `SELECT` и `UPDATE` только для своей строки (условие: `id = auth.uid()`). `admin` имеет `ALL` для всех строк.
- **`sessions` & `session_types`**: Клиенты имеют `SELECT` доступ. Для `sessions` можно читать только если `status != 'cancelled'` или показывать ее в UI расписания как "Отменена" ради информативности. `admin` имеет доступ `ALL`.
- **`bookings`**: `INSERT` разрешен клиенту только если `user_id = auth.uid()` и `users_profile.status = 'active'`. `SELECT/UPDATE` доступны только для своих записей (при этом `UPDATE` ограничен: клиент может поменять `status` только на `'cancelled_by_user'`). `admin` имеет доступ `ALL`.

---

## 4. Маршрутизация и Компоненты (Next.js)

### 4.1. Авторизация (Публичные маршруты)
- `app/(auth)/sign-in/page.tsx`: Клиентский компонент формы авторизации (Email/Пароль). Server Action: `signInAction()`. Размещение `Sonner` тоста с ошибками валидации слева-сверху.
- `app/(auth)/sign-up/page.tsx`: Регистрация нового аккаунта. Уникальная ссылка. Server Action: `signUpAction()`. *Событие в БД (`auth.users`) запускает триггер для авто-создания записи в `users_profile`*.

### 4.2. Зона Клиента (Защищено Middleware)
*Файл `middleware.ts` проверяет наличие сессии Supabase, отправляя гостей на `/sign-in`.*
- `app/(user)/profile/page.tsx`: Управление данными профиля. Загрузка аватара (прямая интеграция с Supabase Storage). Server Action: `updateProfileAction()`.
- `app/(user)/schedule/page.tsx`: Модуль интерактивного расписания. Интеграция серверного компонента для вывода данных и `shadcn/ui/Calendar` для выбора дат. Фильтрация по типам.
- `app/(user)/schedule/[id]/page.tsx`: Детали конкретной сессии (кто ведет, какое оборудование, локация, оставшиеся места). Server Action: `bookSessionAction(sessionId)`. Если мест нет, кнопка бронирования блокируется со статусом "Мест нет".
- `app/(user)/bookings/page.tsx`: Управление своими тренировками. Содержит 2 вкладки: "Предстоящие" и "Архив". Во вкладке "Предстоящие" доступна кнопка отмены. Server Action: `cancelBookingByUserAction()`.

### 4.3. Зона Администратора (Защищено Middleware + Валидация Роли)
*Файл `middleware.ts` декодирует JWT сессии (или делает легкий запрос профиля), если `role !== 'admin'`, редирект на `/`.*
- `app/admin/layout.tsx`: Рабочая панель администратора с боковой навигацией (Sidebar).
- `app/admin/dashboard/page.tsx`: Дашборд с ключевыми метриками (сессии сегодня, последние отмены, новые пользователи за 24 часа).
- `app/admin/session-types/page.tsx`: Справочник типов тренировок. Интерфейс добавления обложек, контроля цен. (CRUD).
- `app/admin/sessions/page.tsx`: Центральный календарь/список.
- `app/admin/sessions/create/page.tsx`: Форма создания сессии. Server Action: `createSessionAction()`. Обязательная серверная проверка коллизий на наложения по времени/локации (чтобы не поставить 2 разные группы в один зал на одно время).
- `app/admin/sessions/[id]/edit/page.tsx`: Редактирование, а также критическая функция "Отменить сессию". Отмена сессии (Server Action: `cancelSessionAndNotifyAction()`) автоматически переводит все связанные `bookings` в статус `'cancelled_by_admin'` и создает подробный отчет в `audit_logs`.
- `app/admin/users/page.tsx`: Управление клиентами (реализация на базе TanStack React Table для сортировок и поиска). Быстрые действия: заблокировать нарушителя (Server Action: `blockUserAction()`), изменить роль.
- `app/admin/users/[id]/page.tsx`: Подробная карточка клиента (история посещений, отмен, контактные данные, привязанные бронирования).
- `app/admin/bookings/page.tsx`: Глобальное управление всеми бронированиями студии. Таблица со всеми записями (поиск по фио, фильтр по дате). Именно здесь администратор меняет статус на "Отменено админом" или проставляет оплату (`is_paid = true`).
- `app/admin/settings/page.tsx`: Управление JSONB-объектами из `global_settings` (в том числе поле для ввода часов таймаута на раннюю отмену).

### 4.4. Зона Тренера (Защищено Middleware + Валидация Роли)
*Файл `middleware.ts` декодирует сессии, и если `role` равно `'trainer'` или `'admin'`, предоставляет доступ. Тренеры ограничены только своими классами.*
- `app/trainer/schedule/page.tsx`: Личный календарь тренера (отфильтрованный по `instructor_id = auth.user.id`).
- `app/trainer/sessions/[id]/attendance/page.tsx`: Планшетный интерфейс для отметки присутствия. Тренер может одним тапом переводить статусы бронирований из `'booked'` в `'attended'` (Посетил) или `'no_show'` (Прогул).

---

## 5. Детальная архитектура ключевых модулей (Бизнес-логика)

### 5.1. Модуль отмены брони и Тайм-аутов
**Сценарий:** Пользователь пытается сам отменить запись через Личный Кабинет.
**Механика в Action `cancelBookingByUserAction()`:**
1. Action забирает системное время на сервере.
2. Извлекает настройку `cancellation_timeout_hours` из `global_settings`.
3. Сравнивает время начала сессии с текущим: `if ((session.start_time - Date.now()) < cancellation_timeout_hours)`.
4. Если `true`: выброс ошибки "Время для самостоятельной отмены вышло (менее N часов). Свяжитесь со студией". В этом случае кредит из пакета не возвращается, пока администратор сам не вмешается.
5. Если `false`: успешная смена `status` на `'cancelled_by_user'`. Клиенту "возвращается" занятие в таблице `user_packages` (-1 к `used_sessions`).

### 5.2. Модуль Supabase Storage (Хранилище медиа)
Настройка Buckets (контейнеров) с политиками безопасности:
1. `avatars` (Публичный доступ на чтение): Политика RLS настроена так, чтобы пользователь мог отправлять файлы по пути, содержащему его UID (`auth.uid() = (storage.foldername(name))[1]`). Это не позволит пользователю подставлять свои фото в чужие профили.
2. `session_images` (Публичный доступ на чтение): Права на запись/модификацию/удаление файлов обложек предоставляются исключительно авторизованным пользователям с ролью `'admin'` в БД.

### 5.3. Логика работы тренера (Тренерский интерфейс)
- **Изоляция:** Тренеры изолированы от финансовой информации и глобальных настроек студии.
- **Сценарий работы:** Тренер открывает `app/trainer/schedule/page.tsx` со студийного планшета или своего телефона. Система отфильтрует таблицу `sessions` так, чтобы отобразить только занятия, где `instructor_id` совпадает с его профилем пользователя.
- **Отметка посещаемости:** Тренер кликает на текущее занятие, видит всех пользователей со статусом `'booked'`. Затем одним интуитивным жестом или кликом переводит каждого пользователя в статус `'attended'` (Явился) или `'no_show'` (Не явился/Прогул). Эта простая механика гарантирует, что статистика посещений и пакеты клиентов всегда будут актуальны, а владельцы не будут терять деньги из-за ошибок ручного учета.

### 5.4. Логика работы с пакетами (Абонементы)
- **Защита от двойного бронирования (Race Conditions):** При попытке клиента записаться на занятие происходит проверка: если `total_sessions` не `null` (ограниченный пакет), то `used_sessions` должно быть строго меньше `total_sessions`. При соблюдении условия создается запись в `bookings` и `used_sessions` инкрементируется `+1`. Всё это оборачивается в защищенную транзакцию PostgreSQL или Server Action. 
- **Логика для безлимитов:** Если был продан безлимитный абонемент, в базе создается пакет со значением `total_sessions = null`. Система будет только сверять дату окончания `expires_at` с датой `start_time` выбранного занятия.
- **Исполнение и Возвраты:** В случае своевременной самостоятельной отмены (`< cancellation_timeout_hours`) или отмены сессии администратором студии, счетчик `used_sessions` декрементируется `-1`, возвращая занятие клиенту.

---

## 6. Требования к Декомпозиции при разработке (Инструкция для ИИ-Агента)

Работу необходимо разделить на логические Github Issues со строгими критериями:

- [ ] **Stage 1 (Инфраструктура):** Установка SDK. Инициализация проекта Supabase. SQL скрипты миграции структуры (`schema.sql`). Настройки политик RLS. Функция триггера `on_auth_user_created`.
- [ ] **Stage 2 (Аутентификация):** Сборка UI вкладок регистрации и авторизации. Написание Middleware контроля сессий. Проверка связки с Supabase Auth.
- [ ] **Stage 3 (Система Администрирования):** Верстка `admin/layout`, подключение Server Actions для управления `session_types` и `global_settings`.
- [ ] **Stage 4 (Управление Расписанием - Admin):** Интерфейсы создания `sessions`, управления пользователями, логика ручных и массовых отмен занятий администраторами.
- [ ] **Stage 5 (Публичный Энджоймент - Client):** Верстка каталога занятий. Подключение движка бронирований. Защита экшенов по таймауту.
- [ ] **Stage 6 (UI/UX Полировка):** Настройка Sonner (Top-Right), ревью применения Glassmorphism дизайн-токенов в общих компонентах. Тестирование политик RLS под аккаунтами без прав.
