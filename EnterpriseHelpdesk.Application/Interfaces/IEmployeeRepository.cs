using EnterpriseHelpdesk.Domain.Entities;

namespace EnterpriseHelpdesk.Application.Interfaces;

public interface IEmployeeRepository
{
    Task<IEnumerable<Employee>> GetAllAsync();

    Task<Employee?> GetByIdAsync(int id);

    Task CreateAsync(Employee employee);

    Task UpdateAsync(Employee employee);

    Task DeleteAsync(int id);
}