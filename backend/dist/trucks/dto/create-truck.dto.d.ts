import { TruckStatus } from '../entities/truck.entity';
export declare class CreateTruckDto {
    brand: string;
    model: string;
    licensePlate: string;
    capacity?: number;
    status: TruckStatus;
}
