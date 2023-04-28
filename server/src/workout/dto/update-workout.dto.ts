import { BaseWorkoutDto } from './base-workout.dto';

export class UpdateWorkoutDto extends BaseWorkoutDto {
  completedAt: Date;
}
