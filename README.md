### register provider

http://localhost:1000/api/auth/provider/register

# request

```json
{
  "companyName": "Название Вашей Компании",
  "inn": 3242322332,
  "email": "eвma3il@yourcompany.com",
  "productCategory": ["Категория1", "Категория2"],
  "minOrder": 1000,
  "deliveryMethod": ["Способ1", "Способ2"],
  "password": "ВашПароль"
}
```

# response

```json
{
  "provider": {
    "email": "eвma3il@yourcompany.com",
    "companyName": "Название Вашей Компании",
    "productCategory": ["Категория1", "Категория2"],
    "minOrder": 1000,
    "deliveryMethod": ["Способ1", "Способ2"],
    "_id": "65e57a4ca37f1f1d11fa17a9"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlcklkIjoiNjVlNTdhNGNhMzdmMWYxZDExZmExN2E5IiwiaWF0IjoxNzA5NTM3ODY4LCJleHAiOjE3MDk1NDE0Njh9.Z6ulhY7gzpxWcw3vNf39yhqRXbEvtl1hfJwoOCXom-c"
}
```

### register consumer

http://localhost:1000/api/auth/consumer/register

# request

```json
{
  "companyName": "Тестовая Компания",
  "inn": "1234567890",
  "email": "te3st@example.com",
  "productCategory": ["Категория 1", "Категория 2"],
  "deliveryAddress": "Адрес 1",
  "deliveryTime": [
    {
      "day": "Понедельник",
      "from": "09:00",
      "to": "18:00"
    },
    {
      "day": "Вторник",
      "from": "10:00",
      "to": "17:00"
    }
  ],
  "password": "сильныйПароль123"
}
```

# response

```json
{
  "consumer": {
    "email": "te3st@example.com",
    "companyName": "Тестовая Компания",
    "productCategory": ["Категория 1", "Категория 2"],
    "deliveryAddress": "Адрес 1",
    "deliveryTime": [
      {
        "day": "Понедельник",
        "from": "09:00",
        "to": "18:00",
        "_id": "65e57c220622064cbdf12afb"
      },
      {
        "day": "Вторник",
        "from": "10:00",
        "to": "17:00",
        "_id": "65e57c220622064cbdf12afc"
      }
    ],
    "inn": "1234567890",
    "_id": "65e57c220622064cbdf12afa"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjVlNTdjMjIwNjIyMDY0Y2JkZjEyYWZhIiwiaWF0IjoxNzA5NTM4MzM4LCJleHAiOjE3MDk1NDE5Mzh9.GObZDM6x4GLMBlbv8EPrZ9w_Lrg6QcYQyBQ8AKPQ5n8"
}
```
