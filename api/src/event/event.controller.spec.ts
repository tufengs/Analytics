import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './event.controller';
import { DataService } from './event.service';

describe('DataController', () => {
  let controller: DataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [DataService],
    }).compile();

    controller = module.get<DataController>(DataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
