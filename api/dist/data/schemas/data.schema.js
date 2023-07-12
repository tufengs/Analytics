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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSchema = exports.Data = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Data = class Data {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Data.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Data.prototype, "APP_ID", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Data.prototype, "VISITOR_ID", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Data.prototype, "SESSION_ID", void 0);
Data = __decorate([
    (0, mongoose_1.Schema)()
], Data);
exports.Data = Data;
exports.DataSchema = mongoose_1.SchemaFactory.createForClass(Data);
//# sourceMappingURL=data.schema.js.map