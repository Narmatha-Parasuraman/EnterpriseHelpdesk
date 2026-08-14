using EnterpriseHelpdesk.Domain.Entities;
using EnterpriseHelpdesk.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EnterpriseHelpdesk.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<Department> Departments => Set<Department>();

    public DbSet<Ticket> Tickets => Set<Ticket>();

    public DbSet<Employee> Employees => Set<Employee>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Identity configuration for SQL Server
        modelBuilder.Entity<ApplicationUser>()
            .Property(u => u.Id)
            .HasMaxLength(450);

        modelBuilder.Entity<IdentityRole>()
            .Property(r => r.Id)
            .HasMaxLength(450);

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