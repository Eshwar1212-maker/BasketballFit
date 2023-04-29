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
  constructor(private readonly service: WorkoutService) { }

  @Post(':firebaseUserId')
  async create(
    @Param('firebaseUserId') firebaseUserId: string,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    return await this.service.create(firebaseUserId, createWorkoutDto);
  }

  @Get('user/:firebaseUserId')
  async getUserWorkouts(@Param('firebaseUserId') firebaseUserId: string) {
    return this.service.getUserWorkouts(firebaseUserId);
  }
  @Get('user/:firebaseUserId/date/:date')
  async getUserWorkoutsByDate(@Param('firebaseUserId') firebaseUserId: string, @Param('date') date: string) {
    return this.service.getUserWorkoutsByDate(firebaseUserId, date);
  }
  @Delete('user/:firebaseUserId')
  async deleteAllUserWorkouts(@Param('firebaseUserId') firebaseUserId: string) {
    return this.service.deleteAllUserWorkouts(firebaseUserId);
  }
  @Get()
  async index() {
    return await this.service.findAll();
  }
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
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
