using ClassLibrary.Models;

namespace ClassLibrary.Repositories
{
    public interface IBudgetRepository
    {
        Task<IEnumerable<Budget>> GetBudgetsAsync();
        Task<Budget> GetBudgetByIdAsync(int id);
        Task<Budget> CreateBudgetAsync(Budget budget);
        Task UpdateBudgetAsync(Budget budget);
        Task DeleteBudgetAsync(int id);
    }
}

