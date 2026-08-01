using System;
using System.Collections.Generic;
using System.Text;

namespace EnterpriseHelpdesk.Domain.Entities
{
    public abstract class BaseEntity
    {
        public int Id { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        public DateTime? ModifiedOn { get; set; }
    }
}
