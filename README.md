# Alexander Vanyushin — Portfolio

Многостраничный статический сайт-портфолио на чистом HTML5, Tailwind CSS (CDN) и Vanilla JavaScript.

## Запуск

1. Откройте `index.html` в браузере.
2. Для локального сервера можно использовать любой static server (например, VS Code Live Server).

## Структура

- `index.html` — главная
- `about.html` — обо мне
- `projects.html` — кейсы
- `skills.html` — навыки и инструменты
- `contact.html` — контакты
- `services/` — 8 страниц услуг
- `cases/` — 6 страниц кейсов
- `skills/` — 9 страниц инструментов
- `assets/images/projects/project-XX/` — 4 изображения каждого проекта
- `assets/js/main.js` — тема, меню, карусели, анимации и форма
- `assets/css/custom.css` — кастомные стили

## Изображения

SVG-файлы в папках `assets/images/projects/project-XX/` — демонстрационные placeholders. Их можно заменить на реальные `.jpg` / `.png` файлы, сохраняя имена либо обновив `src` в соответствующем HTML.

## Контакты

В `contact.html` и `assets/js/main.js` нет backend-отправки. Для реальной отправки формы подключите Formspree, Netlify Forms или собственный backend.


## Версия 3
- В первом экране добавлен полноценный hero-коллаж из 4 визуальных направлений.
- Главный блок «6 проектов. 6 разных задач.» теперь содержит 6 каруселей по 4 слайда.
- Для Motion Campaign и Product Advertising оставлены отдельные внешние video-links.
- Чтобы подключить свои ролики, замените значения `YOUR_MOTION_VIDEO_ID` и `YOUR_PRODUCT_VIDEO_ID` в `index.html`, `projects.html` и соответствующих `cases/case-05.html`, `cases/case-06.html`.
- Все 24 проектных визуала находятся в отдельных папках и готовы к замене вашими JPG/PNG/SVG без изменения структуры.
