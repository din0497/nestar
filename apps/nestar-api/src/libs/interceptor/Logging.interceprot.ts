import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger: Logger = new Logger();

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const recordTime = Date.now();
        const requestType = context.getType<GqlContextType>();


        if (requestType === 'http') {
            // Develop if needed
        } else if (requestType === 'graphql') {
            const GqlContext = GqlExecutionContext.create(context)
            this.logger.log(`${this.stringify(GqlContext.getContext().req.body)}`, 'REQUEST');

            return next.handle().pipe(
                tap((context) => {
                    const responseTime = Date.now() - recordTime;
                    this.logger.log(`${this.stringify(context)} - ${responseTime}ms \n\n`, 'RESPONSE');
                }),
            );
        }


    }
    private stringify(context: ExecutionContext): string {
        console.log(typeof context);
        return JSON.stringify(context).slice(0, 75)

    }
}
