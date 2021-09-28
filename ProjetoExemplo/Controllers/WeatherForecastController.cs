using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ProjetoExemplo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly AppDatabase _Context;

        public WeatherForecastController(AppDatabase Context)
        {
            _Context = Context;
        }

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

   

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {

            var identity = (ClaimsIdentity)User.Identity;

            int idUsuario = int.Parse(identity.Claims.Where(cd => cd.Type == "id").First().Value.ToString());

            var usuario = _Context.Usuarios.Where(u => u.id == idUsuario).FirstOrDefault();


            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
