import { IsString, IsNotEmpty, IsEmail, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно' })
  name: string;

  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Email обязателен' })
  email: string;

  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(100)
  age?: number;
}