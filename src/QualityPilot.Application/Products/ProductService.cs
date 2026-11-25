using QualityPilot.Domain.Entities;
using QualityPilot.Domain.Interfaces;

namespace QualityPilot.Application.Products;

public class ProductService(IProductRepository repository)
{
    public async Task<List<ProductDto>> GetAllAsync(CancellationToken cancellationToken) =>
        (await repository.GetAllAsync(cancellationToken)).Select(ToDto).ToList();

    public async Task<ProductDto?> GetAsync(int id, CancellationToken cancellationToken)
    {
        var product = await repository.GetByIdAsync(id, cancellationToken);
        return product is null ? null : ToDto(product);
    }

    public async Task<ProductDto> CreateAsync(ProductDetails details, CancellationToken cancellationToken)
    {
        Validate(details);
        var product = new Product(details.Name, details.Description, details.Manufacturer, details.Designation, details.ApplicationDate);
        await repository.AddAsync(product, cancellationToken);
        await repository.SaveChangesAsync(cancellationToken);
        return ToDto(product);
    }

    public async Task<bool> UpdateAsync(int id, ProductDetails details, CancellationToken cancellationToken)
    {
        Validate(details);
        var product = await repository.GetByIdAsync(id, cancellationToken);
        if (product is null) return false;
        product.Update(details.Name, details.Description, details.Manufacturer, details.Designation, details.ApplicationDate);
        await repository.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken)
    {
        var product = await repository.GetByIdAsync(id, cancellationToken);
        if (product is null) return false;
        repository.Remove(product);
        await repository.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static void Validate(ProductDetails details)
    {
        if (string.IsNullOrWhiteSpace(details.Name) || details.Name.Length > 200 ||
            string.IsNullOrWhiteSpace(details.Description) || string.IsNullOrWhiteSpace(details.Manufacturer) ||
            string.IsNullOrWhiteSpace(details.Designation))
            throw new ArgumentException("Name (maximum 200 characters), description, manufacturer, and designation are required.");
    }

    private static ProductDto ToDto(Product product) => new(
        product.Id, product.Name, product.Description, product.Manufacturer, product.Designation, product.ApplicationDate);
}
