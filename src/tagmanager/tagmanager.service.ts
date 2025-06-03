import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TagManagerService {
  private readonly baseUrl = 'https://www.googleapis.com/tagmanager/v2';

  async listAccounts(accessToken: string) {
    const res = await axios.get(`${this.baseUrl}/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.account || [];
  }

  async createContainer(accessToken: string, accountId: string) {
    const res = await axios.post(
      `${this.baseUrl}/accounts/${accountId}/containers`,
      {
        name: 'Container criado via API',
        usageContext: ['web'],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  }
}
