import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Alterar(props) {

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [senha, setSenha] = useState("");

    fetch('api/account/alterar').then((response) => {

        if (response.ok) {
            response.text().then(r => alert(r));
        } else {
            response.text().then(r => alert(r));
        }

    });


    return (
        <div className="alterar">
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
                <button className="btn btn-success" style={{ marginLeft: '4em' }} type="button" onClick={Alterar}>Alterar</button>
                <Link tag={Link} style={{ color: 'white', width: '100px' }} className="btn btn-danger" to="/">Cancelar</Link>

            </form>
        </div>
    )
}