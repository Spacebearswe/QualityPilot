namespace QualityPilot.Domain.Entities;

public class Product
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public string Manufacturer { get; private set; }
    public string Designation { get; private set; }
    public DateTime ApplicationDate { get; private set; }

    public Product(string name, string description, string manufacturer, string designation, DateTime applicationDate)
    {
        Name = name;
        Description = description;
        Manufacturer = manufacturer;
        Designation = designation;
        ApplicationDate = applicationDate;
    }

    public void Update(string name, string description, string manufacturer, string designation, DateTime applicationDate)
    {
        Name = name;
        Description = description;
        Manufacturer = manufacturer;
        Designation = designation;
        ApplicationDate = applicationDate;
    }
}
