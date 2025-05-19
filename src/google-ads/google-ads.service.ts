import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import axios from 'axios';

@Injectable()
export class GoogleAdsService {
  private oauth2Client;
  private developerToken: string;

  constructor(private configService: ConfigService) {
    const config = this.configService.get('googleAds');
    this.oauth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri,
    );
    this.oauth2Client.setCredentials({
      refresh_token: config.refreshToken,
    });
    this.developerToken = config.developerToken;
  }

  async getAccessToken(): Promise<string> {
    const tokenResponse = await this.oauth2Client.getAccessToken();
    if (!tokenResponse.token) {
      throw new Error('Failed to get access token');
    }
    return tokenResponse.token;
  }

  async listCampaigns(customerId: string): Promise<any> {
    const accessToken = await this.getAccessToken();

    const query = `
      SELECT campaign.id, campaign.name, campaign.status
      FROM campaign
      ORDER BY campaign.id
    `;

    const url = `https://googleads.googleapis.com/v16/customers/${customerId}/googleAds:search`;

    const response = await axios.post(
      url,
      { query },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'developer-token': this.developerToken,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }
}
