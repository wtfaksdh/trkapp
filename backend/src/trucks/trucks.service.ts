import { Injectable, NotFoundException } from '@nestjs/common';
import { Truck } from './entities/truck.entity';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrucksService {
  // хранение в памяти — сбрасывается при перезапуске
  private trucks: Truck[] = [
    {
      id: uuidv4(),
      brand: 'КАМАЗ',
      model: '5490',
      licensePlate: 'А123ВС77',
      capacity: 20,
      status: 'available',
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      brand: 'МАЗ',
      model: '6430',
      licensePlate: 'В456КМ99',
      capacity: 25,
      status: 'on_route',
      createdAt: new Date(),
    },
  ];

  findAll(): Truck[] {
    return this.trucks;
  }

  findOne(id: string): Truck {
    const truck = this.trucks.find(t => t.id === id);
    if (!truck) throw new NotFoundException(`Грузовик с id ${id} не найден`);
    return truck;
  }

  create(dto: CreateTruckDto): Truck {
    const newTruck: Truck = {
      id: uuidv4(),
      ...dto,
      createdAt: new Date(),
    };
    this.trucks.push(newTruck);
    return newTruck;
  }

  update(id: string, dto: UpdateTruckDto): Truck {
    const truck = this.findOne(id);
    Object.assign(truck, dto);
    return truck;
  }

  remove(id: string): { message: string } {
    const index = this.trucks.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException(`Грузовик с id ${id} не найден`);
    this.trucks.splice(index, 1);
    return { message: `Грузовик ${id} удалён` };
  }
}