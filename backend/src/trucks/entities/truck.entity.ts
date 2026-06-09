export type TruckStatus = 'available' | 'on_route';

export class Truck {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  capacity?: number; // грузоподъёмность в тоннах, необязательное
  status: TruckStatus;
  createdAt: Date;
}