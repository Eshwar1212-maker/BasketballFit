import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseWorkoutDto } from './dto/base-skill-workout.dto';
import { SkillWorkoutDocument, SkillWorkout } from './schema/skill-workout.schema';

@Injectable()
export class SkillWorkoutsService {
    constructor(@InjectModel(SkillWorkout.name) private workoutModel: Model<SkillWorkoutDocument>) {}

  // Create a skill workout
  async create(createWorkoutDto: BaseWorkoutDto, firebaseUserId: string): Promise<SkillWorkout> {
    const createdWorkout = new this.workoutModel({
      ...createWorkoutDto,
      firebaseUserId,
      createdAt: new Date(),
    });
    return createdWorkout.save();
  }
  async getUserSkillWorkouts(firebaseUserId: string): Promise<SkillWorkout[]> {
    return this.workoutModel.find({ firebaseUserId }).exec();
  }
  
  async getUserWorkoutsByDate(firebaseUserId: string, date: string) {
    const result = await this.workoutModel.find({ firebaseUserId: firebaseUserId, date: date }).exec();
    console.log('Result:', result);
    return result;
  }
  // Get all skill workouts for a user
  async findAll(firebaseUserId: string): Promise<SkillWorkout[]> {
    return this.workoutModel.find({ firebaseUserId }).exec();
  }

  // Get a specific skill workout by ID
  async findOne(id: string, firebaseUserId: string): Promise<SkillWorkout> {
    return this.workoutModel.findOne({ _id: id, firebaseUserId }).exec();
  }


  // Delete a specific skill workout by ID
  async delete(id: string): Promise<SkillWorkout> {
    console.log('id:', id);

    return await this.workoutModel.findByIdAndDelete(id).exec();
  }
}
