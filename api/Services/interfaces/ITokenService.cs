namespace api.Repositories.interfaces
{
    public interface ITokenService
    {
        public string CreateToken(int id, string email);
    }
}