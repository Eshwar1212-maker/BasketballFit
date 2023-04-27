import { BaseWorkoutDto } from './base-workout.dto';

export class UpdateTodoDto extends BaseWorkoutDto {
  completedAt: Date;
}