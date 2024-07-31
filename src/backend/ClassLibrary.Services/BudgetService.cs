using ClassLibrary.Models;
using ClassLibrary.Repositories;

namespace ClassLibrary.Services
{
    public class BudgetService : IBudgetService
    {
        private readonly IBudgetRepository _budgetRepository;

        public BudgetService(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
        }

        public async Task<IEnumerable<Budget>> GetBudgetsAsync()
        {
            return await _budgetRepository.GetBudgetsAsync();
        }

        public async Task<Budget> GetBudgetByIdAsync(int id)
        {
            return await _budgetRepository.GetBudgetByIdAsync(id);
        }

        public async Task<Budget> CreateBudgetAsync(Budget budget)
        {
            return await _budgetRepository.CreateBudgetAsync(budget);
        }

        public async Task UpdateBudgetAsync(Budget budget)
        {
            await _budgetRepository.UpdateBudgetAsync(budget);
        }

        public async Task DeleteBudgetAsync(int id)
        {
            await _budgetRepository.DeleteBudgetAsync(id);
        }
    }
}