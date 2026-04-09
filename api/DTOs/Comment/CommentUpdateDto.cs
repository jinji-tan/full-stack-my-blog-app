using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Comment
{
    public class CommentUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(2000)]
        public string Content { get; set; } = string.Empty;
    }
}
