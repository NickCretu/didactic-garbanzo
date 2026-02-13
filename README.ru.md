# Pauch Website - Инструкция для клиента (без технических знаний)

**English version:** см. `README.md`

Это руководство для нетехнического пользователя. Вы можете менять товары, статьи блога и тексты сайта прямо в GitHub через браузер.

## 1. Что это за сайт

Это статический мультиязычный сайт (English, Русский, Română) с каталогом никотиновых паучей и блогом.

Основной контент находится здесь:

- `src/content/products/` - товары
- `src/content/blog/` - статьи блога (в каждом файле сразу 3 языка)
- `src/content/hubs/` - категории блога
- `src/i18n/en.json`, `src/i18n/ru.json`, `src/i18n/ro.json` - тексты интерфейса, меню, FAQ
- `public/images/products/` - фото товаров
- `public/images/blog/` - изображения статей

## 2. Безопасный процесс публикации (без терминала)

Используйте этот порядок каждый раз:

1. Откройте репозиторий в GitHub.
2. Откройте файл, который хотите изменить.
3. Нажмите на иконку карандаша (`Edit this file`).
4. Внесите изменения.
5. Внизу страницы укажите короткое сообщение коммита.
6. Выберите `Commit directly to the main branch`.
7. Нажмите `Commit changes`.
8. Подождите деплой Netlify (обычно 1-3 минуты).
9. Откройте сайт и проверьте изменения.

Если что-то пошло не так, можно откатить:

1. Откройте `Commits`.
2. Выберите последний коммит.
3. Нажмите `Revert`.

## 3. Что можно менять и где

- Изменить название/описание/цену/крепость товара: `src/content/products/*.json`
- Добавить или удалить товар: `src/content/products/`
- Изменить текст статьи/SEO-заголовки/описания/slug: `src/content/blog/*.json`
- Добавить или удалить статью: `src/content/blog/`
- Изменить тексты главной страницы, FAQ, кнопки: `src/i18n/en.json`, `src/i18n/ru.json`, `src/i18n/ro.json`
- Изменить юридические страницы: `src/pages/en/*.astro`, `src/pages/ru/*.astro`, `src/pages/ro/*.astro` (`terms.astro`, `privacy.astro`, `age-policy.astro`)
- Изменить Telegram-ссылку: `src/i18n/index.ts` (`TELEGRAM_DEEP_LINK`)
- Обновить изображения: `public/images/products/`, `public/images/blog/`

## 4. Редактирование товаров

### 4.1 Обновить существующий товар

1. Откройте любой файл в `src/content/products/` (например: `src/content/products/pablo-ice-cold.json`).
2. Измените нужные значения:
   - `price`
   - `strength`
   - `strengthCategory` (`low`, `medium`, `strong`, `extra`)
   - `flavorCategory` (`mint`, `citrus`, `berry`, `coffee`, `tropical`)
   - `translations.en.name`, `translations.ru.name`, `translations.ro.name`
   - `translations.*.description`
3. Сделайте commit.

### 4.2 Добавить новый товар

1. В папке `src/content/products/` нажмите `Add file` -> `Create new file`.
2. Назовите файл, например: `brand-flavor-strength.json`.
3. Скопируйте структуру из существующего товарного JSON-файла.
4. Заполните все поля.
5. Загрузите изображение товара в `public/images/products/`.
6. Укажите путь к картинке в поле:
   - `"image": "/images/products/your-image.webp"`
7. Сделайте commit.

## 5. Редактирование статей блога

Каждый файл статьи содержит **сразу 3 языка** (EN/RU/RO).

### 5.1 Обновить существующую статью

1. Откройте файл в `src/content/blog/`.
2. Изменяйте блоки `translations.en`, `translations.ru`, `translations.ro`.
3. Важные поля:
   - `title` -> заголовок статьи
   - `slug` -> часть URL (менять аккуратно)
   - `metaTitle` -> SEO title
   - `metaDescription` -> SEO description
   - `excerpt` -> краткий текст на карточке
   - `content` -> полный текст статьи
   - `faq` -> блок вопросов/ответов (необязательно)
4. Сделайте commit.

### 5.2 Добавить новую статью

1. Скопируйте любой существующий файл из `src/content/blog/`.
2. Переименуйте в новый уникальный файл (например: `p013-new-topic.json`).
3. Измените:
   - `postId` на новый ID (`P013` и т.д.)
   - `publishedAt` в формате `YYYY-MM-DD`
   - `hub` (`switching`, `strength`, `selection`, `safety`)
   - тексты для всех 3 языков
4. Добавьте изображение в `public/images/blog/` и укажите:
   - `"image": "/images/blog/filename.jpg"`
5. Сделайте commit.

## 6. Форматирование текста статьи

Внутри `translations.*.content` используйте простой markdown-формат:

- `## Заголовок` для H2
- `### Подзаголовок` для H3
- `- Пункт` для маркированного списка
- `1. Пункт` для нумерованного списка
- `**жирный**` для выделения

### SEO-рекомендации для статей

- `metaTitle`: примерно 50-70 символов
- `metaDescription`: примерно 140-160 символов
- `slug` делайте коротким и понятным
- заполняйте все 3 языка

## 7. Изменение текстов на главной странице (кнопки, секции, FAQ)

Тексты главной и части интерфейса находятся в:

- `src/i18n/en.json`
- `src/i18n/ru.json`
- `src/i18n/ro.json`

Основные разделы для редактирования:

- `hero`
- `catalog`
- `faq`
- `shipping`
- `about`
- `strengthFinder`
- `footer`

Важно:

- Меняйте только значения текста.
- Не переименовывайте ключи (например `"hero"`, `"faq"`, `"title"`).

## 8. Юридические страницы

Юридические страницы отдельные для каждого языка:

- English: `src/pages/en/terms.astro`, `src/pages/en/privacy.astro`, `src/pages/en/age-policy.astro`
- Русский: `src/pages/ru/terms.astro`, `src/pages/ru/privacy.astro`, `src/pages/ru/age-policy.astro`
- Română: `src/pages/ro/terms.astro`, `src/pages/ro/privacy.astro`, `src/pages/ro/age-policy.astro`

В этих файлах можно редактировать видимый текст напрямую.

## 9. Изменение Telegram-ссылки

Если нужно поменять ссылку для заказа:

1. Откройте `src/i18n/index.ts`
2. Обновите строку:
   - `export const TELEGRAM_DEEP_LINK = 'https://...'`
3. Сделайте commit.

## 10. Правила для изображений

- Фото товаров: `public/images/products/`
- Фото для блога: `public/images/blog/`
- Используйте простые имена файлов (нижний регистр, дефисы, без пробелов), например:
  - `pablo-ice-cold.webp`
  - `beginner-guide.jpg`
- После загрузки проверьте, что путь в JSON совпадает с названием файла.

## 11. Частые ошибки, которых нужно избегать

- Не удаляйте запятые и кавычки в JSON.
- Не переименовывайте ключи: `translations`, `title`, `metaTitle` и т.д.
- Не оставляйте один язык пустым, если обновляете контент.
- Не переименовывайте папки и не переносите файлы.

Если после изменения деплой Netlify упал, чаще всего причина - ошибка JSON (лишняя/пропущенная запятая или скобка). Сравните с предыдущим рабочим коммитом.

## 12. Чек-лист перед каждым commit

1. Изменили нужный файл?
2. Обновили EN + RU + RO, где требуется?
3. JSON остался валидным (запятые/скобки/кавычки)?
4. Изображение загружено, если есть ссылка на него?
5. `slug` корректный?
6. Деплой Netlify прошел успешно?

## 13. Для разработчика (необязательно)

Локальный запуск:

```bash
npm install
npm run dev
```

Прод-сборка:

```bash
npm run build
npm run preview
```
