import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable} from "rxjs";
import { map } from 'rxjs/operators'

interface ClassConstructor{
  new(...args: any[]): {}
}


export function Serialize(dto: ClassConstructor){
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{
  constructor(private dto: ClassConstructor){}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before the request is handled by the handler
    // console.log(`before handler`, context)

    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent
        // console.log(`running before the response`, data)
        return  plainToInstance(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
    )
  }
}