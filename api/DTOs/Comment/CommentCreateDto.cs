using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Comment
{
    public class CommentCreateDto
    {
        [Required]
        public int PostId { get; set; }

        [Required]
        [MaxLength(2000)]
        public string Content { get; set; } = string.Empty;

        public int? ParentId { get; set; }
    }
}
