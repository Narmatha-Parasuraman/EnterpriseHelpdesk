using EnterpriseHelpdesk.Application.DTOs;

namespace EnterpriseHelpdesk.Application.Interfaces;

public interface IAuthService
{
    Task<bool> RegisterAsync(RegisterDto dto);

    Task<string?> LoginAsync(LoginDto dto);

    Task<bool> AssignRoleAsync(AssignRoleDto dto);
}