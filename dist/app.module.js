"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const google_ads_module_1 = require("./google-ads/google-ads.module");
const google_ads_config_1 = __importDefault(require("./config/google-ads.config"));
const google_auth_service_1 = require("./auth/google-auth.service");
const google_auth_controller_1 = require("./auth/google-auth.controller");
const google_ads_service_1 = require("./google-ads/google-ads.service");
const tagmanager_controller_1 = require("./tagmanager/tagmanager.controller");
const tagmanager_service_1 = require("./tagmanager/tagmanager.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [google_ads_config_1.default],
            }),
            google_ads_module_1.GoogleAdsModule,
        ],
        controllers: [google_auth_controller_1.GoogleAuthController, tagmanager_controller_1.TagManagerController],
        providers: [google_auth_service_1.GoogleAuthService, google_ads_service_1.GoogleAdsService, tagmanager_service_1.TagManagerService],
    })
], AppModule);
;
