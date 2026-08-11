using EnterpriseHelpdesk.Domain.Enums;

namespace EnterpriseHelpdesk.Domain.Entities;

public class Ticket : BaseEntity
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public TicketStatus Status { get; set; } = TicketStatus.Open;

    public int DepartmentId { get; set; }

    public Department? Department { get; set; }

    public string Priority { get; set; } = "Medium";

    public string CreatedBy { get; set; } = string.Empty;

    public string? AssignedTo { get; set; }
}