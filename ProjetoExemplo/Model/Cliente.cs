using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoExemplo.Model
{
    [Table("clientes")]
    public class Cliente
    {
        public int id { get; set; }
        
        public bool? avaliacao { get; set; }

        public string tipo { get; set; }

        public bool? pend_financeira { get; set; }

        public int? mes_atraso { get; set; }

        public bool? contrato_ativo { get; set; }

        public string nome { get; set; }

        public string cnpj { get; set; }

        public string cpf { get; set; }

        public string telefone { get; set; }

        public string celular { get; set; }

        public string contato { get; set; }

        public string ramo_atividade { get; set; }

        public string cidade { get; set; }

        public string rua { get; set; }

        public string bairro { get; set; }

        public int? numero { get; set; }

        public string UF { get; set; }

        public int? cep { get; set; }

        public string complemento { get; set; }

        public string ip_acesso { get; set; }

        public string obv { get; set; }

        public bool? ativo { get; set; }

        public int? codigo_cliente { get; set; }

        [NotMapped]
        public string token { get; set; }


    }
}
