

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
https://juejin.cn/post/7386875278423638051
https://nest.nodejs.cn/recipes/passport#%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81%E8%A6%81%E6%B1%82

import * as crypto from 'crypto'; //导入加密 系统原来就有

1. 客户端用户进行登录请求; 
2. 服务端拿到请求，根据参数查询用户表; 
3. 若匹配到用户，将用户信息进行签证，并颁发 Token;

4. 客户端拿到 Token 后，存储至某一地方，在之后的请求中都带上 Token ;
5. 服务端接收到带 Token 的请求后，直接根据签证进行校验，无需再查询用户信息;

观测
npm i passport passport-jwt passport-local @nestjs/passport @nestjs/jwt -S

本地策略暂时不写

这里也说一下 JWT 的缺点，主要是无法在使用同一账号登录的情况下，后登录的，挤掉先登录的，也 就是让先前的 Token 失效，从而保证信息安全(至少我是没查到相关解决方法，如果有大神解决过该 问题，还请指点)，

只能使用一些其他黑科技挤掉 Token(如 Redis)。

## 日志
用nestjs自带的日志模块太简化了，用这个
npm i log4js stacktrace-js -S

中间件 middleware承接日志系统

拦截器 拦截返回数据

过滤器 过滤错误信息记录

还是用官方的吧

## 文档
已经够了，但是还是需要补充。

## 补缺
依赖关系需要 清晰下

## 测试


## 部署
搭建node环境
https://blog.csdn.net/qq_63358859/article/details/139320702

yum install -g pm2  用pm2启动

https://juejin.cn/post/7367630980944035878  用docker部署 做服务迁移





