import React, { useState } from 'react';
import { Redirect, Router } from 'react-router';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import './login.css'



export default function Login(props) {
    const [cookies, setCookie] = useCookies(['access_token'])
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [redirect, setRedirect] = useState(false);
    let expires = new Date();

    expires.setTime(expires.getTime() + (3 * 60 * 24 * 1000))

    function handleErrors(response) {


        if (!response.ok) {
            response.text().then(r => alert(r));
        } else {

            setCookie('nomeUsuario', nomeUsuario, { path: '/' });

            response.json().then(data => {
                setCookie('access_token', data.token, { path: '/', expires });

            }).then(setRedirect(true));



        }
        return response;
    }
    var initialState = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const requestOptions = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nomeUsuario,
                senha: senha,
            })
        };

        fetch('api/account/login', requestOptions).then(handleErrors);


    };

    if (redirect) {
        return <Redirect push to="/" />;
    }

    return (
        <form id="form1" runat="server" onSubmit={initialState} className="form">
            <label>
                Nome:
                <input style={{ marginLeft: '1em' }} type="text" name="nome" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} /><br />
            </label>
            <br/>
            <label>
                Senha:
                <input style={{ marginLeft: '1em' }} type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} /><br />
            </label>
            <br/>
            <button className="btn btn-success" style={{ marginLeft: '4em' }} type="submit" >Entrar</button>
            <Link className="btn btn-info" style={{ marginLeft: '2em' }} to="/cadastrar">Cadastro</Link>
        </form>
    );
}
