using ClassLibrary.Models;

namespace ClassLibrary.Services
{
    public interface IBudgetService
    {
        Task<IEnumerable<Budget>> GetBudgetsAsync();
        Task<Budget> GetBudgetByIdAsync(int id);
        Task<Budget> CreateBudgetAsync(Budget budget);
        Task UpdateBudgetAsync(Budget budget);
        Task DeleteBudgetAsync(int id);
    }
}