using System.Security.Cryptography;
using ClassLibrary.DbContext;
using ClassLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace ClassLibrary.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BudgetDbContext _context;

        public UserRepository(BudgetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            string hashedPassword = PasswordHasher.HashPassword(user.Password);
            user.Password = hashedPassword;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task UpdateUserAsync(User user)
        {
            var existingUser = await _context.Users.FindAsync(user.UserId);
            
            if (existingUser == null)
            {
                throw new ArgumentException("Użytkownik nie znaleziony");
            }

            existingUser.Username = user.Username;
            existingUser.Password = PasswordHasher.HashPassword(user.Password);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var userToDelete = await _context.Users.FindAsync(id);
            if (userToDelete != null)
            {
                _context.Users.Remove(userToDelete);
                await _context.SaveChangesAsync();
            }
        }

    }
}

