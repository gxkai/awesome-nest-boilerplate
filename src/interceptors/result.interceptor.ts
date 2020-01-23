import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResponse<T> {
    code: number;
    data: T;
    message: string;
}

@Injectable()
export class ResultInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<IResponse<T>> {
        return next
            .handle()
            .pipe(map(data => ({ data, code: 0, message: 'ok' })));
    }
}
