using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QualityPilot.Domain.Entities;

namespace QualityPilot.Infrastructure.Persistence.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");
        builder.HasKey(product => product.Id);
        builder.Property(product => product.Name).IsRequired().HasMaxLength(200);
        builder.Property(product => product.Description).IsRequired();
        builder.Property(product => product.Manufacturer).IsRequired();
        builder.Property(product => product.Designation).IsRequired();
    }
}
