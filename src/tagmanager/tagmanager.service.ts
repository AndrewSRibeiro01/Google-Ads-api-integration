import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class TagManagerService {
  async listAccountsAndContainers(tokens: any) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials(tokens);

    const tagmanager = google.tagmanager({ version: 'v2', auth });

    const accountsRes = await tagmanager.accounts.list();
    const accounts = accountsRes.data.account;

    const containers = [];

    if (accounts) {
      for (const account of accounts) {
        const containersRes = await tagmanager.accounts.containers.list({
          parent: `accounts/${account.accountId}`,
        });

        containers.push({
          accountId: account.accountId,
          accountName: account.name,
          containers: containersRes.data.container,
        });
      }
    }

    return containers;
  }
}
