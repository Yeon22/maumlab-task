import { Test, TestingModule } from '@nestjs/testing';
import { DistractorService } from './distractor.service';

describe('DistractorService', () => {
  let service: DistractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistractorService],
    }).compile();

    service = module.get<DistractorService>(DistractorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
