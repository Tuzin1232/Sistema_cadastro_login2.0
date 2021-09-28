import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Switch from '@material-ui/core/Switch';
import { DataGrid } from '@material-ui/data-grid';
import { useForm, Controller } from "react-hook-form";
import columns from './RepositorioSistemas';
import { useCookies } from 'react-cookie';
import './home.css'

function Home() {
    const [valor, setValor] = useState("");
    const [sistemas, setSistemas] = useState([])

    const [cookies, setCookie] = useCookies(['access_token']);

    const [id, setId] = useState(0);
    const [avaliacao, setAvaliacao] = useState("");
    const [tipo, setTipo] = useState("");
    const [pendFinanceira, setPendFinanceira] = useState("");
    const [mesAtraso, setMesAtraso] = useState("");
    const [contratoAtivo, setContratoAtivo] = useState("");
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [celular, setCelular] = useState("");
    const [contato, setContato] = useState("");
    const [ramoAtividade, setRamoAtividade] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [UF, setUF] = useState("");
    const [cep, setCep] = useState("");
    const [complemento, setComplemento] = useState("");
    const [ipAcesso, setIpAcesso] = useState("");
    const [obv, setObv] = useState("");
    const [ativo, setAtivo] = useState("");
    const [codigoCliente, setCodigoCliente] = useState("");


    const tabelaValor = { valor }

    const onSubmit = function (data) {
        data["sistemas"] = sistemas
        fetch('http://localhost:3000/api/cadastro', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    const { control, handleSubmit } = useForm();
    const handleChange = e => setValor(e.target.value);

    console.log(sistemas)

    function getValores() {
        let infoSistema = {
            id: sistemas.length + 1,
            ativo: document.getElementById("ativo").checked ? "Sim" : "Não",
            sistema: tabelaValor.valor,
            data_inicio: document.getElementById("data_inicio").value,
            data_fim: document.getElementById("data_fim").value,
            valor: document.getElementById("valor").value
        }
        setSistemas([...sistemas, infoSistema])

    }
    function salvarCliente() {
        const requestOptions = {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.access_token,
            },
            body: JSON.stringify({
                id: id,
                avaliacao: true,
                tipo: tipo,
                pend_financeira: true,
                mes_atraso: Number(mesAtraso),
                contrato_ativo: true,
                nome: nome,
                cpnj: cnpj,
                cpf: cpf,
                telefone: telefone,
                celular: celular,
                contato: contato,
                ramo_atividade: ramoAtividade,
                cidade: cidade,
                rua: rua,
                bairro: bairro,
                numero: Number(numero),
                UF: UF,
                cep: Number(cep),
                complemento: complemento,
                ip_acesso: ipAcesso,
                obv: obv,
                ativo: true,
                codigo_cliente: Number(codigoCliente)
            })
        };

        fetch('api/cliente/cadastrar', requestOptions).then((response) => {

            if (response.ok) {
                response.text().then(r => alert(r));
            } else {
                response.text().then(r => alert(r));
            }

        });
    }
    return (
        <form className="App" onSubmit={handleSubmit(onSubmit)}>
            <div className="btn_gerenciador">
                <ButtonGroup variant="contained">
                    <Button type="reset">Cancelar</Button>
                    <Button type="submit" id="btnSalvar" onClick={salvarCliente}>Salvar</Button>
                </ButtonGroup>

            </div>
            <div className="form">
                <p>Informações do contrato</p>
                <form className="form_contrato" noValidate autoComplete="on" style={{ display: 'flex', gap: "2em" }}>

                    <Controller
                        name="codigo"
                        control={control}
                        defaultValue=""
                        value={codigoCliente}
                        render={({ field }) => <TextField disabled id="codigo" label="Código" {...field} />}
                    />

                    <p>Pode Avaliar</p>
                    <Controller
                        name="avaliar"
                        control={control}
                        defaultValue={false}
                        value={avaliacao}
                        onChange={

                            (e) => {

                                setAvaliacao(avaliacao + "a")
                            }

                        }

                        render={({ field }) => <Switch id="avaliar" name="avaliar" label="Pode Avaliar" color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} {...field} />}
                    />

                    <FormControl id="tipoForm" className="tipo" style={{ width: "70px" }}>
                        <InputLabel id="tipoLabel">Tipo</InputLabel>
                        <Controller
                            name="tipo"
                            control={control}
                            defaultValue=""
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            render={({ field }) => (
                                <Select labelId="" id="tipo" {...field}>
                                    <MenuItem value={1}>1 </MenuItem>
                                    <MenuItem value={2}>2 </MenuItem>
                                    <MenuItem value={3}>3 </MenuItem>
                                </Select>
                            )
                            }
                        />

                    </FormControl>

                    <p>Pendencia Financeira</p>
                    <Controller
                        name="pend_financeira"
                        control={control}
                        defaultValue={false}
                        value={pendFinanceira}
                        onChange={(e) => setPendFinanceira(e.target.checked)}
                        render={({ field }) => <Switch id="pendFinanc" name="pend_financeira" color="default" inputProps={{ 'aria-label': 'checkbox with default color' }}{...field} />} />

                    <Controller
                        name="meses_atrasado"
                        control={control}
                        defaultValue=""
                        value={mesAtraso}
                        onChange={(e) => setMesAtraso(e.target.value)}
                        render={({ field }) => <TextField id="meses_atrasado" label="Meses em Atraso" type="number"{...field} />} />

                    <p>Contrato Ativo</p>
                    <Controller
                        name="contrato_atv"
                        control={control}
                        defaultValue={false}
                        value={contratoAtivo}
                        onChange={(e) => setContratoAtivo(e.target.checked)}
                        render={({ field }) => <Switch id="contrato_atv" name="contrato_atv" color="default" inputProps={{ 'aria-label': 'checkbox with default color' }}{...field} />} />

                </form>
            </div>
            <br></br>
            <div className="form">
                <p>Informações do Cliente</p>
                <form className="form_cliente" noValidate autoComplete="on" style={{ display: 'flex', gap: "1.5em", flexWrap: "wrap" }}>

                    <Controller
                        name="nome"
                        control={control}
                        defaultValue=""
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        render={({ field }) => <TextField id="nome" label="Nome" {...field} />}
                    />

                    <Controller
                        name="cnpj"
                        control={control}
                        defaultValue=""
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        render={({ field }) => <TextField id="cnpj" label="CNPJ" type="number" {...field} />}
                    />

                    <Controller
                        name="cpf"
                        control={control}
                        defaultValue=""
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        render={({ field }) => <TextField id="cpf" label="CPF" type="number" {...field} />}
                    />
                    <Controller
                        name="telefone"
                        control={control}
                        defaultValue=""
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        render={({ field }) => <TextField id="telefone" label="Telefone" type="number" {...field} />}
                    />
                    <Controller
                        name="celular"
                        control={control}
                        defaultValue=""
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                        render={({ field }) => <TextField id="celular" label="Celular" type="number" {...field} />}
                    />

                    <Controller
                        name="contato"
                        control={control}
                        defaultValue=""
                        value={contato}
                        onChange={(e) => setContato(e.target.value)}
                        render={({ field }) => <TextField id="contato" label="Contato" {...field} />}
                    />

                    <FormControl id="ramoForm" className="ramo" style={{ width: "170px" }}>
                        <InputLabel id="ramoLabel">Ramo de Atividade</InputLabel>
                        <Controller
                            name="ramo"
                            control={control}
                            defaultValue=""
                            value={ramoAtividade}
                            onChange={(e) => setRamoAtividade(e.target.value)}
                            render={({ field }) => (
                                <Select labelId="" id="ramoAtv" {...field}>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                            )
                            }
                        />
                    </FormControl>

                    <Controller
                        name="cidade"
                        control={control}
                        defaultValue=""
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        render={({ field }) => <TextField id="cidade" label="Cidade" {...field} />}
                    />

                    <Controller
                        name="rua"
                        control={control}
                        defaultValue=""
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        render={({ field }) => <TextField id="rua" label="Rua" {...field} />}
                    />

                    <Controller
                        name="bairro"
                        control={control}
                        defaultValue=""
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        render={({ field }) => <TextField id="bairro" label="Bairro" {...field} />}
                    />

                    <Controller
                        name="numero"
                        control={control}
                        defaultValue=""
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        render={({ field }) => <TextField id="numero" label="Número" type="number" {...field} />}
                    />

                    <FormControl id="UFForm" className="UF" style={{ width: "70px" }}>
                        <InputLabel id="UFLabel">UF</InputLabel>
                        <Controller
                            name="UF"
                            control={control}
                            defaultValue=""
                            value={UF}
                            onChange={(e) => setUF(e.target.value)}
                            render={({ field }) => (
                                <Select labelId="" id="UF" {...field}>
                                    <MenuItem value={"AC"}>AC</MenuItem>
                                    <MenuItem value={"AL"}>AL</MenuItem>
                                    <MenuItem value={"AP"}>AP</MenuItem>
                                    <MenuItem value={"AM"}>AM</MenuItem>
                                    <MenuItem value={"BA"}>BA</MenuItem>
                                    <MenuItem value={"CE"}>CE</MenuItem>
                                    <MenuItem value={"ES"}>ES</MenuItem>
                                    <MenuItem value={"GO"}>GO</MenuItem>
                                    <MenuItem value={"MA"}>MA</MenuItem>
                                    <MenuItem value={"MT"}>MT</MenuItem>
                                    <MenuItem value={"MS"}>MS</MenuItem>
                                    <MenuItem value={"MG"}>MG</MenuItem>
                                    <MenuItem value={"PA"}>PA</MenuItem>
                                    <MenuItem value={"PB"}>PB</MenuItem>
                                    <MenuItem value={"PR"}>PR</MenuItem>
                                    <MenuItem value={"PE"}>PE</MenuItem>
                                    <MenuItem value={"PI"}>PI</MenuItem>
                                    <MenuItem value={"RJ"}>RJ</MenuItem>
                                    <MenuItem value={"RN"}>RN</MenuItem>
                                    <MenuItem value={"RS"}>RS</MenuItem>
                                    <MenuItem value={"RO"}>RO</MenuItem>
                                    <MenuItem value={"RR"}>RR</MenuItem>
                                    <MenuItem value={"SC"}>SC</MenuItem>
                                    <MenuItem value={"SP"}>SP</MenuItem>
                                    <MenuItem value={"SE"}>SE</MenuItem>
                                    <MenuItem value={"TO"}>TO</MenuItem>
                                    <MenuItem value={"DF"}>DF</MenuItem>
                                </Select>
                            )
                            }
                        />
                    </FormControl>

                    <Controller
                        name="cep"
                        control={control}
                        defaultValue=""
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        render={({ field }) => <TextField id="cep" label="CEP" type="number" {...field} />}
                    />
                    <Controller
                        name="complemento"
                        control={control}
                        defaultValue=""
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                        render={({ field }) => <TextField id="complemento" label="Complemento" {...field} />}
                    />
                    <Controller
                        name="ip_acesso"
                        control={control}
                        defaultValue=""
                        value={ipAcesso}
                        onChange={(e) => setIpAcesso(e.target.value)}
                        render={({ field }) => <TextField id="ip_acesso" label="IP de acesso" {...field} />}
                    />

                    <Controller
                        name="obv"
                        control={control}
                        defaultValue=""
                        value={obv}
                        onChange={(e) => setObv(e.target.value)}
                        render={({ field }) => <TextField id="obv" label="Observação" {...field} />}
                    />

                </form>
            </div>
            <br></br>
            <div className="form">
                <p>Informações do Sistema</p>
                <div className="form_sistema" noValidate autoComplete="on" style={{ display: 'flex', gap: "10em", flexWrap: "wrap" }}>
                    <div className="switch" style={{ display: "flex", gap: "1.5em" }}>
                        <p>Ativo</p>
                        <Switch
                            id="ativo"
                            color="default"
                            name="ativo"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            value={ativo}
                            onChange={(e) => setAtivo(e.target.checked)}
                        />
                    </div>
                    <FormControl id="" className="tipo" style={{ width: "200px" }}>
                        <InputLabel id="sisLabel">Sistema</InputLabel>

                        <Select
                            onChange={handleChange}
                            labelId="sisLabelId"
                            id="sistema"
                            defaultValue="Assistência Social"

                        >
                            <MenuItem value={"Assistência Social"}>Assistência Social</MenuItem>
                            <MenuItem value={"CRM"}>CRM</MenuItem>
                            <MenuItem value={"Educação"}>Educação</MenuItem>
                            <MenuItem value={"Portal Cidadão"}>Portal Cidadão</MenuItem>
                            <MenuItem value={"S-Commerce"}>S-Commerce</MenuItem>
                            <MenuItem value={"SADM"}>SADM</MenuItem>
                            <MenuItem value={"SAS"}>SAS</MenuItem>
                            <MenuItem value={"Saúde"}>Saúde</MenuItem>
                            <MenuItem value={"SCA"}>SCA</MenuItem>
                            <MenuItem value={"SCA/SAS"}>SCA/SAS</MenuItem>
                            <MenuItem value={"SE"}>SE</MenuItem>

                        </Select>



                    </FormControl>
                    <TextField id="valor" label="Valor" type="number" />
                    <div className="data_inicio" noValidate>
                        <TextField
                            id="data_inicio"
                            label="Data de início"
                            type="date"
                            defaultValue="00-00-0000"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="data_fim" noValidate>
                        <TextField
                            id="data_fim"
                            label="Data de Término"
                            type="date"
                            defaultValue="00-00-0000"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div style={{ height: 400, width: '100%', marginTop: '-6em', marginBottom: '-6em' }}>
                        <DataGrid
                            rows={sistemas}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                    <ButtonGroup variant="contained">
                        <Button id="remove_selec">Remover Selecionados</Button>
                        <Button id="add" onClick={getValores}>Adicionar</Button>
                    </ButtonGroup>

                </div>
            </div>
        </form>
    );
}
export default Home;