import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleAdsModule } from './google-ads/google-ads.module';
import googleAdsConfig from './config/google-ads.config';
import { GoogleAuthService } from './auth/google-auth.service';
import { GoogleAuthController } from './auth/google-auth.controller';
import { GoogleAdsService } from './google-ads/google-ads.service';
import { TagManagerService } from './tagmanager/tagmanager.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleAdsConfig],
    }),
    GoogleAdsModule,
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleAdsService, TagManagerService],
})
export class AppModule { };