using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace EnterpriseHelpdesk.Infrastructure.Data;

public class SqlServerDbContextFactory
    : IDesignTimeDbContextFactory<SqlServerDbContext>
{
    public SqlServerDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder =
            new DbContextOptionsBuilder<SqlServerDbContext>();

        var connectionString =
            Environment.GetEnvironmentVariable(
                "AZURE_SQL_CONNECTION_STRING");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "AZURE_SQL_CONNECTION_STRING is not set.");
        }

        optionsBuilder.UseSqlServer(connectionString);

        return new SqlServerDbContext(optionsBuilder.Options);
    }
}