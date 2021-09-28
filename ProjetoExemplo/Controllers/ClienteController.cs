using Microsoft.AspNetCore.Mvc;
using ProjetoExemplo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoExemplo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : Controller
    {
        private readonly AppDatabase _Context;

        public ClienteController(AppDatabase Context)
        {
            _Context = Context;
        }
        [HttpPost("cadastrar")]
        public IActionResult Cadastrar([FromBody] Cliente model)
        {
            try
            {
                var clienteExistente = _Context.Clientes.Where(u => u.nome.ToUpper() == model.nome.ToUpper()).Count() > 0;
                if (!clienteExistente)
                {
                    _Context.Clientes.Add(model);

                    _Context.SaveChanges();

                    return Ok("Cliente cadastrado com sucesso");
                }
                else
                {
                    return BadRequest("Cliente já cadastrado");
                }

            }
            catch (Exception ex)
            {
                return BadRequest("Falha ao realizar cadastro: " + ex.Message);
            }

        }
    }
}
