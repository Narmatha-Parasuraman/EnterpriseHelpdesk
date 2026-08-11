using EnterpriseHelpdesk.Application.DTOs;

namespace EnterpriseHelpdesk.Application.Interfaces;

public interface IEmployeeService
{
    Task<IEnumerable<EmployeeDto>> GetAllAsync();

    Task<EmployeeDto?> GetByIdAsync(int id);

    Task<EmployeeDto> CreateAsync(EmployeeCreateDto dto);

    Task<bool> UpdateAsync(int id, EmployeeUpdateDto dto);

    Task<bool> DeleteAsync(int id);
}