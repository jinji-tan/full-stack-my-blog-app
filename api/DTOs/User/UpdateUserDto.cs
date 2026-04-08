using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class UpdateUserDto
    
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required, StringLength(50)]
        public string FirstName { get; set; } = string.Empty;
        [Required, StringLength(50)]
        public string LastName { get; set; } = string.Empty;
    
    }
}