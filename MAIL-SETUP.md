# Письма с заявок — настройка (Gmail + Netlify)

Сайт живёт на **GitHub Pages**, а он не умеет запускать серверный код. Поэтому
письмо отправляет маленькая serverless-функция на **Netlify**
(`netlify/functions/lead.js`). Форма на сайте шлёт заявку на эту функцию по
прямому адресу, функция собирает фирменное письмо-табличку и отправляет его
**с твоего Gmail** тебе же на почту.

Данные почты (логин, пароль-приложение) хранятся **только в переменных Netlify**,
в коде их нет. **Пароль в чат не кидай.**

---

## Шаг 1. Gmail + пароль-приложение (App Password)

1. Создай или возьми Gmail, с которого будут уходить письма (напр. `funscool.zayavki@gmail.com`).
2. Включи **двухэтапную аутентификацию** (2-Step Verification):
   Google Account → **Security** → **2-Step Verification** → включить.
   (Без неё App Password создать нельзя.)
3. Создай **App Password**: открой https://myaccount.google.com/apppasswords →
   имя приложения напиши любое (напр. «Funscool site») → **Create**.
   Google покажет **16 символов** (4 группы по 4). Это и есть пароль для функции —
   его вводят вместо обычного пароля. Скопируй (пробелы можно убрать).

---

## Шаг 2. Netlify-сайт, который соберёт функцию

Функция уже есть в репозитории, но её должен «собрать» Netlify-сайт,
подключённый к репозиторию `treasureclyde-sketch/sitesdemos`, ветка **`claude/funscool`**.

**Вариант А (проще — переиспользовать существующий сайт `regal-starburst-6fc954`).**
Открой этот сайт в Netlify → **Site configuration → Build & deploy**:
- Убедись, что он **привязан к репозиторию** `treasureclyde-sketch/sitesdemos`.
- **Production branch** → `claude/funscool`.
- Ничего больше настраивать не надо — всё уже прописано в `netlify.toml`
  (ставит `nodemailer`, папка функций `netlify/functions`).
- Нажми **Deploy** (Trigger deploy → Deploy site).

**Вариант Б (если тот сайт не привязан к репо).** Создай новый сайт:
Netlify → **Add new site → Import from GitHub** → выбери `sitesdemos` →
branch `claude/funscool` → Deploy. У нового сайта будет **другой адрес**
(типа `something-12345.netlify.app`) — тогда **скинь мне этот адрес**, я поменяю
одну строку в коде (сейчас там прописан `regal-starburst-6fc954.netlify.app`).

Проверка, что функция поднялась: открой в браузере
`https://<твой-netlify>.netlify.app/.netlify/functions/lead` —
должно быть `{"error":"method not allowed"}` (это норма для GET), а **не** «Page not found».

---

## Шаг 3. Переменные окружения в Netlify

Netlify → сайт → **Site configuration → Environment variables → Add a variable**.
Добавь три (значения — свои):

| Ключ         | Значение                                  |
|--------------|-------------------------------------------|
| `GMAIL_USER` | Gmail/Google-аккаунт, который ОТПРАВЛЯЕТ письмо (у него App Password) |
| `GMAIL_PASS` | 16-значный App Password из Шага 1 (без пробелов) |
| `LEAD_TO`    | кому ПРИХОДЯТ заявки — можно несколько через запятую |

Кому приходят заявки (значение `LEAD_TO`), одной строкой:

```
Kseniyashipareva@gmail.com, Raziusha0809@gmail.com, Welcome@funscool.rs
```

`GMAIL_USER` — это отдельный аккаунт-отправитель (с него уходит письмо). Можно
завести отдельный Gmail (напр. `funscool.zayavki@gmail.com`). Если домен
`funscool.rs` заведён в Google Workspace, отправителем можно сделать
`Welcome@funscool.rs` (App Password создаётся так же) — тогда письмо будет
уходить прямо с вашего домена.

После добавления переменных сделай **Trigger deploy → Deploy site** ещё раз,
чтобы функция их подхватила.

---

## Шаг 4. Проверка

1. Открой сайт → форма «Записаться на экскурсию» → заполни и отправь.
2. Если пришло письмо-табличка на почту из `LEAD_TO` — готово. 🎉
3. Если не пришло:
   - `{"error":"not configured"}` → не заданы `GMAIL_USER`/`GMAIL_PASS` (или не сделан redeploy).
   - «Page not found» на адресе функции → сайт собрал не ту ветку / функция не подхватилась.
   - Письмо в спаме → отметь «не спам», дальше будет приходить нормально.
   - Форма показала кнопку WhatsApp → функция недоступна, заявка не потеряна:
     родитель уходит в WhatsApp как запасной канал.

---

## Как это устроено в коде

- `netlify/functions/lead.js` — принимает JSON заявки, отдаёт CORS-заголовки
  (сайт и функция на разных доменах), собирает HTML-письмо (`_buildHtml`) и
  текстовую версию, шлёт через Gmail (`nodemailer`, `service: 'gmail'`).
  `replyTo` = e-mail родителя, так что «Ответить» пишет прямо ему.
- Адрес функции задан в двух местах (если меняешь — меняй оба):
  - `funscool/assets/js/main.js` — константа `LEAD_ENDPOINT`;
  - `funscool/index.html` и `funscool/group.html` — атрибут `action` у формы.
- Запасной канал: если функция недоступна, форма показывает кнопку WhatsApp
  с уже заполненным текстом заявки.
