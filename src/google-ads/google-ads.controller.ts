import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { GoogleAdsService } from './google-ads.service';

@Controller('google-ads')
export class GoogleAdsController {
  constructor(private readonly googleAdsService: GoogleAdsService) {}

  @Get('campaigns')
  async getCampaigns(@Query('customerId') customerId: string) {
    if (!customerId) {
      throw new BadRequestException('customerId query parameter is required');
    }
    return this.googleAdsService.listCampaigns(customerId);
  }
}
