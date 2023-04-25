import { Test, TestingModule } from '@nestjs/testing';
import { CandidatController } from './candidat.controller';

describe('CandidatController', () => {
  let controller: CandidatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatController],
    }).compile();

    controller = module.get<CandidatController>(CandidatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
