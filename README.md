# BACKEND POKER SCRUM

This project is the backend for this frontend [repository](https://github.com/dalviik/backend-poker-scrum).

It is developed under following technologies.

- NodeJs
- Express
- Sequelize
- Postgres

### Setup

You need to create a database to connect with the database, edit next files `postgres.init.js` and `/models/index.js` with your database connection.

```js
const sequelize = new DataTypes(
  'YOUR_DATABASE',
  'YOUR_OWNER',
  'YOUR_PASSWORD',
  { host: '127.0.0.1', dialect: 'postgres' }
);
```

After that, you have to install node dependencies with the next command
```sh
npm i
```

To create te database run the following command
```sh
node postgres.init.js
```

and finally to run the server use 
```sh
npm run start
```

this command run a serve on `port 3003`