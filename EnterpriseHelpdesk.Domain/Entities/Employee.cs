namespace EnterpriseHelpdesk.Domain.Entities;

public class Employee
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Position { get; set; } = string.Empty;

    public int DepartmentId { get; set; }

    public Department? Department { get; set; }
}