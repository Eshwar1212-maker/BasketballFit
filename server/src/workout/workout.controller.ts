/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch
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
  @Get('user/:firebaseUserId/month/:month')
  async getUserWorkoutsByMonth(@Param('firebaseUserId') firebaseUserId: string, @Param('month') month: string, @Param('year') year: string) {
    console.log('getUserWorkoutsByMonth called with:', firebaseUserId, month, year);
    return this.service.getUserWorkoutsByMonth(firebaseUserId, `${year}-${month}`);
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
  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return await this.service.partialUpdate(id, updateWorkoutDto);
  }

}
