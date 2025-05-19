import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleAdsModule } from './google-ads/google-ads.module';
import googleAdsConfig from './config/google-ads.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleAdsConfig],
    }),
    GoogleAdsModule,
  ],
})
export class AppModule {}
