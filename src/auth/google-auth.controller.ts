import { Controller, Get, Query, Res } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { TagManagerService } from '../tagmanager/tagmanager.service';
import { Response } from 'express';

@Controller('auth')
export class GoogleAuthController {
    constructor(
        private readonly googleAuthService: GoogleAuthService,
        private readonly tagManagerService: TagManagerService,
    ) { }

    @Get('login')
    async login(@Res() res: Response) {
        const url = this.googleAuthService.generateAuthUrl();
        return res.redirect(url);
    }

    @Get('callback')
    async callback(@Query('code') code: string, @Res() res: Response) {
        const { tokens } = await this.googleAuthService.getTokensFromCode(code);
        console.log("Token de acesso:", tokens);

        if (!tokens.access_token) {
            return res.status(400).json({ message: 'Token de acesso ausente' });
        }

        const accounts = await this.tagManagerService.listAccounts(tokens.access_token);

        if (!accounts.length) {
            return res.status(404).json({ message: 'Nenhuma conta GTM encontrada para o usuário.' });
        }

        const accountId = accounts[0].accountId;
        const container = await this.tagManagerService.createContainer(tokens.access_token, accountId);

        return res.json({
            message: 'Container criado com sucesso!',
            container,
        });
    }
}
