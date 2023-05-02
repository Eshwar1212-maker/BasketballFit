/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkoutDocument = Workout & Document;
@Schema()
export class Workout {
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
  
  @Prop({ required: true, type: Date })
  date: Date;
  
  @Prop()
  weight?: number;
  
  @Prop()
  completed?: boolean;

  @Prop({ required: true })
  firebaseUserId: string;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
