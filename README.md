Проект тестовое задание

Проект написано на фремворке NestJS

Описание работы проекта и формата ответов можно посмотрет с помощью SWAGGER(NestJS)
на localhost:3000/ когда проект запускать.

**Задание 1**

   Service "users"
    
      EndPoint1: (GET) /users?page={номер страницы}&take={количество записей в странице}
      Возвращает требуемого количества пользователей с информацией pagination
      (по умолчанию page=1; take=50)
    
      EndPoint2: (POST) /users/id (request body: {firstname*,lastname*,age*,gender*,hasProblem?})
      Обновляет данные пользователя и созддает новую запись "действия с пользоватлем"
      Возвращает созданного пользователя (User) при успешном запросе
      Возвращает ошибку при неуспешном запросе (Validation)
    
      EndPoint3: (PATCH) /users/id (request body: {firstname?,lastname?,age?,gender?,hasProblem?})
      Возвращает обновленного пользователя (User) при успешном запросе
      Возвращает ошибку при неуспешном запросе (Validation)

    
   Service "actions-record"

      EndPoint1: (GET) /actions-record?page={номер страницы}&take={количество записей в странице}
      Возвращает требуемого количества записи действий с информацией pagination
      (по умолчанию page=1; take=50)

      
**Задание 2**

   Service "users"
   
      EndPoint1: (PATCH) /users/solve-problem/id
      Обновляет {hasProblem=false} у пользователя
      Созддает новую запись "действия с пользоватлем"
      Возвращает количество клиентов с проблемой (hasProblem=true)

   База данныз POSTGRESQL

      Migration database: typeorm
      1/Создавать таблицы в базеданных [Users,ActionsRecord,Migrations]
      2/Генерировать 100000 записей пользователей в таблице Users
      
      bash: npm run migration:run

PS:

      \*:required (Объязательный параметр)
      \?:optional (Необъязательный параметр)
