using api.DTOs.Post;
using api.Models;

namespace api.Repositories.interfaces
{
    public interface IPostRepository
    {
        Task<IEnumerable<PostReadDto>> GetAllAsync();
        Task<IEnumerable<PostReadDto>> GetPagedAsync(int offset, int limit);
        Task<PostReadDto?> GetByIdAsync(int id);
        Task<IEnumerable<PostReadDto>> GetByUserIdAsync(int userId);
        Task<int> CreateAsync(Post post);
        Task<bool> UpdateAsync(Post post);
        Task<bool> DeleteAsync(int id);
    }
}