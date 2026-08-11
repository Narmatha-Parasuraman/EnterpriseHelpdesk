using EnterpriseHelpdesk.Application.DTOs;
using EnterpriseHelpdesk.Application.Interfaces;
using EnterpriseHelpdesk.Domain.Entities;

namespace EnterpriseHelpdesk.Application.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repository;

    public EmployeeService(IEmployeeRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<EmployeeDto>> GetAllAsync()
    {
        var employees = await _repository.GetAllAsync();

        return employees.Select(e => new EmployeeDto
        {
            Id = e.Id,
            Name = e.Name,
            Email = e.Email,
            Position = e.Position,
            DepartmentId = e.DepartmentId,
            DepartmentName = e.Department?.Name
        });
    }

    public async Task<EmployeeDto?> GetByIdAsync(int id)
    {
        var employee = await _repository.GetByIdAsync(id);

        if (employee == null)
        {
            return null;
        }

        return new EmployeeDto
        {
            Id = employee.Id,
            Name = employee.Name,
            Email = employee.Email,
            Position = employee.Position,
            DepartmentId = employee.DepartmentId,
            DepartmentName = employee.Department?.Name
        };
    }

    public async Task<EmployeeDto> CreateAsync(EmployeeCreateDto dto)
    {
        var employee = new Employee
        {
            Name = dto.Name,
            Email = dto.Email,
            Position = dto.Position,
            DepartmentId = dto.DepartmentId
        };

        await _repository.CreateAsync(employee);

        return new EmployeeDto
        {
            Id = employee.Id,
            Name = employee.Name,
            Email = employee.Email,
            Position = employee.Position,
            DepartmentId = employee.DepartmentId
        };
    }

    public async Task<bool> UpdateAsync(int id, EmployeeUpdateDto dto)
    {
        var employee = await _repository.GetByIdAsync(id);

        if (employee == null)
        {
            return false;
        }

        employee.Name = dto.Name;
        employee.Email = dto.Email;
        employee.Position = dto.Position;
        employee.DepartmentId = dto.DepartmentId;

        await _repository.UpdateAsync(employee);

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var employee = await _repository.GetByIdAsync(id);

        if (employee == null)
        {
            return false;
        }

        await _repository.DeleteAsync(id);

        return true;
    }
}