using EnterpriseHelpdesk.Application.Interfaces;
using EnterpriseHelpdesk.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace EnterpriseHelpdesk.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin,Employee")]
public class DepartmentsController : ControllerBase
{
    private readonly IDepartmentService _departmentService;

    public DepartmentsController(IDepartmentService departmentService)
    {
        _departmentService = departmentService;
    }



    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var departments = await _departmentService.GetAllAsync();

        return Ok(departments);
    }

    // GET: api/departments/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Department>> GetById(int id)
    {
        var department = await _departmentService.GetByIdAsync(id);

        if (department == null)
        {
            return NotFound();
        }

        return Ok(department);
    }

    // POST: api/departments
    [HttpPost]
    public async Task<ActionResult<Department>> Create(Department department)
    {
        await _departmentService.CreateAsync(department);

        return CreatedAtAction(
            nameof(GetById),
            new { id = department.Id },
            department);
    }


    // PUT: api/departments/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Department department)
    {
        if (id != department.Id)
        {
            return BadRequest("Department ID mismatch");
        }


        var existingDepartment = await _departmentService.GetByIdAsync(id);

        if (existingDepartment == null)
        {
            return NotFound();
        }


        await _departmentService.UpdateAsync(department);

        return NoContent();
    }

    // DELETE: api/departments/{id}
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var department = await _departmentService.GetByIdAsync(id);

        if (department == null)
        {
            return NotFound();
        }


        await _departmentService.DeleteAsync(id);

        return NoContent();
    }

}