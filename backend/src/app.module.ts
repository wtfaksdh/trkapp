import { Module } from '@nestjs/common';
import { TrucksModule } from './trucks/trucks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TrucksModule, UsersModule],
})
export class AppModule {}