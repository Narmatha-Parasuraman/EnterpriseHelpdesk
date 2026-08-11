using EnterpriseHelpdesk.Application.DTOs;
using EnterpriseHelpdesk.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EnterpriseHelpdesk.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketsController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    // GET: api/tickets
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tickets = await _ticketService.GetAllAsync();

        return Ok(tickets);
    }

    // GET: api/tickets/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var ticket = await _ticketService.GetByIdAsync(id);

        if (ticket == null)
        {
            return NotFound();
        }

        return Ok(ticket);
    }

    // POST: api/tickets
    [HttpPost]
    [Authorize(Roles = "Employee")]
    public async Task<IActionResult> Create(CreateTicketDto dto)
    {
        var email = User.FindFirstValue(ClaimTypes.Email);

        if (string.IsNullOrEmpty(email))
        {
            return Unauthorized();
        }

        var ticket = await _ticketService.CreateAsync(dto, email);

        return Ok(ticket);
    }

    // PUT: api/tickets/1
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(
        int id,
        UpdateTicketDto dto)
    {
        var result = await _ticketService.UpdateAsync(id, dto);

        if (!result)
        {
            return NotFound();
        }

        return Ok("Ticket updated successfully.");
    }

    // DELETE: api/tickets/1
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _ticketService.DeleteAsync(id);

        if (!result)
        {
            return NotFound();
        }

        return Ok("Ticket deleted successfully.");
    }

    [HttpPut("{id}/assign")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Assign(
    int id,
    AssignTicketDto dto)
    {
        var result = await _ticketService.AssignAsync(id, dto);

        if (!result)
        {
            return NotFound();
        }

        return Ok("Ticket assigned successfully.");
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> UpdateStatus(
    int id,
    UpdateTicketStatusDto dto)
    {
        var result = await _ticketService.UpdateStatusAsync(id, dto);

        if (!result)
        {
            return NotFound();
        }

        return Ok("Ticket status updated successfully.");
    }
}