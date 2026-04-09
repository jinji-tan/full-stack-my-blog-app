using api.Data;
using api.DTOs.Comment;
using api.Models;
using api.Repositories.interfaces;

namespace api.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly MyBlogAppContext _context;

        public CommentRepository(MyBlogAppContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CommentReadDto>> GetByPostIdAsync(int postId)
        {
            var sql = @"
                SELECT c.*, (u.FirstName + ' ' + u.LastName) AS AuthorName
                FROM Blog.Comments c
                INNER JOIN Blog.Users u ON c.UserId = u.Id
                WHERE c.PostId = @PostId
                ORDER BY c.CreatedAt ASC";

            return await _context.LoadData<CommentReadDto>(sql, new { PostId = postId });
        }

        public async Task<CommentReadDto?> GetByIdAsync(int id)
        {
            var sql = @"
                SELECT c.*, (u.FirstName + ' ' + u.LastName) AS AuthorName
                FROM Blog.Comments c
                INNER JOIN Blog.Users u ON c.UserId = u.Id
                WHERE c.Id = @Id";

            return await _context.LoadDataSingle<CommentReadDto>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(Comment comment)
        {
            var sql = @"
                INSERT INTO Blog.Comments (PostId, UserId, Content, ParentId)
                VALUES (@PostId, @UserId, @Content, @ParentId);
                SELECT CAST(SCOPE_IDENTITY() as int)";

            return await _context.ExecuteWithRowCount(sql, comment);
        }

        public async Task<bool> UpdateAsync(Comment comment)
        {
            var sql = @"
                UPDATE Blog.Comments
                SET Content = @Content
                WHERE Id = @Id";

            return await _context.ExecuteSql(sql, comment);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var sql = "DELETE FROM Blog.Comments WHERE Id = @Id";
            return await _context.ExecuteSql(sql, new { Id = id });
        }
    }
}
