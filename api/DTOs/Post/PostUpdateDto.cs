using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Post
{
    public class PostUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; } = "";

        [Required]
        public string Content { get; set; } = "";
    }
}