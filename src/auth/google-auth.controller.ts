import { Controller, Get, Query, Res } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { Response } from 'express';

@Controller('auth')
export class GoogleAuthController {
    constructor(private readonly googleAuthService: GoogleAuthService) { }

    @Get('login')
    login(@Res() res: Response) {
        const url = this.googleAuthService.generateAuthUrl();
        return res.redirect(url);
    }

    @Get('callback')
    async callback(@Query('code') code: string, @Res() res: Response) {
        try {
            const tokens = await this.googleAuthService.getTokensFromCode(code);
            console.log('Tokens obtidos:', tokens);
            return res.send('✅ Autenticado com sucesso!');
        } catch (error) {
            console.error('Erro ao trocar o código por tokens:', error);
            return res.status(500).send('❌ Erro na autenticação');
        }
    }
}
