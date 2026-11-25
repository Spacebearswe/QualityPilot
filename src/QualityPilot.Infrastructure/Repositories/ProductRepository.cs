using Microsoft.EntityFrameworkCore;
using QualityPilot.Domain.Entities;
using QualityPilot.Domain.Interfaces;
using QualityPilot.Infrastructure.Persistence;

namespace QualityPilot.Infrastructure.Repositories;

public class ProductRepository(ApplicationDbContext db) : IProductRepository
{
    public Task<List<Product>> GetAllAsync(CancellationToken cancellationToken) =>
        db.Products.AsNoTracking().ToListAsync(cancellationToken);

    public Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken) =>
        db.Products.FirstOrDefaultAsync(product => product.Id == id, cancellationToken);

    public async Task AddAsync(Product product, CancellationToken cancellationToken) =>
        await db.Products.AddAsync(product, cancellationToken);

    public void Remove(Product product) => db.Products.Remove(product);

    public Task SaveChangesAsync(CancellationToken cancellationToken) => db.SaveChangesAsync(cancellationToken);
}
