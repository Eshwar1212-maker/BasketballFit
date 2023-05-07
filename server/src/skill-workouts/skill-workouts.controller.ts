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
  import { CreateSkillWorkoutDto } from './dto/create-skill-workout.dto';
  import { UpdateSkillWorkoutDto } from './dto/update-skill-workout.dto';
  import { SkillWorkoutsService } from './skill-workouts.service';
  
  @Controller('skill-workouts')
  export class SkillWorkoutsController {
    constructor(private readonly service: SkillWorkoutsService) {}
  
    @Post(':firebaseUserId')
    async create(
      @Param('firebaseUserId') firebaseUserId: string,
      @Body() createSkillWorkoutDto: CreateSkillWorkoutDto,
    ) {
      return await this.service.create(createSkillWorkoutDto, firebaseUserId);
    }
  
  
  
    @Get('user/:firebaseUserId')
    async getUserSkillWorkouts(@Param('firebaseUserId') firebaseUserId: string) {
      return this.service.getUserSkillWorkouts(firebaseUserId);
    }
  
    @Get('user/:firebaseUserId/date/:date')
    async getUserSkillWorkoutsByDate(@Param('firebaseUserId') firebaseUserId: string, @Param('date') date: string) {
      return this.service.getUserWorkoutsByDate(firebaseUserId, date);
    }
  
  
    @Get(':id')
    async findOne(@Param('id') id: string, @Param('firebaseUserId') firebaseUserId: string) {
      return await this.service.findOne(id, firebaseUserId);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string, @Param('firebaseUserId') firebaseUserId: string) {
      return await this.service.delete(id);
    }
  
  }