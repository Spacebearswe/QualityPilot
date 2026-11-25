namespace QualityPilot.Application.Products;

public record ProductDto(int Id, string Name, string Description, string Manufacturer, string Designation, DateTime ApplicationDate);

public record ProductDetails(string Name, string Description, string Manufacturer, string Designation, DateTime ApplicationDate);
