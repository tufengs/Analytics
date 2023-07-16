import { Test, TestingModule } from '@nestjs/testing';
import { Dashboard_elementsService } from './dashboard_elements.service';

describe('DashboardService', () => {
  let service: Dashboard_elementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Dashboard_elementsService],
    }).compile();

    service = module.get<Dashboard_elementsService>(Dashboard_elementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
