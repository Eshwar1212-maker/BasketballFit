/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './schemas/workout.schema';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';


@Injectable()
export class WorkoutService {
constructor(
@InjectModel(Workout.name) private readonly model: Model<WorkoutDocument>,
) {}

async findAll(): Promise<Workout[]> {
return await this.model.find().exec();
}

async findOne(id: string): Promise<Workout> {
return await this.model.findById(id).exec();
}

async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
return await new this.model({
...createWorkoutDto,
createdAt: new Date(),
}).save();
}

async update(id: string, updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
return await this.model.findByIdAndUpdate(id, updateWorkoutDto).exec();
}

async delete(id: string): Promise<Workout> {
return await this.model.findByIdAndDelete(id).exec();
}
}