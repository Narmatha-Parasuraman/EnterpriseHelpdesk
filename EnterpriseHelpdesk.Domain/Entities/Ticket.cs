using System;
using System.Collections.Generic;
using System.Text;
using EnterpriseHelpdesk.Domain.Enums;

namespace EnterpriseHelpdesk.Domain.Entities
{
    public class Ticket : BaseEntity
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public TicketStatus Status { get; set; }

        public int DepartmentId { get; set; }

        public Department? Department { get; set; }
    }
}
