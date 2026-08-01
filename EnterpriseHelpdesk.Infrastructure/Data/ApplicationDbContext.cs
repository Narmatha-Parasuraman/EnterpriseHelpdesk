using EnterpriseHelpdesk.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnterpriseHelpdesk.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Department> Departments => Set<Department>();

    public DbSet<Ticket> Tickets => Set<Ticket>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Department>()
            .Property(d => d.Name)
            .HasMaxLength(100)
            .IsRequired();

        modelBuilder.Entity<Ticket>()
            .Property(t => t.Title)
            .HasMaxLength(200)
            .IsRequired();
    }
}   