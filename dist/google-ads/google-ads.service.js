"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAdsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const googleapis_1 = require("googleapis");
const axios_1 = __importDefault(require("axios"));
let GoogleAdsService = class GoogleAdsService {
    constructor(configService) {
        this.configService = configService;
        const config = this.configService.get('googleAds');
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(config.clientId, config.clientSecret, config.redirectUri);
        this.oauth2Client.setCredentials({
            refresh_token: config.refreshToken,
        });
        this.developerToken = config.developerToken;
    }
    async getAccessToken() {
        const tokenResponse = await this.oauth2Client.getAccessToken();
        if (!tokenResponse.token) {
            throw new Error('Failed to get access token');
        }
        return tokenResponse.token;
    }
    async listCampaigns(customerId) {
        const accessToken = await this.getAccessToken();
        const query = `
      SELECT campaign.id, campaign.name, campaign.status
      FROM campaign
      ORDER BY campaign.id
    `;
        const url = `https://googleads.googleapis.com/v16/customers/${customerId}/googleAds:search`;
        const response = await axios_1.default.post(url, { query }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'developer-token': this.developerToken,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
};
exports.GoogleAdsService = GoogleAdsService;
exports.GoogleAdsService = GoogleAdsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GoogleAdsService);
