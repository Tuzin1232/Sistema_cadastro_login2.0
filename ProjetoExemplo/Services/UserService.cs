using Microsoft.IdentityModel.Tokens;
using ProjetoExemplo.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoExemplo.Services
{
    public class UserService
    {
        private readonly AppDatabase _Context;

        public UserService(AppDatabase Context)
        {
            _Context = Context;
        }
        public Usuario Authenticate(string username, string password)
        {

           // password = CalculateSHA1(password);

            var usuario = _Context.Usuarios.Where(u => u.nome == username && (u.senha == password)).FirstOrDefault();


            if (usuario == null)
                return null;

            gerarToken(usuario);


            return usuario;
        }

        private void gerarToken(Usuario usuario)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Settings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usuario.nome),
                    new Claim("id", usuario.id.ToString()),
                }),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),


            };
            TokenValidationParameters validation = new TokenValidationParameters()
            {
                ValidateLifetime = false,
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);


            usuario.token = tokenHandler.WriteToken(token);

            usuario.senha = null;
        }

        public static string CalculateSHA1(string text)
        {
            try
            {
                byte[] buffer = Encoding.Default.GetBytes(text);
                System.Security.Cryptography.SHA1CryptoServiceProvider cryptoTransformSHA1 = new System.Security.Cryptography.SHA1CryptoServiceProvider();
                string hash = BitConverter.ToString(cryptoTransformSHA1.ComputeHash(buffer)).Replace("-", "");
                return hash;
            }
            catch (Exception x)
            {
                throw new Exception(x.Message);
            }
        }
    }
}
