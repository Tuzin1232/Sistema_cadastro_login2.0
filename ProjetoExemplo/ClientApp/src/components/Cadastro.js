import React, { useState } from 'react';


export default function Cadastro(props) {

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [senha, setSenha] = useState("");

    if (typeof nomeUsuario.foo !== 'undefined' && senha.foo !== 'undefined'){
        var cadastrar = () => {

            alert('cadastrando: ' + nomeUsuario + " " + senha);
            const requestOptions = {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: nomeUsuario,
                    senha: senha,
                })
            };
            fetch('api/account/cadastrar', requestOptions).then((response) => {

                if (response.ok) {
                    response.text().then(r => alert(r));
                } else {
                    response.text().then(r => alert(r));
                }

            });

        }
    } else {
        window.alert("Preencha todos os campos!")
    }


    return (
        <div className="cadastro">
            <form id="form1" runat="server" className="form">
                <label>
                    Nome:
                <input style={{ marginLeft: '1em' }} type="text" name="nome" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} /><br />
                </label>
                <br />
                <label>
                    Senha:
                <input style={{ marginLeft: '1em' }} type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} /><br />
                </label>
                <br />
                <button className="btn btn-success" style={{ marginLeft: '4em' }} type="button" onClick={cadastrar}>Cadastrar</button>

            </form>
        </div>
    )
}