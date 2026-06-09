import { PartialType } from '@nestjs/mapped-types';
import { CreateTruckDto } from './create-truck.dto';

// PartialType делает все поля необязательными — идеально для PATCH
export class UpdateTruckDto extends PartialType(CreateTruckDto) {}