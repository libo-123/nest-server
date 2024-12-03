

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## 数据库
npm i sequelize sequelize-typescript mysql2 -S

强烈建议使用写原生 SQL 语句去操作数据库。 通用性更高

## JWT
import * as crypto from 'crypto'; //导入加密 系统原来就有

1. 客户端用户进行登录请求; 
2. 服务端拿到请求，根据参数查询用户表; 
3. 若匹配到用户，将用户信息进行签证，并颁发 Token;

4. 客户端拿到 Token 后，存储至某一地方，在之后的请求中都带上 Token ;
5. 服务端接收到带 Token 的请求后，直接根据签证进行校验，无需再查询用户信息;

观测
npm i passport passport-jwt passport-local @nestjs/passport @nestjs/jwt -S

本地策略暂时不写




## 补缺
依赖关系需要 清晰下



