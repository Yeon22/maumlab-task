import { Test, TestingModule } from '@nestjs/testing';
import { DistractorResolver } from './distractor.resolver';

describe('DistractorResolver', () => {
  let resolver: DistractorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistractorResolver],
    }).compile();

    resolver = module.get<DistractorResolver>(DistractorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
