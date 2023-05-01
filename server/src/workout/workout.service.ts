/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './schemas/workout.schema';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name) private readonly model: Model<WorkoutDocument>,
  ) { }

  async findAll(): Promise<Workout[]> {
    return await this.model.find().exec();
  }
  async getUserWorkoutsByDate(firebaseUserId: string, date: string) {
    const result = await this.model.find({ firebaseUserId: firebaseUserId, date: date }).exec();
    console.log('Result:', result);
    return result;
  }

  async deleteAllUserWorkouts(firebaseUserId: string): Promise<any> {
    return await this.model.deleteMany({ firebaseUserId }).exec();
  }
  async create(firebaseUserId: string, createWorkoutDto: CreateWorkoutDto) {
    const workout = new this.model({
      ...createWorkoutDto,
      firebaseUserId,
    });
    return await workout.save();
  }
  async findOne(id: string): Promise<Workout> {
    return await this.model.findById(id).exec();
  }
  async getUserWorkouts(firebaseUserId: string) {
    return await this.model.find({ firebaseUserId: firebaseUserId }).exec();
  }
  async update(id: string, updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    return await this.model.findByIdAndUpdate(id, updateWorkoutDto).exec();
  }
  async delete(id: string): Promise<Workout> {
    console.log('id:', id);
    return await this.model.findByIdAndDelete(id).exec();
  }
  async partialUpdate(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    const workout = await this.findOne(id);
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }
    const updatedWorkout = await this.model.findByIdAndUpdate(id, updateWorkoutDto, {
      new: true,
      useFindAndModify: false,
    }).exec();
    return updatedWorkout;
  }
}