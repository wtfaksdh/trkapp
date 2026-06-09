export type TruckStatus = 'available' | 'on_route';

export interface Truck {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  capacity?: number;
  status: TruckStatus;
  createdAt: string;
}

export interface CreateTruckData {
  brand: string;
  model: string;
  licensePlate: string;
  capacity?: number;
  status: TruckStatus;
}

export type Role = 'admin' | 'user';