using QualityPilot.Api.Endpoints;
using QualityPilot.Application;
using QualityPilot.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins("https://agreeable-forest-02d8d5810.8.azurestaticapps.net")
              .WithMethods("GET", "POST", "PUT", "DELETE")
              .AllowAnyHeader());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseHttpsRedirection();
app.UseCors("Frontend");
app.MapProductEndpoints();
app.MapProductEndpoints();

app.Run();
