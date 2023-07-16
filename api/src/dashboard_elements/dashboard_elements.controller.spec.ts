import { Test, TestingModule } from '@nestjs/testing';
import { Dashboard_elementsController } from './dashboard_elements.controller';

describe('DashboardElementController', () => {
  let controller: Dashboard_elementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Dashboard_elementsController],
    }).compile();

    controller = module.get<Dashboard_elementsController>(Dashboard_elementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
