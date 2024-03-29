# Users
## Endpoint GET All Users
```http
GET http://localhost:3000/api/v1/users
Content-Type: application/json
```

## Endpoint GET Users
```http
GET http://localhost:3000/api/v1/users/1
Content-Type: application/json
```

## Endpoint Create Users
```http
POST http://localhost:3000/api/v1/users
Content-Type: application/json

{
    "name": "test",
    "email": "test@gmail.com",
    "password": "123"
}
```

# Account
## Endpoint GET All Account
```http
GET http://localhost:3000/api/v1/account
Content-Type: application/json
```

## Endpoint GET Account
```http
GET http://localhost:3000/api/v1/account/1
Content-Type: application/
```

## Endpoint Create Account
```http
POST http://localhost:3000/api/v1/account
Content-Type: application/json

{
    "id": "2",
    "bank": "bri"
}
```

# Transaction
## Endpoint GET All Transaction
```http
GET http://localhost:3000/api/v1/transaction
Content-Type: application/json
```

## Endpoint GET Transaction
```http
GET http://localhost:3000/api/v1/transaction/1
Content-Type: application/json
```

## Endpoint Create Transaction
```http
POST http://localhost:3000/api/v1/transaction
Content-Type: application/json

{
    "source": "1",
    "destination": "2",
    "amount": "10000"
}
```