using System.Security.Claims;
using api.DTOs.Post;
using api.Models;
using api.Repositories.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _post;

        public PostController(IPostRepository repository)
        {
            _post = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostReadDto>>> GetAll([FromQuery] int offset = 0, [FromQuery] int limit = 5)
        {
            if (limit > 50) limit = 50;
            if (offset < 0) offset = 0;

            var posts = await _post.GetPagedAsync(offset, limit);

            return Ok(posts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostReadDto>> GetById(int id)
        {
            var post = await _post.GetByIdAsync(id);

            if (post == null) return NotFound();

            return Ok(post);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(PostCreateDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            var post = new Post
            {
                UserId = userId,
                Title = dto.Title,
                Content = dto.Content
            };

            var newId = await _post.CreateAsync(post);

            var createdPost = await _post.GetByIdAsync(newId);
            if (createdPost == null) return StatusCode(500, "Error retrieving created post");

            return CreatedAtAction(nameof(GetById), new { id = newId }, createdPost);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PostUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest("ID mismatch");

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            var existingPost = await _post.GetByIdAsync(id);
            if (existingPost == null) return NotFound();
            if (existingPost.UserId != userId) return Forbid();

            var post = new Post
            {
                Id = id,
                Title = dto.Title,
                Content = dto.Content
            };
            var updated = await _post.UpdateAsync(post);
            if (!updated) return NotFound();

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            var existingPost = await _post.GetByIdAsync(id);

            if (existingPost == null) return NotFound();
            if (existingPost.UserId != userId) return Forbid();

            var deleted = await _post.DeleteAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}