using EnterpriseHelpdesk.Domain.Entities;

namespace EnterpriseHelpdesk.Application.Interfaces;

public interface ITicketRepository
{
    Task<List<Ticket>> GetAllAsync();

    Task<Ticket?> GetByIdAsync(int id);

    Task AddAsync(Ticket ticket);

    Task UpdateAsync(Ticket ticket);

    Task DeleteAsync(Ticket ticket);
}