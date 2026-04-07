namespace api.Services.interfaces
{
    public interface ITokenService
    {
        public string CreateToken(int id, string email);
    }
}