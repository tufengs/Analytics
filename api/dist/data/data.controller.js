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
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("./data.service");
const create_datum_dto_1 = require("./dto/create-datum.dto");
const update_datum_dto_1 = require("./dto/update-datum.dto");
let DataController = class DataController {
    constructor(dataService) {
        this.dataService = dataService;
    }
    create(headers, createDatumDto) {
        const app_id = headers['app-id'];
        const app_secret = headers['app-secret'];
        createDatumDto = Object.assign(Object.assign({}, createDatumDto), { app_id, app_secret });
        return this.dataService.create(createDatumDto);
    }
    findAll(headers) {
        const app_id = headers['app-id'];
        const app_secret = headers['app-secret'];
        return this.dataService.findAllByApp(app_id, app_secret);
    }
    findAllAdmin() {
        return this.dataService.findAll();
    }
    findOne(id) {
        return this.dataService.findOne(+id);
    }
    update(headers, id, updateDatumDto) {
        const app_id = headers['app-id'];
        const app_secret = headers['app-secret'];
        return this.dataService.update(+id, updateDatumDto);
    }
    remove(id) {
        return this.dataService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_datum_dto_1.CreateDatumDto]),
    __metadata("design:returntype", void 0)
], DataController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DataController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_datum_dto_1.UpdateDatumDto]),
    __metadata("design:returntype", void 0)
], DataController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DataController.prototype, "remove", null);
DataController = __decorate([
    (0, common_1.Controller)('api/events'),
    __metadata("design:paramtypes", [data_service_1.DataService])
], DataController);
exports.DataController = DataController;
//# sourceMappingURL=data.controller.js.map