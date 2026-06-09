import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
export declare class TrucksController {
    private readonly trucksService;
    constructor(trucksService: TrucksService);
    findAll(): import("./entities/truck.entity").Truck[];
    findOne(id: string): import("./entities/truck.entity").Truck;
    create(dto: CreateTruckDto): import("./entities/truck.entity").Truck;
    update(id: string, dto: UpdateTruckDto): import("./entities/truck.entity").Truck;
    remove(id: string): {
        message: string;
    };
}
