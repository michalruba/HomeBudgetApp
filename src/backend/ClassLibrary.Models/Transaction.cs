namespace ClassLibrary.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
        public int BudgetId { get; set; }
    }
}