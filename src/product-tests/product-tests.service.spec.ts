import { Test, TestingModule } from '@nestjs/testing';
import { ProductTestsService } from './product-tests.service';
import { Repository } from 'typeorm';
import { ProductTest } from './entities/product-test.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductTestsService', () => {
  let service: ProductTestsService;
  let repository: Repository<ProductTest>;

  const mockProductTestRepository = {
    find: jest.fn(), // Mock simplificado del método "find"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductTestsService,
        {
          provide: getRepositoryToken(ProductTest),
          useValue: mockProductTestRepository, // Usamos el mock del repositorio
        },
      ],
    }).compile();

    service = module.get<ProductTestsService>(ProductTestsService);
    repository = module.get<Repository<ProductTest>>(
      getRepositoryToken(ProductTest),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTesterTests', () => {
    it('should return an array of product tests for a given tester', async () => {
      const testerId = '1234-5678'; // Simulación de ID
      const mockTests: Partial<ProductTest>[] = [
        {
          id: 'test1',
          reaction: 'No irritation',
          rating: 8,
          survival_status: true,
        },
        {
          id: 'test2',
          reaction: 'Skin redness',
          rating: 5,
          survival_status: true,
        },
      ];

      jest
        .spyOn(repository, 'find') // Espía para verificar llamada al método "find"
        .mockResolvedValue(mockTests as ProductTest[]); // Datos simulados con el tipo correcto

      const result = await service.getTesterTests(testerId);
      expect(result).toEqual(mockTests);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.find).toHaveBeenCalledWith({
        where: { tester: { id: testerId } },
        relations: ['product'],
      });
    });

    it('should return an empty array if tester has no tests', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]); // Devuelve un array vacío

      const result = await service.getTesterTests('nonexistent-id');
      expect(result).toEqual([]); // Verifica que el resultado sea un array vacío
      expect(jest.spyOn(repository, 'find')).toHaveBeenCalled(); // Verifica que el método fue llamado
    });
  });
});
