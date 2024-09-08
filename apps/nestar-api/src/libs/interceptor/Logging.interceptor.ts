import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger: Logger = new Logger();

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const recordTime = Date.now();
		const requestType = context.getType<GqlContextType>();

		if (requestType === 'http') {
			// Develop rest api if needed!
			console.log('Rest Api is executed!');

			return next.handle().pipe(
				tap(() => {
					const responseTime = Date.now() - recordTime;
					this.logger.log(`${responseTime}ms`, 'RESPONSE');
					console.log('--------------------------------------------------------');
				}),
			);
		} else if (requestType === 'graphql') {
			// (1) => Print Request

			const gqlContext = GqlExecutionContext.create(context);

			console.log('--------------------------------------------------------');
			console.log('GraphQL Api is executed!');
			this.logger.log(`${this.stringify(gqlContext.getContext().req.body)}`, 'REQUEST');

			// (2) => Errors handling via GraphQL!

			// (3) => Gives response below if no errors!
			return next.handle().pipe(
				tap((context) => {
					const responseTime = Date.now() - recordTime;
					this.logger.log(`${this.stringify(context)} - ${responseTime}ms \n\n`, 'RESPONSE');
					console.log('--------------------------------------------------------');
				}),
			);
		}
	}

	private stringify(context: ExecutionContext): string {
		return JSON.stringify(context).slice(0, 75);
	}
}
