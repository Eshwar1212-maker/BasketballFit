import { Test, TestingModule } from '@nestjs/testing';
import { SkillWorkoutsService } from './skill-workouts.service';

describe('SkillWorkoutsService', () => {
  let service: SkillWorkoutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillWorkoutsService],
    }).compile();

    service = module.get<SkillWorkoutsService>(SkillWorkoutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
