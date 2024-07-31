using ClassLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ClassLibrary.DbContext
{
    public class BudgetDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public BudgetDbContext(DbContextOptions<BudgetDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

    }
}

