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
exports.CreateTruckDto = void 0;
const class_validator_1 = require("class-validator");
class CreateTruckDto {
}
exports.CreateTruckDto = CreateTruckDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Марка обязательна' }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Модель обязательна' }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Гос. номер обязателен' }),
    (0, class_validator_1.Matches)(/^[А-ЯA-Z]{1}\d{3}[А-ЯA-Z]{2}\d{2,3}$/, {
        message: 'Неверный формат гос. номера (пример: А123ВС77)',
    }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "licensePlate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "capacity", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['available', 'on_route'], { message: 'Статус: available или on_route' }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "status", void 0);
//# sourceMappingURL=create-truck.dto.js.map