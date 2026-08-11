using EnterpriseHelpdesk.Domain.Enums;

namespace EnterpriseHelpdesk.Application.DTOs;

public class CreateTicketDto
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int DepartmentId { get; set; }

    public string Priority { get; set; } = "Medium";
}