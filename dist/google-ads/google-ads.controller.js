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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAdsController = void 0;
const common_1 = require("@nestjs/common");
const google_ads_service_1 = require("./google-ads.service");
let GoogleAdsController = class GoogleAdsController {
    constructor(googleAdsService) {
        this.googleAdsService = googleAdsService;
    }
    async getCampaigns(customerId) {
        if (!customerId) {
            throw new common_1.BadRequestException('customerId query parameter is required');
        }
        return this.googleAdsService.listCampaigns(customerId);
    }
};
exports.GoogleAdsController = GoogleAdsController;
__decorate([
    (0, common_1.Get)('campaigns'),
    __param(0, (0, common_1.Query)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoogleAdsController.prototype, "getCampaigns", null);
exports.GoogleAdsController = GoogleAdsController = __decorate([
    (0, common_1.Controller)('google-ads'),
    __metadata("design:paramtypes", [google_ads_service_1.GoogleAdsService])
], GoogleAdsController);
