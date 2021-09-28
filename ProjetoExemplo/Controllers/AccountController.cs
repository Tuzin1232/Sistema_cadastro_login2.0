using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoExemplo.Model;
using ProjetoExemplo.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoExemplo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly AppDatabase _Context;

        public AccountController(AppDatabase Context)
        {
            _Context = Context;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Authenticate([FromBody] Usuario model)
        {
            try
            {
                var service = new UserService(_Context);
                var user = service.Authenticate(model.nome, model.senha);

                if (user == null)
                {
                    var a = "Usuário ou senha inválidos.";                  
                    return BadRequest(a);
                }

                return Ok(user);

            }
            catch
            {
                return BadRequest("Falha ao realizar login");
            }

        }

        [HttpPost("cadastrar")]
        [AllowAnonymous]
        public IActionResult Cadastrar([FromBody] Usuario model)
        {
            try
            {
                var usuarioExistente = _Context.Usuarios.Where(u => u.nome.ToUpper() == model.nome.ToUpper()).Count() > 0;
                if (!usuarioExistente)
                {
                    _Context.Usuarios.Add(model);

                    _Context.SaveChanges();

                    return Ok("Usuário cadastrado com sucesso");
                }
                else
                {
                    return BadRequest("Usuário já cadastrado");
                }

            }
            catch(Exception ex)
            {
                return BadRequest("Falha ao realizar cadastro: "+ex.Message);
            }

        }
    }

}