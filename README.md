## Установка

> Запускалось на node 20.13.1

1. `docker-compose up -d` - поднимаем контейнер с базой. для поднятия должны быть установлены `docker` и `docker-compose`. Если база уже где-то стоит, то можно подключиться к ней, создав предварительн базу с названием `sih` и подредактировать строку подключения в `.env` файле
1. `npm install` - ставим зависимости
1. `npx prisma migrate dev --name init` создаем базу из моделей по пути `prisma/schema` и с данными из `src/prisma/seed.ts`
1. `npm run dev` - запускаем проект

## Описание проекта

### использованы

- docker - для запуска базы в контейнере
- prisma - для взаимодействия с бд
- express - фреймворк для создания api
- jwt - для авторизации
- joi - для валидации запросов (сделано только в роутах авторизации)

### база

1. `users` - хранит данные пользователя
1. `items` - данные предметов
1. `transactions` - транзакции, которые учавствуют в пересчете балансов пользователей и хранят историю депозитов, выводов, покупок и продаж

### роуты

- POST: `/auth/login` - авторизация, вернется токен авторизации, который необходимо присылать в дальнейшем в заголовке `authorization` с префиксом `Bearer {token}`

```
{
  login: 'hulio',
  password: 'qweqwe',
}
```

- POST: `/auth/register` - регистрация, возвращает токен

```
{
  login: 'hulio',
  password: 'qweqwe',
}
```

- GET: `/items` - список всех предметов

```
{
  login: 'hulio',
  password: 'qweqwe',
}
```

- POST: `/items/:itemid/buy` - купить предмет

```
{
}
```

- POST: `/items/:itemid/sell` - продать

```
{
}
```

- POST: `/items` - создать предмет в базе

```
{
  "title": "item name",
  "price": 123
}
```

- GET: `/items/:id` - получить предмет по его ID
