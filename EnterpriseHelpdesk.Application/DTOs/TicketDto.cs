using EnterpriseHelpdesk.Domain.Enums;

namespace EnterpriseHelpdesk.Application.DTOs;

public class TicketDto
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public TicketStatus Status { get; set; }

    public int DepartmentId { get; set; }

    public string? DepartmentName { get; set; }

    public string Priority { get; set; } = string.Empty;

    public string CreatedBy { get; set; } = string.Empty;

    public string? AssignedTo { get; set; }
}