import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class GoogleAdsService {
    private oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI,
    );

    private tokens: any = null;
    private tokenPath = path.join(__dirname, '..', '..', 'tokens.json');

    public setTokens(tokens: any) {
        this.tokens = tokens;
        this.oauth2Client.setCredentials(tokens);
    }

    async listCampaigns(customerId: string) {
        if (!this.tokens) {
            throw new Error('Usuário não autenticado');
        }

        const accessToken = this.tokens.access_token;
        const developerToken = process.env.GOOGLE_DEVELOPER_TOKEN;
        if (!developerToken) {
            throw new Error('Variável de ambiente GOOGLE_DEVELOPER_TOKEN não definida.');
        }

        const url = `https://googleads.googleapis.com/v19/customers/${customerId}/googleAds:search`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'developer-token': developerToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'SELECT campaign.id, campaign.name FROM campaign LIMIT 10',
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Erro ao buscar campanhas:', errorBody);
            throw new Error('Erro ao buscar campanhas');
        }

        const data = await response.json();
        return data;
    }


    async onModuleInit() {
        await this.loadTokensFromFile();
    }

    private async loadTokensFromFile() {
        try {
            const content = await fs.readFile(this.tokenPath, 'utf-8');
            this.tokens = JSON.parse(content);
            this.oauth2Client.setCredentials(this.tokens);

            await this.refreshAccessTokenIfNeeded();

            console.log('✅ Tokens carregados do arquivo');
        } catch (err) {
            console.warn('⚠️ Nenhum token salvo encontrado. Faça login pelo navegador.');
        }
    }

    private async refreshAccessTokenIfNeeded() {
        try {
            const newTokens = await this.oauth2Client.getAccessToken();
            if (newTokens.res?.data?.access_token) {
                this.tokens.access_token = newTokens.token;
                await this.saveTokensToFile(this.tokens);
                console.log('🔁 Token atualizado com sucesso');
            }
        } catch (error) {
            console.error('❌ Erro ao atualizar o token:', error);
        }
    }

    async saveTokensToFile(tokens: any) {
        this.tokens = tokens;
        this.oauth2Client.setCredentials(tokens);
        await fs.writeFile(this.tokenPath, JSON.stringify(tokens, null, 2));
        console.log('💾 Tokens salvos em arquivo');
    }

    getAuthUrl(): string {
        const scopes = ['https://www.googleapis.com/auth/adwords'];
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent',
        });
    }

    async handleOAuthCode(code: string) {
        const { tokens } = await this.oauth2Client.getToken(code);
        if (!tokens.refresh_token) {
            throw new Error('O token de atualização não foi retornado. Use `prompt=consent` e `access_type=offline`.');
        }
        await this.saveTokensToFile(tokens);
        return tokens;
    }
}
