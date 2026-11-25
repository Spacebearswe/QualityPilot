using QualityPilot.Application.Products;

namespace QualityPilot.Api.Endpoints;

public static class ProductEndpoints
{
    public static void MapProductEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/products");

        group.MapGet("/", async (ProductService service, CancellationToken ct) =>
            Results.Ok(await service.GetAllAsync(ct)));

        group.MapGet("/{id:int}", async (int id, ProductService service, CancellationToken ct) =>
            await service.GetAsync(id, ct) is { } product ? Results.Ok(product) : Results.NotFound());

        group.MapPost("/", async (ProductDetails details, ProductService service, CancellationToken ct) =>
        {
            try
            {
                var product = await service.CreateAsync(details, ct);
                return Results.Created($"/api/products/{product.Id}", product);
            }
            catch (ArgumentException ex)
            {
                return Results.BadRequest(new { message = ex.Message });
            }
        });

        group.MapPut("/{id:int}", async (int id, ProductDetails details, ProductService service, CancellationToken ct) =>
        {
            try
            {
                return await service.UpdateAsync(id, details, ct) ? Results.NoContent() : Results.NotFound();
            }
            catch (ArgumentException ex)
            {
                return Results.BadRequest(new { message = ex.Message });
            }
        });

        group.MapDelete("/{id:int}", async (int id, ProductService service, CancellationToken ct) =>
            await service.DeleteAsync(id, ct) ? Results.NoContent() : Results.NotFound());
    }
}
