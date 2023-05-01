/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: [String], default: [] })
  likes: string[];

  @Prop({ type: [{ body: String, author: String, createdAt: Date }], default: [] })
  comments: { body: string; author: string; createdAt: Date }[];
}

export type BlogDocument = Blog & Document;
export const PostSchema = SchemaFactory.createForClass(Blog);
