using System.Collections;
using System.Security.Cryptography;
using System.Text;
using api.Data;
using api.DTOs;
using api.Helpers.interfaces;
using api.Models;

namespace api.Helpers
{
    public class AuthHelper : IAuthHelper
    {
        private readonly MyBlogAppContext _context;
        public AuthHelper(MyBlogAppContext context)
        {
            _context = context;
        }

        public async Task<bool> Register(RegisterDto registerDto)
        {
            using var hmac = new HMACSHA512();

            byte[] passwordSalt = hmac.Key;
            byte[] passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));

            string sql = @"INSERT INTO Blog.Users (Email, FirstName, LastName, PasswordHash, PasswordSalt) 
            VALUES (@Email, @FirstName, @LastName, @PasswordHash, @PasswordSalt)";

            return await _context.ExecuteSql(sql, new
            {
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
            });
        }

        public async Task<bool> UserExists(string email)
        {
            string sql = @"SELECT 1 FROM Blog.Users WHERE Email = @Email";

            var result = await _context.LoadDataSingle<int?>(sql, new { Email = email });

            return result != null;
        }

        public async Task<User?> GetUserById(int id)
        {
            string sql = @"SELECT * FROM Blog.Users WHERE Id = @Id";

            return await _context.LoadDataSingle<User?>(sql, new { Id = id });
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            string sql = @"SELECT * FROM Blog.Users WHERE Email = @Email";

            return await _context.LoadDataSingle<User>(sql, new { Email = email });
        }

        public bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            using var hmac = new HMACSHA512(storedSalt);
            byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            return computedHash.SequenceEqual(storedHash);
        }

        public async Task<User?> Login(LoginDto loginDto)
        {
            var user = await GetUserByEmail(loginDto.Email);

            if (user != null && VerifyPassword(loginDto.Password, user.PasswordHash, user.PasswordSalt))
                return user;

            return null;
        }

        public async Task<bool> UpdateProfile(int id, UpdateUserDto updateUserDto)
        {
            var existingProfile = await GetUserById(id);

            if (existingProfile == null) return false;

            string sql = @"UPDATE Blog.Users 
                            SET Email = @Email, 
                            FirstName = @FirstName, 
                            LastName = @LastName 
                            WHERE Id = @Id";

            return await _context.ExecuteSql(sql, new
            {
                Email = updateUserDto.Email,
                FirstName = updateUserDto.FirstName,
                LastName = updateUserDto.LastName,
                Id = id
            });

        }
        public async Task<bool> UpdatePassword(int id, UpdatePasswordDto updatePasswordDto)
        {
            var existingProfile = await GetUserById(id);

            if (existingProfile == null) return false;

            byte[] passwordHash = existingProfile.PasswordHash;
            byte[] passwordSalt = existingProfile.PasswordSalt;

            if (!string.IsNullOrWhiteSpace(updatePasswordDto.Password))
            {
                using var hmac = new HMACSHA512();
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(updatePasswordDto.Password));
                passwordSalt = hmac.Key;
            }

            string sql = @"UPDATE Blog.Users 
                            SET PasswordHash = @PasswordHash, 
                            PasswordSalt = @PasswordSalt 
                            WHERE Id = @Id";

            return await _context.ExecuteSql(sql, new
            {
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Id = id
            });
        }

        public async Task<bool> DeleteUser(int id)
        {
            string sql = @"DELETE FROM Blog.Users
                            WHERE Id = @Id";

            return await _context.ExecuteSql(sql, new { Id = id });
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            string sql = @"SELECT * FROM Blog.Users";

            var users = await _context.LoadData<User>(sql);

            return users.ToList();
        }
    }
}