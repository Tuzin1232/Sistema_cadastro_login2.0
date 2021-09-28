using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoExemplo.Model
{
    [Table("usuario")]
    public class Usuario
    {
        [Key,Column("id")]
        public int id { get; set; }
        
        [Column("nome")]
        public string nome { get; set; }

        [Column("senha")]
        public string senha { get; set; }

        [NotMapped]
        public string token { get; set; }


    }
}
