using QualityPilot.Domain.Entities;

namespace QualityPilot.Domain.Interfaces;

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync(CancellationToken cancellationToken);
    Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task AddAsync(Product product, CancellationToken cancellationToken);
    void Remove(Product product);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}
