import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import './custom.css'
import TokenProvider from './components/TokenContext';
import Login from './components/Login';
import Logoff from './components/Logoff';
import Cadastro from './components/Cadastro';
import Alterar from './components/AlterarConta';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Switch>
                <Route path='/login' component={Login} />
                <Route path="/cadastrar" component={Cadastro} />
                <Route path="/alterar" component={Alterar} />
                <TokenProvider>
                    <Layout>
                        <Route exact path='/' component={Home} />
                        <Route path='/sair' component={Logoff} />
                    </Layout>
                </TokenProvider>
            </Switch>
        );
    }
}
