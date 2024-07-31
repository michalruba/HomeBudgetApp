using ClassLibrary.Models;
using ClassLibrary.Repositories;


namespace ClassLibrary.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IBudgetRepository _budgetRepository;

        public TransactionService(ITransactionRepository transactionRepository, IBudgetRepository budgetRepository)
        {
            _transactionRepository = transactionRepository;
            _budgetRepository = budgetRepository;
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsAsync()
        {
            return await _transactionRepository.GetTransactionsAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(int id)
        {
            return await _transactionRepository.GetTransactionByIdAsync(id);
        }

        public async Task<Transaction> CreateTransactionAsync(Transaction transaction)
        {
            var budget = await _budgetRepository.GetBudgetByIdAsync(transaction.BudgetId);

            if (budget == null)
            {
                throw new Exception("Budget not found.");
            }

            if (transaction.Type == "Income")
            {
                budget.TotalAmount += transaction.Amount;
            }
            else if (transaction.Type == "Expense")
            {
                budget.TotalAmount -= transaction.Amount;
            }

            await _budgetRepository.UpdateBudgetAsync(budget);

            var createdTransaction = await _transactionRepository.CreateTransactionAsync(transaction);

            return createdTransaction;
        }

        public async Task UpdateTransactionAsync(Transaction transaction)
        {
            await _transactionRepository.UpdateTransactionAsync(transaction);
        }

        public async Task DeleteTransactionAsync(int id)
        {
            var transaction = await _transactionRepository.GetTransactionByIdAsync(id);

            if (transaction == null)
            {
                throw new Exception("Transaction not found.");
            }

            var budget = await _budgetRepository.GetBudgetByIdAsync(transaction.BudgetId);

            if (budget == null)
            {
                throw new Exception("Budget not found.");
            }

            if (transaction.Type == "Income")
            {
                budget.TotalAmount -= transaction.Amount;
            }
            else if (transaction.Type == "Expense")
            {
                budget.TotalAmount += transaction.Amount;
            }

            await _budgetRepository.UpdateBudgetAsync(budget);

            await _transactionRepository.DeleteTransactionAsync(id);
        }
    }
}


