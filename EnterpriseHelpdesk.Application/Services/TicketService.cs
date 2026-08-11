using EnterpriseHelpdesk.Application.DTOs;
using EnterpriseHelpdesk.Application.Interfaces;
using EnterpriseHelpdesk.Domain.Entities;

namespace EnterpriseHelpdesk.Application.Services;

public class TicketService : ITicketService
{
    private readonly ITicketRepository _ticketRepository;

    public TicketService(ITicketRepository ticketRepository)
    {
        _ticketRepository = ticketRepository;
    }

    public async Task<List<TicketDto>> GetAllAsync()
    {
        var tickets = await _ticketRepository.GetAllAsync();

        return tickets.Select(t => new TicketDto
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            Status = t.Status,
            DepartmentId = t.DepartmentId,
            DepartmentName = t.Department?.Name,
            Priority = t.Priority,
            CreatedBy = t.CreatedBy,
            AssignedTo = t.AssignedTo
        }).ToList();
    }

    public async Task<TicketDto?> GetByIdAsync(int id)
    {
        var t = await _ticketRepository.GetByIdAsync(id);

        if (t == null)
        {
            return null;
        }

        return new TicketDto
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            Status = t.Status,
            DepartmentId = t.DepartmentId,
            DepartmentName = t.Department?.Name,
            Priority = t.Priority,
            CreatedBy = t.CreatedBy,
            AssignedTo = t.AssignedTo
        };
    }

    public async Task<TicketDto> CreateAsync(
        CreateTicketDto dto,
        string createdBy)
    {
        var ticket = new Ticket
        {
            Title = dto.Title,
            Description = dto.Description,
            DepartmentId = dto.DepartmentId,
            Priority = dto.Priority,
            CreatedBy = createdBy,
            Status = Domain.Enums.TicketStatus.Open
        };

        await _ticketRepository.AddAsync(ticket);

        var createdTicket = await _ticketRepository.GetByIdAsync(ticket.Id);

        return new TicketDto
        {
            Id = createdTicket!.Id,
            Title = createdTicket.Title,
            Description = createdTicket.Description,
            Status = createdTicket.Status,
            DepartmentId = createdTicket.DepartmentId,
            DepartmentName = createdTicket.Department?.Name,
            Priority = createdTicket.Priority,
            CreatedBy = createdTicket.CreatedBy,
            AssignedTo = createdTicket.AssignedTo
        };
    }

    public async Task<bool> UpdateAsync(
        int id,
        UpdateTicketDto dto)
    {
        var ticket = await _ticketRepository.GetByIdAsync(id);

        if (ticket == null)
        {
            return false;
        }

        ticket.Title = dto.Title;
        ticket.Description = dto.Description;
        ticket.Status = dto.Status;
        ticket.Priority = dto.Priority;
        ticket.AssignedTo = dto.AssignedTo;

        await _ticketRepository.UpdateAsync(ticket);

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var ticket = await _ticketRepository.GetByIdAsync(id);

        if (ticket == null)
        {
            return false;
        }

        await _ticketRepository.DeleteAsync(ticket);

        return true;
    }

    public async Task<bool> AssignAsync(int id, AssignTicketDto dto)
    {
        var ticket = await _ticketRepository.GetByIdAsync(id);

        if (ticket == null)
        {
            return false;
        }

        ticket.AssignedTo = dto.AssignedTo;

        await _ticketRepository.UpdateAsync(ticket);

        return true;
    }

    public async Task<bool> UpdateStatusAsync(
    int id,
    UpdateTicketStatusDto dto)
    {
        var ticket = await _ticketRepository.GetByIdAsync(id);

        if (ticket == null)
        {
            return false;
        }

        ticket.Status = dto.Status;

        await _ticketRepository.UpdateAsync(ticket);

        return true;
    }
}