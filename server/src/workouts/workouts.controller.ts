/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';

@Controller('workouts')
export class WorkoutsController {
  @Get()
    getWorkouts() {
    return [];
    }
}
