/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillWorkoutDocument = SkillWorkout & Document;
@Schema({ collection: 'skill_workouts' })
export class SkillWorkout {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  sets: number;

  @Prop({ required: true })
  reps: number;

  @Prop()
  createdAt: Date;
  
  @Prop({ required: true })
  day: string;
  
  @Prop()
  completed?: boolean;

  @Prop({ required: true })
  firebaseUserId: string;
}

export const SkillWorkoutSchema = SchemaFactory.createForClass(SkillWorkout);
