import { Controller, Get, Query } from '@nestjs/common';
import { TagManagerService } from './tagmanager.service';

@Controller('tagmanager')
export class TagManagerController {
  constructor(private readonly tagManagerService: TagManagerService) {}

  @Get('create-container')
  async createContainer(@Query('access_token') accessToken: string) {
    const accounts = await this.tagManagerService.listAccounts(accessToken);
    if (!accounts.length) {
      return { message: 'Nenhuma conta GTM encontrada.' };
    }

    const accountId = accounts[0].accountId;

    const container = await this.tagManagerService.createContainer(accessToken, accountId);

    return {
      message: 'Container criado com sucesso!',
      container,
    };
  }
}
