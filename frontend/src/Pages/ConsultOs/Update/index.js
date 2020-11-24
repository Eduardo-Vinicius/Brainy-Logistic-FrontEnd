import React, { useState } from 'react'
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ordemServicoApi from '../../../services/ordemServicoApi';
import { Form, Breadcrumb, Container, Col, Button, Row  } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const api = new ordemServicoApi();


export default function UpdateOs(props) {

    
        const [id, setId] = useState(props.location.state.id)    
        const [valor, setValor] = useState(props.location.state.valor)
        const [dtOrdemServico, setDtOrdemServico] = useState(props.location.state.dtOrdemServico)
        const [IdFuncionario, setIdFuncionario] = useState(props.location.state.IdFuncionario)
        const [IdCliente, setIdCliente] = useState(props.location.state.IdCliente)
        const [status, setStatus] = useState(props.location.state.status)
        
    
        const alterarClick= async () => {
    
            const request = {
                id: id,
                valor: valor,
                dtOrdemServico: dtOrdemServico,
                IdFuncionario: IdFuncionario,
                IdCliente: IdCliente,
                status: status 
            }

            const resp = await api.alterar(id, request)
            
            toast.dark("🚀 Ordem de Serviço alterada com sucesso!");

            
            
        }
    
        return (
    
            <Form>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/register">Cadastro</Breadcrumb.Item>
                    <Breadcrumb.Item active>Update Ordem de Serviço</Breadcrumb.Item>
                </Breadcrumb>
                    <Form.Row>
                    <Form.Group as={Col} xs={4} controlId="formGridID" >
                        <Form.Label>Id</Form.Label>
                        <Form.Control
                         type="text"
                         value={id}
                         onChange={e => setId(parseInt(e.target.value))} />
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
                         value={dtOrdemServico}
                         onChange={e => setDtOrdemServico(e.target.value)} />
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

                    <Form.Group as={Col} xs={4} controlId="formGridCEP">
                        <Form.Label>Status</Form.Label>
                        <Form.Control  
                         placeholder="00000-000"
                         type="text"
                         value={status}
                         onChange={e => setStatus(e.target.value)} />
                    </Form.Group>

        </Form.Row>
                <Row className="justify-content-md-end">
                
                <Button variant="secondary" Style ="margin: 5px;"  size="lg">
                    <Link to="/consult/os">Voltar</Link>
                </Button>
                <Button onClick={alterarClick} variant="success" Style ="margin: 5px;" size="lg" >
                    Alterar
                    
                </Button>
                
                </Row>
                <ToastContainer />
            </Container>
        </Form>
           
           
          
            
        )
    }