using System;
using System.Collections.Generic;
using System.Text;

namespace EnterpriseHelpdesk.Domain.Entities
{
    public class Department : BaseEntity
    {
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }
    }
}
