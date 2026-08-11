namespace EnterpriseHelpdesk.Application.DTOs;

public class EmployeeCreateDto
{
    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Position { get; set; } = string.Empty;

    public int DepartmentId { get; set; }
}