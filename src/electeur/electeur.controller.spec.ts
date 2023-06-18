import { Test, TestingModule } from '@nestjs/testing';
import { ElecteurController } from './electeur.controller';

describe('ElecteurController', () => {
  let controller: ElecteurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElecteurController],
    }).compile();

    controller = module.get<ElecteurController>(ElecteurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
