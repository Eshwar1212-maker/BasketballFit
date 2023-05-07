import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillWorkoutsService } from './skill-workouts.service';
import { SkillWorkoutsController } from './skill-workouts.controller';
import { SkillWorkout, SkillWorkoutSchema } from './schema/skill-workout.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SkillWorkout.name, schema: SkillWorkoutSchema }]),
  ],
  providers: [SkillWorkoutsService],
  controllers: [SkillWorkoutsController],
})
export class SkillWorkoutModule {}
