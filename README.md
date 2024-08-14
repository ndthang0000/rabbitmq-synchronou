
## Description

Learning about RabbitMQ and Demo Server Using Queue Handle big request API in current time
- API: curl -X POST http://localhost:3000/process -H "Content-Type: application/json" -d '{"name": "Task 1"}'. 
-Flow: Handler will generate a ID and create reply queue after that "task" will send to task queue. Then task queue finish handle and send result to reply queue base on ID
## Installation
Starting the RabbitMQ Broker
Admin RabbitMQ run on http://localhost:15672.
Note: username and password is guest
```bash
$ docker-compose up -d
```
Install dependency
```bash
$ npm install
```

## Running the server.js

```bash
# development
$ node server.js
```

## Running worker.js

```bash
# development
$ node server.js
```



