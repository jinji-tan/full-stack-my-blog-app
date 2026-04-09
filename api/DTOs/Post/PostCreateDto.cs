using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Post
{
    public class PostCreateDto
    {
        [Required]
        [MaxLength(255)]
        public string Title { get; set; } = "";

        [Required]
        public string Content { get; set; } = "";
    }
}