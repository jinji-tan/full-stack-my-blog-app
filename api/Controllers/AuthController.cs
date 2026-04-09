using api.DTOs;
using api.Helpers.interfaces;
using api.Services.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _token;
        private readonly IAuthHelper _auth;
        public AuthController(ITokenService token, IAuthHelper auth)
        {
            _token = token;
            _auth = auth;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _auth.GetUsers();

            return Ok(users);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _auth.GetUserById(id);

            if (user == null) return BadRequest("User not found");

            await _auth.DeleteUser(id);

            return Ok($"User deleted: {user.Email}");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (await _auth.UserExists(registerDto.Email))
                return BadRequest("User already exists");

            bool registered = await _auth.Register(registerDto);
            if (registered == false) return BadRequest("Failed to register user");

            var user = await _auth.GetUserByEmail(registerDto.Email);
            if (user == null) return BadRequest("User created but could not be retrieved");

            return Ok(new
            {
                Id = user.Id,
                message = "User registered successfully",
                firstName = user.FirstName,
                lastName = user.LastName,
                token = _token.CreateToken(user.Id, user.Email)
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _auth.Login(loginDto);

            if (user == null) return BadRequest("Invalid Email or Password");

            return Ok(new
            {
                Id = user.Id,
                message = "User logged in successfully",
                firstName = user.FirstName,
                lastName = user.LastName,
                token = _token.CreateToken(user.Id, user.Email)
            });
        }
    }
}