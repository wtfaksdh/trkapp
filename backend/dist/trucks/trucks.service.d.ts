import { Truck } from './entities/truck.entity';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
export declare class TrucksService {
    private trucks;
    findAll(): Truck[];
    findOne(id: string): Truck;
    create(dto: CreateTruckDto): Truck;
    update(id: string, dto: UpdateTruckDto): Truck;
    remove(id: string): {
        message: string;
    };
}
