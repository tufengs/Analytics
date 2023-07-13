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
const event_schema_1 = require("./schemas/event.schema");
let DataService = class DataService {
    constructor(connection) {
        this.connection = connection;
    }
    async create(createDatumDto) {
        console.log(createDatumDto);
        return this.connection.model(event_schema_1.Event.name).create(createDatumDto);
    }
    findAllByApp(app_id, app_secret) {
        return this.connection.model(event_schema_1.Event.name).find({ app_id, app_secret });
    }
    findAll() {
        return this.connection.model(event_schema_1.Event.name).find({});
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
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map