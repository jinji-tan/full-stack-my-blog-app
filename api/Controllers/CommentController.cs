using System.Security.Claims;
using api.DTOs.Comment;
using api.Models;
using api.Repositories.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _comment;

        public CommentController(ICommentRepository repository)
        {
            _comment = repository;
        }

        [HttpGet("post/{postId}")]
        public async Task<ActionResult<IEnumerable<CommentReadDto>>> GetByPostId(int postId)
        {
            var comments = await _comment.GetByPostIdAsync(postId);
            return Ok(comments);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CommentCreateDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            var comment = new Comment
            {
                PostId = dto.PostId,
                UserId = userId,
                Content = dto.Content,
                ParentId = dto.ParentId
            };

            var newId = await _comment.CreateAsync(comment);
            
            var createdComment = await _comment.GetByIdAsync(newId);
            if (createdComment == null) return StatusCode(500, "Error retrieving created comment");

            return Ok(createdComment);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CommentUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest("ID mismatch");

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            var existingComment = await _comment.GetByIdAsync(id);
            if (existingComment == null) return NotFound();
            if (existingComment.UserId != userId) return Forbid();

            var comment = new Comment
            {
                Id = id,
                Content = dto.Content
            };

            var updated = await _comment.UpdateAsync(comment);
            if (!updated) return NotFound();

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            var existingComment = await _comment.GetByIdAsync(id);
            if (existingComment == null) return NotFound();
            if (existingComment.UserId != userId) return Forbid();

            var deleted = await _comment.DeleteAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}
