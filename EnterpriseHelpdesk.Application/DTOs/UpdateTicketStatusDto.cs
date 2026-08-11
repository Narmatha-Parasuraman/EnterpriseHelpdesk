using EnterpriseHelpdesk.Domain.Enums;

namespace EnterpriseHelpdesk.Application.DTOs;

public class UpdateTicketStatusDto
{
    public TicketStatus Status { get; set; }
}