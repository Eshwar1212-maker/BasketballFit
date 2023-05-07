import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutModule } from './workout/workout.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillWorkoutModule } from './skill-workouts/skill-workouts.module';


@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [MongooseModule.forRoot('mongodb+srv://eshwar:Derrick%2355@cluster0.j9nlodn.mongodb.net/?retryWrites=true&w=majority'), WorkoutModule, SkillWorkoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
