using EnterpriseHelpdesk.Application.Interfaces;
using EnterpriseHelpdesk.Domain.Entities;

namespace EnterpriseHelpdesk.Application.Services;

public class DepartmentService : IDepartmentService
{
    private readonly IDepartmentRepository _repository;

    public DepartmentService(IDepartmentRepository repository)
    {
        _repository = repository;
    }


    public async Task<IEnumerable<Department>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }


    public async Task<Department?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }


    public async Task CreateAsync(Department department)
    {
        await _repository.AddAsync(department);
    }


    public async Task UpdateAsync(Department department)
    {
        await _repository.UpdateAsync(department);
    }


    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }
}