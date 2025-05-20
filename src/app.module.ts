import { Module } from '@nestjs/common';
import { AuthController } from './google-ads/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { GoogleAdsService } from './google-ads/google-ads.service';
import { GoogleAdsController } from './google-ads/google-ads.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AuthController, GoogleAdsController],
    providers: [GoogleAdsService],
})
export class AppModule { }
