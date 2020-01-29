import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
    public constructor(private readonly _logger: Logger) {}

    public intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response> {
        const startTime = new Date().getMilliseconds();
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            map(data => {
                const responseStatus =
                    request.method === 'POST'
                        ? HttpStatus.CREATED
                        : HttpStatus.OK;
                this._logger.log(
                    `${this._getTimeDelta(startTime)} ${
                        request.ip
                    } ${responseStatus} ${request.method} ${this._getUrl(
                        request,
                    )} ${JSON.stringify(request.body)} ${JSON.stringify(
                        request.query,
                    )} ${JSON.stringify(request.params)} ${JSON.stringify(
                        data,
                    )}`,
                );
                return data;
            }),
            catchError(err => {
                // Log fomat inspired by the Squid docs
                // See https://docs.trafficserver.apache.org/en/6.1.x/admin-guide/monitoring/logging/log-formats.en.html
                this._logger.error(
                    `${this._getTimeDelta(startTime)} ${request.ip} ${
                        err.status
                    } ${request.method} ${this._getUrl(request)}`,
                    JSON.stringify(err),
                );
                return throwError(err);
            }),
        );
    }

    private _getTimeDelta(startTime: number): number {
        return new Date().getMilliseconds() - startTime;
    }

    private _getUrl(request: Request): string {
        return `${request.protocol}://${request.get('host')}${
            request.originalUrl
        }`;
    }
}
