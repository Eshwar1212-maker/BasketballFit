/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  providers: [WorkoutService],
  controllers: [WorkoutController],
  imports: [
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]),
  ],
})
export class WorkoutModule {}
