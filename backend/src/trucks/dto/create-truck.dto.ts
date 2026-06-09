import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsEnum,
    Min,
    Matches,
  } from 'class-validator';
  import { TruckStatus } from '../entities/truck.entity';
  
  export class CreateTruckDto {
    @IsString()
    @IsNotEmpty({ message: 'Марка обязательна' })
    brand: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Модель обязательна' })
    model: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Гос. номер обязателен' })
    @Matches(/^[А-ЯA-Z]{1}\d{3}[А-ЯA-Z]{2}\d{2,3}$/, {
      message: 'Неверный формат гос. номера (пример: А123ВС77)',
    })
    licensePlate: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0.1)
    capacity?: number;
  
    @IsEnum(['available', 'on_route'], { message: 'Статус: available или on_route' })
    status: TruckStatus;
  }