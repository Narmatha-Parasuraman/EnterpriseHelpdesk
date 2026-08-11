using EnterpriseHelpdesk.Application.DTOs;

namespace EnterpriseHelpdesk.Application.Interfaces;

public interface ITicketService
{
    Task<List<TicketDto>> GetAllAsync();

    Task<TicketDto?> GetByIdAsync(int id);

    Task<TicketDto> CreateAsync(CreateTicketDto dto, string createdBy);

    Task<bool> UpdateAsync(int id, UpdateTicketDto dto);

    Task<bool> DeleteAsync(int id);

    Task<bool> AssignAsync(int id, AssignTicketDto dto);

    Task<bool> UpdateStatusAsync(int id, UpdateTicketStatusDto dto);
}