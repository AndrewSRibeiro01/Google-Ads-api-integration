import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import googleAdsConfig from '../config/google-ads.config';
import { GoogleAdsService } from './google-ads.service';
import { GoogleAdsController } from './google-ads.controller';

@Module({
  imports: [ConfigModule.forFeature(googleAdsConfig)],
  providers: [GoogleAdsService],
  controllers: [GoogleAdsController],
})
export class GoogleAdsModule {}
