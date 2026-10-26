# 🛫 Лабораторная работа: Поиск и бронирование авиабилетов

Проект представляет собой веб-сервис для поиска авиабилетов с возможностью сохранения брони в базу данных.

## 🧩 Технологии
*   **Frontend:** HTML/JS (клиентская часть).
*   **Backend:** Node.js + Express.
*   **База данных:** PostgreSQL.
*   **Контейнеризация:** Docker Compose.

## 🚀 Как запустить

Для запуска проекта достаточно одной команды. Docker сам скачает образы, поднимет базу данных и запустит сервер.

```bash
docker compose up -d

После запуска фронтенд будет доступен по адресу: http://localhost:8080.

📝 Функционал
Пользователь вводит параметры поиска (откуда, куда, дата, пассажиры).
Фронтенд отправляет POST-запрос на /search-and-save.
Бэкенд сохраняет данные в таблицу bookings в PostgreSQL.
Бэкенд возвращает ID созданной брони, который отображается на странице.

🗃 Структура проекта
frontend/ — статические файлы (HTML, JS).
backend/ — серверная логика (Express, работа с БД).
docker-compose.yml — конфигурация контейнеров.
.gitignore — правила игнорирования файлов.

👨‍🏫 Для преподавателя
Данные сохраняются в таблицу bookings. Проверить наличие данных можно командой:
docker exec -it lab-docker-compose-db-1 psql -U postgres -d postgres -c "SELECT * FROM bookings;"

⚠️ Проверить работу проекта
Показать, что таблица в базе существует
docker exec -it lab-docker-compose-db-1 psql -U postgres -d postgres -c "\dt"

Показать логи бэкенда
docker logs lab-docker-compose-db-1 --tail 20

Показать данные внутри таблицы
docker exec -it lab-docker-compose-db-1 psql -U postgres -d postgres -c "SELECT * FROM bookings;"

🛑 Как остановить проект
docker compose down
Если требуется полностью удалить все контейнеры и тома (стереть базу данных)
docker compose down -v
