using Microsoft.Extensions.DependencyInjection;
using QualityPilot.Application.Products;

namespace QualityPilot.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ProductService>();
        return services;
    }
}
