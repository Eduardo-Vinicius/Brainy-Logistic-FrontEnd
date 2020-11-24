import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import providerApi from "../../../services/providerApi";
import { Form, Breadcrumb, Container, Col, Button, Row } from "react-bootstrap";
import CorreiosApi from "../../../services/correiosApi";
import VendaApi from "../../../services/vendaApi";
import { Link } from 'react-router-dom';

const api = new VendaApi();
const api_correios = new CorreiosApi();

export default function UpdateVendas(props) {
  const [IdVenda, setIdVenda] = useState(props.location.state.idVenda);
  const [valor, setValor] = useState(props.location.state.dsValor);
  const [datavenda, setDataVenda] = useState(props.location.state.dtVenda);
  const [IdFuncionario, setIdFuncionario] = useState(props.location.state.idFuncionario);
  const [IdCliente, setIdCliente] = useState(props.location.state.idCliente);


  const alterarClick = async () => {
    const request = {
        valor: valor,
        dataVenda: datavenda,
        idFuncionario: parseInt(IdFuncionario),
        idCliente: parseInt(IdCliente),
    };
    console.log(request);

    const resp = await api.alterar(IdVenda, request);

    toast.dark("🚀 Produto alterado com sucesso!");
  };

  return (
    <Form>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/register">Atualizar</Breadcrumb.Item>
                    <Breadcrumb.Item active>Atualizar Venda</Breadcrumb.Item>
                </Breadcrumb>
                    <Form.Row>
                    <Form.Group as={Col} xs={4} controlId="formGridID" >
                        <Form.Label>Id</Form.Label>
                        <Form.Control
                         type="text"
                         value={IdVenda}
                         onChange={e => setIdVenda(parseInt(e.target.value))} />
                    </Form.Group>
                    
                    <Form.Group as={Col} xs={4} controlId="formGridRg" >
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                        
                         type="text"
                         value={valor}
                         onChange={e => setValor(parseFloat(e.target.value))} />
                    </Form.Group>
    
                    <Form.Group as={Col} xs={4} controlId="formGridCpf" >
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                    
                         type="text"
                         value={datavenda}
                         onChange={e => setDataVenda(e.target.value)} />
                    </Form.Group>
    
               
                </Form.Row>            
      
                <Form.Row>
    
                <Form.Group as={Col} xs={4} controlId="formGridCEP">
                        <Form.Label>Id do Funcionario</Form.Label>
                        <Form.Control  
                         placeholder="00000-000"
                         type="text"
                         value={IdFuncionario}
                         onChange={e => setIdFuncionario(parseInt(e.target.value))} />
                    </Form.Group>
    

                    <Form.Group as={Col} xs={4} controlId="formGridCEP">
                        <Form.Label>Id do Cliente</Form.Label>
                        <Form.Control  
                    
                         type="text"
                         value={IdCliente}
                         onChange={e => setIdCliente(parseInt(e.target.value))} />
                    </Form.Group>

        </Form.Row>
                <Row className="justify-content-md-end">
                
                <Button variant="secondary" Style ="margin: 5px;"  size="lg">
                    <Link to="/consult/sale">Voltar</Link>
                </Button>
                <Button onClick={alterarClick} variant="success" Style ="margin: 5px;" size="lg" >
                    Alterar
                    
                </Button>
                
                </Row>
             
            </Container>
            <ToastContainer />
        </Form>
           
           
          
  );
}
