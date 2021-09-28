import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar style={{justifyContent: 'space-between'}} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} style={{ color: 'white' }} to="/">Sistema de Cadastro</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} style={{ color: 'white', width: '60px' }} className="btn btn-primary" to="/">Home</NavLink>
                                </NavItem>
                                <br />
                                <NavItem>
                                    <NavLink tag={Link} style={{ color: 'white', width: '130px' }} className="btn btn-warning" to="/alterar">Alterar Conta</NavLink>
                                </NavItem>
                                <br />
                                <NavItem>
                                    <NavLink tag={Link} style={{ color: 'white', width: '60px' }} className="btn btn-danger" to="/sair">Sair</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
