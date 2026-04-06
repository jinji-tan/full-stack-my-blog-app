using api.Data;
using api.DTOs;
using api.Models;

namespace api.Helpers.interfaces
{
    public interface IAuthHelper
    {
        Task<bool> Register(RegisterDto registerDto);
        Task<bool> UserExists(string email);
        Task<User?> GetUserById(int id);
        Task<User?> GetUserByEmail(string email);
        Task<bool> VerifyPassword(string password, byte[] storedHash, byte[] storedSalt);
        Task<User?> Login(LoginDto loginDto);
        Task<bool> UpdateProfile(int id, UpdateUserDto updateUserDto);
        Task<bool> UpdatePassword(int id, UpdatePasswordDto updatePasswordDto);
        Task<bool> DeleteUser(int id);

    }
}