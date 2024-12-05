

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


### pm2
通过yum安装pm2
yum install -g pm2  用pm2启动

通过npm全局安装PM2
npm install pm2 -g

常用命令：
pm2 start index.js  --name <服务名称>  #启动服务
pm2 list
pm2 stop my-server
pm2 restart all
pm2 delete my-server
pm2 show my-server
pm2 logs

‌启动应用‌：
pm2 start app.js：启动一个Node.js应用。
pm2 start app.js --name my-api：启动一个应用并命名为my-api。
pm2 start app.js -i 0：根据CPU核心数启动进程。
pm2 start app.js --watch：实时监控app.js，文件变动时自动重启应用‌12。
‌查看进程‌：
pm2 list或pm2 ls：列出所有由PM2启动的应用程序。
pm2 show [app-name或id]：显示指定应用程序的所有信息。
pm2 describe [app-name或id]：查看特定进程的详细信息‌12。
‌监控和管理‌：
pm2 monit：显示每个应用程序的CPU和内存占用情况。
pm2 logs [--raw]：显示所有进程的日志。
pm2 logs [app-name或id]：显示指定应用程序的日志。
pm2 flush：清空所有日志文件。
pm2 reloadLogs：重新加载所有日志‌12。
‌停止、重启和重载‌：
pm2 stop all：停止所有进程。
pm2 stop [app-name或id]：停止指定的进程。
pm2 restart all：重启所有进程。
pm2 restart [app-name或id]：重启指定的进程。
pm2 reload all：无停机时间重新加载所有进程（适用于网络应用）‌12。
‌删除进程‌：
pm2 delete all：删除所有进程。
pm2 delete [app-name或id]：删除指定的进程‌12。
‌其他命令‌：
pm2 update pm2：更新PM2版本。
pm2 serve [path] [port]：使用PM2搭建静态文件服务器‌13。
‌PM2的安装和基本使用‌：


### nginx
sudo systemctl status nginx # nginx当前状态
sudo systemctl reload nginx # 重新加载 nginx
sudo systemctl restart nginx # 重启nginx
 
sudo nginx -t   # 检查语法
nginx           # 启动
nginx -s reload # 重启
nginx -s stop   # 关闭进程
nginx -s quit   # 平滑关闭nginx
nginx -V        # 查看nginx的安装状态，

netstat -anput | grep nginx # 查看nginx的进程

https://blog.csdn.net/u012702547/article/details/142452250 # nginx 配置详解

### docker
后续有机会再升级吧
https://juejin.cn/post/7367630980944035878  用docker部署 做服务迁移





