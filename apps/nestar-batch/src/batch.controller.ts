import { Controller, Get, Logger } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { BATCH_ROLLBACK, BATCH_TOP_AGENTS, BATCH_TOP_PROPERTIES } from './lib/config';

@Controller()
export class BatchController {
	private logger: Logger = new Logger(`BatchController`);

	constructor(private readonly batchService: BatchService) {}

	@Timeout(1000)
	handleTimeout() {
		this.logger.debug('BATCH SERVER READY!');
	}

	@Cron('56 * * * * *', { name: BATCH_ROLLBACK })
	public async batchRollbak() {
		try {
			this.logger['context'] = BATCH_ROLLBACK;
			this.logger.debug('	EXECUTED!');
			await this.batchService.batchRollback();
		} catch (err) {
			this.logger.error;
		}
	}

	@Cron('57 * * * * *', { name: BATCH_TOP_PROPERTIES })
	public async batchTopProperties() {
		try {
			this.logger['context'] = BATCH_TOP_PROPERTIES;
			this.logger.debug('Properties:EXECUTED!');
			await this.batchService.batchProperties();
		} catch (err) {
			this.logger.error;
		}
	}

	@Cron('58 * * * * *', { name: BATCH_TOP_AGENTS })
	public async batchTopAgents() {
		try {
			this.logger['context'] = BATCH_TOP_AGENTS;
			this.logger.debug('Agents: EXECUTED!');
			await this.batchService.batchAgents();
		} catch (err) {
			this.logger.error;
		}
	}

	/* 	@Interval(1000)
	handleInterval() {
		this.logger.debug('interval test')
	} */
	@Get()
	getHello(): string {
		return this.batchService.getHello();
	}
}
