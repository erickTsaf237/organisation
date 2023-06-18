import { Test, TestingModule } from '@nestjs/testing';
import { ElecteurService } from './electeur.service';

describe('ElecteurService', () => {
  let service: ElecteurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElecteurService],
    }).compile();

    service = module.get<ElecteurService>(ElecteurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
