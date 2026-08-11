using EnterpriseHelpdesk.Domain.Entities;

namespace EnterpriseHelpdesk.Application.Interfaces;

public interface IDepartmentService
{
    Task<IEnumerable<Department>> GetAllAsync();

    Task<Department?> GetByIdAsync(int id);

    Task CreateAsync(Department department);

    Task UpdateAsync(Department department);

    Task DeleteAsync(int id);
}