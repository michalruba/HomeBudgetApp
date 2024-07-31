namespace ClassLibrary.Models
{
    public class Budget
    {
        public int BudgetId { get; set; }
        public string Name { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int UserId { get; set; }
    }
}

