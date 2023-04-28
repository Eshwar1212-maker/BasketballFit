/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutService } from './workout.service';



@Controller('workouts')
export class WorkoutController {
  constructor(private readonly service: WorkoutService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return await this.service.create(createWorkoutDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() UpdateWorkoutDto: UpdateWorkoutDto) {
    return await this.service.update(id, UpdateWorkoutDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
