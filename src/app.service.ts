import { Injectable } from '@nestjs/common';
import {page} from './modules/page/index'
@Injectable()
export class AppService {
  hello(): string {
    return page();
  }
}
