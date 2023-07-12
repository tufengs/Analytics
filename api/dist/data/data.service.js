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
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const data_schema_1 = require("./schemas/data.schema");
let DataService = class DataService {
    constructor(dataModel) {
        this.dataModel = dataModel;
    }
    create(createDatumDto) {
        return this.dataModel.find();
    }
    findAll() {
        return this.dataModel.find();
    }
    findOne(id) {
        return `This action returns a #${id} datum`;
    }
    update(id, updateDatumDto) {
        return `This action updates a #${id} datum`;
    }
    remove(id) {
        return `This action removes a #${id} datum`;
    }
};
DataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(data_schema_1.Data.name, 'data')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map