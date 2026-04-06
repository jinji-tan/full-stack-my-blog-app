using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class LoginDto
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required, StringLength(50), MinLength(8)]
        public string Password { get; set; } = string.Empty;
    
    }
}