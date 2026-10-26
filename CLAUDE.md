# coffee-site

Демо-проект для доски агентов: одностраничный сайт кофейни «Зерно». Публичный, хостинг GitHub Pages.

## Стек и команды

Vite, чистый JS и CSS без фреймворков. Тесты Playwright в Chromium на локальной сборке.

- `npm run dev` порт 5193.
- `npm test` собирает сайт, поднимает preview на 4173 и гоняет тесты. В облаке Claude браузер берётся из `/opt/pw-browsers/chromium` автоматически (`playwright.config.js`), `playwright install` там не нужен.

## Ветки и стенды

- `main` прод: `https://ilyavasiliev1.github.io/coffee-site/`
- `staging` бета: `https://ilyavasiliev1.github.io/coffee-site/staging/`
- `claude/task-N` ветка задачи с превью `/coffee-site/preview/task-N/` и отчётом тестов `/coffee-site/preview/task-N-report/`

Прямые пуши в `main` и `staging` делает только человек через доску; агент работает через PR в `staging`.

## Правила

- Меню лежит в `src/menu.js`, цены в рублях.
- Базовый путь сборки задаёт `BASE`, пути в коде только относительные.
- Протокол работы агента: `.agent/PROTOCOL.md`.

<!-- cloud-ready -->
## Облачная и локальная работа

- Облачный агент видит только этот репозиторий: правила, команды и тесты лежат здесь, а не в `~/Developer`.
- Ветки: `main` прод, `staging` бета, `claude/task-N` задачи агента (PR в `staging`). Протокол: `.agent/PROTOCOL.md`.
- В облаке Chromium для Playwright берётся из `/opt/pw-browsers/chromium` (`playwright.config.js`), `playwright install` там не нужен.
- Секреты в репозиторий не кладутся: облако получает их из настроек окружения.
