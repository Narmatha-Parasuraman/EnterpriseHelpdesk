using EnterpriseHelpdesk.Domain.Enums;

namespace EnterpriseHelpdesk.Application.DTOs;

public class UpdateTicketDto
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public TicketStatus Status { get; set; }

    public string Priority { get; set; } = "Medium";

    public string? AssignedTo { get; set; }
}