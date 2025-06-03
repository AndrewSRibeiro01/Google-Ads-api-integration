// import { Controller, Get, Query, Res } from '@nestjs/common';
// import { Response } from 'express';
// import { google } from 'googleapis';

// @Controller()
// export class AuthController {
//     private oauth2Client = new google.auth.OAuth2({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         redirectUri: process.env.GOOGLE_REDIRECT_URI,
//     });

//     @Get('oauth2callback')
//     async handleOAuthRedirect(@Query('code') code: string, @Res() res: Response) {
//         try {
//             const { tokens } = await this.oauth2Client.getToken(code);
//             this.oauth2Client.setCredentials(tokens);

//             console.log('Tokens obtidos:', tokens);

//             return res.send('✅ Autenticado com sucesso! Você pode fechar esta aba.');
//         } catch (error) {
//             console.error('Erro ao trocar o código por tokens:', error);
//             return res.status(500).send('❌ Erro na autenticação');
//         }
//     }
// }
