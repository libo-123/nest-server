import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '../../utils/log4js';
import { Request, Response } from 'express';
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     const code = res.statusCode; // 响应状态码
//     next();
//     // 组装日志信息
//     const logFormat = `
//       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//           Request original url: ${req.originalUrl}
//           Method: ${req.method}
//           IP: ${req.ip}
//           Status code: ${code}
//           Parmas: ${JSON.stringify(req.params)}
//           Query: ${JSON.stringify(req.query)}
//           Body: ${JSON.stringify(req.body)} \n
//       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//         `;
//     // 根据状态码，进行日志类型区分
//     if (code >= 500) {
//       Logger.error(logFormat);
//     } else if (code >= 400) {
//       Logger.warn(logFormat);
//     } else {
//       Logger.access(logFormat);
//       Logger.log(logFormat);
//     }
//   }
// }


// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; // 响应状态码
  next();
  // 组装日志信息
  const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)} \n
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> `;
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}