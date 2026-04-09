using api.DTOs.Comment;
using api.Models;

namespace api.Repositories.interfaces
{
    public interface ICommentRepository
    {
        Task<IEnumerable<CommentReadDto>> GetByPostIdAsync(int postId);
        Task<CommentReadDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(Comment comment);
        Task<bool> UpdateAsync(Comment comment);
        Task<bool> DeleteAsync(int id);
    }
}
