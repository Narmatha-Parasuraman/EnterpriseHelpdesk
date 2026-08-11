using EnterpriseHelpdesk.Application.Interfaces;
using EnterpriseHelpdesk.Domain.Entities;
using EnterpriseHelpdesk.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnterpriseHelpdesk.Infrastructure.Repositories;

public class DepartmentRepository : IDepartmentRepository
{
    private readonly ApplicationDbContext _context;

    public DepartmentRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Department>> GetAllAsync()
    {
        return await _context.Departments.ToListAsync();
    }
    public async Task<Department?> GetByIdAsync(int id)
    {
        return await _context.Departments
                             .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task AddAsync(Department department)
    {
        await _context.Departments.AddAsync(department);
        await _context.SaveChangesAsync();
    }

    //public async Task UpdateAsync(Department department)
    //{
    //    _context.Departments.Update(department);
    //    await _context.SaveChangesAsync();
    //}

    public async Task UpdateAsync(Department department)
    {
        var existingDepartment = await _context.Departments
            .FirstOrDefaultAsync(d => d.Id == department.Id);

        if (existingDepartment == null)
        {
            return;
        }

        existingDepartment.Name = department.Name;
        existingDepartment.Description = department.Description;

        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(int id)
    {
        var department = await _context.Departments
                                  .FirstOrDefaultAsync(d => d.Id == id);

        if (department != null)
        {
            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
        }
    }






}