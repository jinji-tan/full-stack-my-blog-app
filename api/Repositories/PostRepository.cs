using api.Data;
using api.DTOs.Post;
using api.Models;
using api.Repositories.interfaces;

namespace api.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly MyBlogAppContext _context;

        public PostRepository(MyBlogAppContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PostReadDto>> GetAllAsync()
        {
            var sql = @"
                SELECT p.*, (u.FirstName + ' ' + u.LastName) AS AuthorName
                FROM Blog.Posts p
                INNER JOIN Blog.Users u ON p.UserId = u.Id
                ORDER BY p.CreatedAt DESC";
            
            return await _context.LoadData<PostReadDto>(sql);
        }

        public async Task<IEnumerable<PostReadDto>> GetPagedAsync(int offset, int limit)
        {
            var sql = @"
                SELECT p.*, (u.FirstName + ' ' + u.LastName) AS AuthorName
                FROM Blog.Posts p
                INNER JOIN Blog.Users u ON p.UserId = u.Id
                ORDER BY p.CreatedAt DESC
                OFFSET @Offset ROWS
                FETCH NEXT @Limit ROWS ONLY";
            
            return await _context.LoadData<PostReadDto>(sql, new { Offset = offset, Limit = limit });
        }

        public async Task<PostReadDto?> GetByIdAsync(int id)
        {
            var sql = @"
                SELECT p.*, (u.FirstName + ' ' + u.LastName) AS AuthorName
                FROM Blog.Posts p
                INNER JOIN Blog.Users u ON p.UserId = u.Id
                WHERE p.Id = @Id";
            
            return await _context.LoadDataSingle<PostReadDto>(sql, new { Id = id });
        }

        public async Task<IEnumerable<PostReadDto>> GetByUserIdAsync(int userId)
        {
            var sql = @"
                SELECT p.*, (u.FirstName + ' ' + u.LastName) AS AuthorName
                FROM Blog.Posts p
                INNER JOIN Blog.Users u ON p.UserId = u.Id
                WHERE p.UserId = @UserId
                ORDER BY p.CreatedAt DESC";
            
            return await _context.LoadData<PostReadDto>(sql, new { UserId = userId });
        }

        public async Task<int> CreateAsync(Post post)
        {
            var sql = @"
                INSERT INTO Blog.Posts (UserId, Title, Content)
                VALUES (@UserId, @Title, @Content);
                SELECT CAST(SCOPE_IDENTITY() as int)";
            
            return await _context.ExecuteWithRowCount(sql, post);
        }

        public async Task<bool> UpdateAsync(Post post)
        {
            var sql = @"
                UPDATE Blog.Posts
                SET Title = @Title,
                    Content = @Content,
                    UpdatedAt = SYSUTCDATETIME()
                WHERE Id = @Id";
            
            return await _context.ExecuteSql(sql, post);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var sql = "DELETE FROM Blog.Posts WHERE Id = @Id";
            return await _context.ExecuteSql(sql, new { Id = id });
        }
    }
}