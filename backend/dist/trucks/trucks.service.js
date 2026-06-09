"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrucksService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let TrucksService = class TrucksService {
    constructor() {
        this.trucks = [
            {
                id: (0, uuid_1.v4)(),
                brand: 'КАМАЗ',
                model: '5490',
                licensePlate: 'А123ВС77',
                capacity: 20,
                status: 'available',
                createdAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                brand: 'МАЗ',
                model: '6430',
                licensePlate: 'В456КМ99',
                capacity: 25,
                status: 'on_route',
                createdAt: new Date(),
            },
        ];
    }
    findAll() {
        return this.trucks;
    }
    findOne(id) {
        const truck = this.trucks.find(t => t.id === id);
        if (!truck)
            throw new common_1.NotFoundException(`Грузовик с id ${id} не найден`);
        return truck;
    }
    create(dto) {
        const newTruck = {
            id: (0, uuid_1.v4)(),
            ...dto,
            createdAt: new Date(),
        };
        this.trucks.push(newTruck);
        return newTruck;
    }
    update(id, dto) {
        const truck = this.findOne(id);
        Object.assign(truck, dto);
        return truck;
    }
    remove(id) {
        const index = this.trucks.findIndex(t => t.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Грузовик с id ${id} не найден`);
        this.trucks.splice(index, 1);
        return { message: `Грузовик ${id} удалён` };
    }
};
exports.TrucksService = TrucksService;
exports.TrucksService = TrucksService = __decorate([
    (0, common_1.Injectable)()
], TrucksService);
//# sourceMappingURL=trucks.service.js.map