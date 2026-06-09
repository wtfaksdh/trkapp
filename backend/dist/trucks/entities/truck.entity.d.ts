export type TruckStatus = 'available' | 'on_route';
export declare class Truck {
    id: string;
    brand: string;
    model: string;
    licensePlate: string;
    capacity?: number;
    status: TruckStatus;
    createdAt: Date;
}
