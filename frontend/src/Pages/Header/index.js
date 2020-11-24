import React from "react";
import logo from "../Images/logo.png";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Table, Button, Form } from "react-bootstrap";

const Sair = () => {
  localStorage.clear();
}
export default function Header() {
  return (
     
    <ReactBootStrap.Navbar collapseOnSelect expand="sm" bg="light">
      <ReactBootStrap.Navbar.Brand href="/">
        <img
          src={logo}
          alt="logo"
          width="160px"
          height="80px"
          className="d-inline-block-aling-top"
          alt="Logo Bike na porta"
        ></img>
      </ReactBootStrap.Navbar.Brand>
      <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
        <ReactBootStrap.Nav className="mr-auto">
          {/* MENU CADASTRO */}
          <ReactBootStrap.NavDropdown
            title="Cadastro"
            id="collasible-nav-dropdown"
          >
          
            <ReactBootStrap.NavDropdown.Item href="/register/client">
              Cadastro de Clientes
            </ReactBootStrap.NavDropdown.Item>
            <ReactBootStrap.NavDropdown.Item href="/register/employee">
              Cadastro de Funcionários
            </ReactBootStrap.NavDropdown.Item>
            <ReactBootStrap.NavDropdown.Item href="/register/provider">
              Cadastro de Fornecedores
            </ReactBootStrap.NavDropdown.Item>
          </ReactBootStrap.NavDropdown>

          {/* MENU CONSULTA */}
          <ReactBootStrap.NavDropdown
            title="Consulta"
            id="collasible-nav-dropdown"
          >
          
            <ReactBootStrap.NavDropdown.Item href="/consult/client">
              Consulta de Clientes
            </ReactBootStrap.NavDropdown.Item>
            <ReactBootStrap.NavDropdown.Item href="/consult/employee">
              Consulta de Funcionários
            </ReactBootStrap.NavDropdown.Item>
            <ReactBootStrap.NavDropdown.Item href="/consult/provider">
              Consulta de Fornecedores
            </ReactBootStrap.NavDropdown.Item>
          </ReactBootStrap.NavDropdown>

          {/* MENU COMPRAS */}
          <ReactBootStrap.NavDropdown
            title="Compras"
            id="collasible-nav-dropdown"
          >
            <ReactBootStrap.NavDropdown.Item href="/register/purchase">
              Cadastrar Produtos
            </ReactBootStrap.NavDropdown.Item>
          </ReactBootStrap.NavDropdown>

          {/* MENU ORDEM DE SERVIÇO */}
          <ReactBootStrap.NavDropdown
            title="Ordem de serviço"
            id="collasible-nav-dropdown"
          >
            <ReactBootStrap.NavDropdown.Item href="/register/os">
              Cadastro O.S
            </ReactBootStrap.NavDropdown.Item>
            <ReactBootStrap.NavDropdown.Item href="/consult/os">
              Consulta O.S
            </ReactBootStrap.NavDropdown.Item>
          </ReactBootStrap.NavDropdown>

          {/* MENU VENDAS */}
          <ReactBootStrap.NavDropdown
            title="Vendas"
            id="collasible-nav-dropdown"
          >
            <ReactBootStrap.NavDropdown.Item href="/register/sale">
              Nova Venda
            </ReactBootStrap.NavDropdown.Item>
            
            <ReactBootStrap.NavDropdown.Item href="/consult/sale">
              Consultar Vendas
            </ReactBootStrap.NavDropdown.Item>
  
          </ReactBootStrap.NavDropdown>

          {/* MENU ESTOQUE */}
          <ReactBootStrap.NavDropdown
            title="Estoque"
            id="collasible-nav-dropdown"
          >
            <ReactBootStrap.NavDropdown.Item href="/consult/product">
              Consultar Estoque
            </ReactBootStrap.NavDropdown.Item>
            
   
          </ReactBootStrap.NavDropdown>
          <Link to="/login">
          <Button color="green" onClick={Sair} Style = "margin-left: 870px;"> Sair </Button>
          </Link>
          
        </ReactBootStrap.Nav>
      </ReactBootStrap.Navbar.Collapse>
    </ReactBootStrap.Navbar>
  );
}
