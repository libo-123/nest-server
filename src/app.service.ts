import { Injectable } from '@nestjs/common';
import {page} from './page/index'
@Injectable()
export class AppService {
  hello(): string {
    return page();
  }
}
