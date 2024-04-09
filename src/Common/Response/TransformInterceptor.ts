import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { RspCodeEnum } from "../Response/RspCode";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          errcode: RspCodeEnum.SUCCESS.errcode,
          errmsg: RspCodeEnum.SUCCESS.errmsg,
        };
      })
    );
  }
}
