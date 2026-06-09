import {
    Controller, Get, Post, Patch, Delete,
    Param, Body, UseGuards,
  } from '@nestjs/common';
  import { TrucksService } from './trucks.service';
  import { CreateTruckDto } from './dto/create-truck.dto';
  import { UpdateTruckDto } from './dto/update-truck.dto';
  import { RolesGuard } from '../auth/auth.guard';
  import { Roles } from '../auth/roles.decorator';
  
  @Controller('trucks')
  @UseGuards(RolesGuard)
  export class TrucksController {
    constructor(private readonly trucksService: TrucksService) {}
  
    // доступно всем (admin и user)
    @Get()
    findAll() {
      return this.trucksService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.trucksService.findOne(id);
    }
  
    // только admin
    @Post()
    @Roles('admin')
    create(@Body() dto: CreateTruckDto) {
      return this.trucksService.create(dto);
    }
  
    @Patch(':id')
    @Roles('admin')
    update(@Param('id') id: string, @Body() dto: UpdateTruckDto) {
      return this.trucksService.update(id, dto);
    }
  
    @Delete(':id')
    @Roles('admin')
    remove(@Param('id') id: string) {
      return this.trucksService.remove(id);
    }
  }