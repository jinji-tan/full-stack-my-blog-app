using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class UpdatePasswordDto

    {
        [Required, StringLength(50), MinLength(8)]
        public string Password { get; set; } = string.Empty;
        [Required, Compare("Password", ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}