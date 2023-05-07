import { BaseWorkoutDto } from "./base-skill-workout.dto";


export class CreateSkillWorkoutDto extends BaseWorkoutDto {
    readonly name: string;
    readonly description: string;
    readonly exercises: string[];
    readonly createdAt: Date;
  }
  