import { Test, TestingModule } from '@nestjs/testing';
import { SkillWorkoutsController } from './skill-workouts.controller';

describe('SkillWorkoutsController', () => {
  let controller: SkillWorkoutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillWorkoutsController],
    }).compile();

    controller = module.get<SkillWorkoutsController>(SkillWorkoutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
