import { TagManagerService } from './../tagmanager/tagmanager.service';
import { GoogleAuthService } from './../auth/google-auth.service';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class GoogleAuthController {
    constructor(
        private readonly GoogleAuthService: GoogleAuthService,
        private readonly TagManagerService: TagManagerService,
    ) {}

    @Get('login')
    async login(@Res() res: Response) {
        const url = this.GoogleAuthService.generateAuthUrl();
        return res.redirect(url);
    }

    @Get('callback')
    async callback(@Query('code') code: string, @Res() res: Response) {
        const { tokens } = await this.GoogleAuthService.getTokensFromCode(code);
        console.log("Token de acesso:", tokens);

        if (!tokens.access_token) {
            return res.status(400).json({ message: 'Token de acesso ausente' });
        }

        const accounts = await this.TagManagerService.listAccountsAndContainers(tokens);

        if (!accounts.length) {
            return res.status(404).json({ message: 'Nenhuma conta GTM encontrada para o usuário.' });
        }

        return res.json({
            message: 'Contas e containers',
            data: accounts,
        });
    }
}
