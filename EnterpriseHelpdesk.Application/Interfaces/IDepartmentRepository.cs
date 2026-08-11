using EnterpriseHelpdesk.Domain.Entities;

namespace EnterpriseHelpdesk.Application.Interfaces;

public interface IDepartmentRepository
{
    Task<IEnumerable<Department>> GetAllAsync();

    Task<Department?> GetByIdAsync(int id);

    Task AddAsync(Department department);

    Task UpdateAsync(Department department);

    Task DeleteAsync(int id);
}