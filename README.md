# Hola Fest

Нічне життя Києва на карті: події клубів на сьогодні, ексклюзивні офери з QR-кодом і виклик Uklon / Bolt / Uber в один тап.

Код пише команда AI-агентів. Їхні правила: [`CLAUDE.md`](CLAUDE.md), процес: [`docs/WORKFLOW.md`](docs/WORKFLOW.md).

## Документи

| Файл                                           | Про що                                 |
| ---------------------------------------------- | -------------------------------------- |
| [`docs/PRODUCT.md`](docs/PRODUCT.md)           | Що будуємо і чого НЕ будуємо           |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Стек, шари, схема БД, права доступу    |
| [`docs/WORKFLOW.md`](docs/WORKFLOW.md)         | Як агенти передають роботу один одному |
| [`docs/ROADMAP.md`](docs/ROADMAP.md)           | Порядок фіч MVP                        |
| [`docs/decisions/`](docs/decisions/)           | Журнал рішень                          |

## Агенти (`.claude/agents/`)

`orchestrator` · `db-backend` · `mobile` · `reviewer` · `security-qa`

**Як дати задачу:** створи issue, постав мітку `agent:orchestrator` і опиши мету. Оркестратор розіб'є її на задачі для інших агентів.
**Як перезапустити агента на задачі:** зніми мітку `status:todo`, збережи, потім постав її знову (окремими діями).
**Рев'ю** запускається автоматично на кожен PR. Мерджиш тільки ти.

## Одноразове налаштування

1. **Секрет для агентів у GitHub:** на комп'ютері з Claude Code виконай `claude setup-token`, потім додай токен у _Settings → Secrets and variables → Actions_ як `CLAUDE_CODE_OAUTH_TOKEN`.
2. **Мітки:** `agent:orchestrator`, `agent:db`, `agent:mobile`, `agent:qa`, `status:todo`, `status:in-progress`, `status:review`, `status:changes-requested`, `status:blocked`, `feature`, `bug`, `architecture`, `idea`.
3. **Захист `main`:** _Settings → Branches_ → require PR + require status checks (`Lint, typecheck, test`, `Secret scan`).
4. **Supabase:** скопіюй `.env.example` у `.env.local` і встав Project URL та anon/publishable key з _Project Settings → API_. Service role key сюди ніколи не потрапляє.

## Запуск на телефоні

```bash
npm install
npx expo start --tunnel   # відскануй QR в Expo Go
npm run check             # lint + typecheck + тести
```
