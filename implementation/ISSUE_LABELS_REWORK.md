# Issue Labels Rework

Цель: привести labels к единой системе из 4 групп: type, priority, area, status.

## 1. Целевой набор labels

### Type
- name: type:feature
  color: 1f6feb
  description: Новая функциональность продукта
- name: type:bug
  color: d73a4a
  description: Ошибка или регресс в поведении
- name: type:chore
  color: 6e7781
  description: Техническая поддержка, обслуживание, рутина
- name: type:docs
  color: 0e8a16
  description: Документация и инструкции
- name: type:refactor
  color: 8b5cf6
  description: Улучшение структуры кода без изменения логики
- name: type:research
  color: c9a227
  description: Исследование и spike-задачи

### Priority
- name: priority:P0
  color: b60205
  description: Критично, блокирует релиз или бизнес
- name: priority:P1
  color: d93f0b
  description: Высокий приоритет
- name: priority:P2
  color: fbca04
  description: Средний приоритет
- name: priority:P3
  color: 0e8a16
  description: Низкий приоритет

### Area
- name: area:frontend
  color: 1d76db
  description: Клиентская часть и интерфейсы
- name: area:backend
  color: 5319e7
  description: Серверная логика и API
- name: area:design
  color: bf3989
  description: UX/UI и визуальные решения
- name: area:infra
  color: 0052cc
  description: CI/CD, окружение, инфраструктура
- name: area:content
  color: a371f7
  description: Тексты, медиа, переводы
- name: area:analytics
  color: 006b75
  description: Метрики и аналитика

### Status
- name: status:blocked
  color: 000000
  description: Есть блокер, задача не может двигаться

## 2. Labels, которые стоит удалить как мусор/дубли

- admin
- codex
- feature
- optimization
- performance
- P1
- v0

Примечание: дефолтные labels GitHub (`bug`, `enhancement`, `question`, `wontfix`, `duplicate`, `invalid`, `help wanted`, `good first issue`, `documentation`) можно оставить как системные, если команда ими пользуется. Если не пользуется, удаляйте осознанно.

## 3. Миграция существующих issues

1. Для open issues заменить устаревшие labels на целевые (пример: `feature` -> `type:feature`, `P1` -> `priority:P1`).
2. Удалить устаревшие labels из репозитория только после миграции open issues.
3. Проверить, что на каждом issue есть минимум:
- 1 label из `type:*`
- 1 label из `priority:*`
- 1 label из `area:*`

## 4. Быстрое применение через GitHub UI

1. Открыть Repository -> Issues -> Labels.
2. Обновить/создать labels из раздела 1.
3. Пройти open issues и заменить устаревшие labels.
4. Удалить labels из раздела 2.

## 5. Быстрое применение через API (если есть токен)

Нужен PAT с доступом к репозиторию.

PowerShell-псевдошаги:
1. PATCH существующих labels (обновить color/description).
2. POST недостающих labels.
3. DELETE мусорных labels.

Маршруты API:
- GET /repos/{owner}/{repo}/labels
- POST /repos/{owner}/{repo}/labels
- PATCH /repos/{owner}/{repo}/labels/{name}
- DELETE /repos/{owner}/{repo}/labels/{name}
