using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Repositories.interfaces;
using Microsoft.IdentityModel.Tokens;

namespace api.Repositories
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            var tokenKey = config["Jwt:TokenKey"]
                ?? throw new Exception("Jwt:TokenKey not found in appsettings.json");

            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
        }

        public string CreateToken(int id, string email)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, id.ToString()),
                new Claim(ClaimTypes.Email, email)
            };
            
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
