using ClassLibrary.DbContext;
using ClassLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace ClassLibrary.Repositories
{
    public class BudgetRepository : IBudgetRepository
    {
        private readonly BudgetDbContext _context;

        public BudgetRepository(BudgetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Budget>> GetBudgetsAsync()
        {
            return await _context.Budgets.ToListAsync();
        }

        public async Task<Budget> GetBudgetByIdAsync(int id)
        {
            return await _context.Budgets.FindAsync(id);
        }

        public async Task<Budget> CreateBudgetAsync(Budget budget)
        {
            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();
            return budget;
        }

        public async Task UpdateBudgetAsync(Budget budget)
        {
            var existingBudget = await _context.Budgets.FindAsync(budget.BudgetId);

            if (existingBudget == null)
            {
                throw new ArgumentException("Budżet nie znaleziony.");
            }

            existingBudget.Name = budget.Name;
            existingBudget.TotalAmount = budget.TotalAmount;
            existingBudget.StartDate = budget.StartDate;
            existingBudget.EndDate = budget.EndDate;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteBudgetAsync(int id)
        {
            var budgetToDelete = await _context.Budgets.FindAsync(id);
            if (budgetToDelete != null)
            {
                _context.Budgets.Remove(budgetToDelete);
                await _context.SaveChangesAsync();
            }
        }
    }
}

