### Requirements

- node.js v8 +
- MySQL 5.7
- npm 5.6 +

### Tech

kip101 app uses a number of open source projects to work properly:

- [node.js](https://nodejs.org) - evented I/O for the backend
- [Express](https://expressjs.com/) - fast node.js network app framework
- [Sequelize](http://docs.sequelizejs.com/) - RDBMS ORM
- [JOI](https://github.com/hapijs/joi/blob/v14.0.1/API.md) - Object-schema validation
- [Awilix](https://github.com/jeffijoe/awilix) - IoC provider
- [Swagger](https://swagger.io) - API documentation

### Installation

kip101 app requires [Node.js](https://nodejs.org/) v8+ to run.
Install the dependencies and devDependencies and start the server.

```
$ cd kip101-web-backend
$ npm install -d
```

For production environments...

```
$ npm install --production
```

Create `temp` folder in the root of project (for temporary avatar file).

```
$ mkdir temp
```

### Configuration

Copy `config/default.json` to your custom `config/${environment-name}.json` file to extend default configuration. `${environment-name}` is string value which is taken from `NODE_ENV` environment variable. All environment variables which are the same from env to env should be stored in `default.json`. All environment-specific configuration variables should be stored in `config/env-name.json` files.

### Development

1. Compile source code to common-js

```
$ npm run watch
```

2. run the server

```
$ NODE_ENV=$ENV_NAME npm start
```

### Deploying

1. Build source code using Babel

```
$ npm run build
```

2. Run database migrations

```
$ npm run migrate $ENV_NAME
```

3. Run seeders (fill DB)

```
$ npm run seed $ENV_NAME
```

Undo seeders

```
$ npm run seed-undo $ENV_NAME
```

For specify seed file

- For seed

```sh
$ node_modules/.bin/sequelize db:seed --seed [file name] --env dev
```

- For undo

```sh
$ node_modules/.bin/sequelize db:seed:undo [:all or --seed [file name]] --env dev
```

4. set environment and run server

```
$ npm start
```

    or

```
$ node ./dist/main.js
```
