import React, { useState } from 'react'
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductApi from '../../../services/productApi';
import { Form, Breadcrumb, Container, Col, Button, Row  } from 'react-bootstrap'
import EstoqueApi from '../../../services/estoqueApi';
import { Link } from 'react-router-dom';

const api = new ProductApi();
const api_estoque = new EstoqueApi();


export default function QuestionProduct() {

    
    const [nome, setNome] = useState('')
    const [marca, setMarca] = useState('')
    const [datacompra, setDataCompra] = useState('')
    const [valorcompra, setValorCompra] = useState(0)
    const [valorvenda, setValorVenda] = useState(0)
    const [qtd, setQtd] = useState(0)
    const [idfornecedor, setIdFornecedor] = useState(0)

    const [local, setLocal] = useState()


    return (
         
        <Form>
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/">
                    Cadastro
        </Breadcrumb.Item>
                <Breadcrumb.Item active>Cadastros</Breadcrumb.Item>
            </Breadcrumb>

         
            {/* BOTÕES */}
            <Row className="justify-content-md-end">
            <Button variant="secondary" Style ="margin: 50px;"  size="lg" block>
                <Link to="/register/product"> PRODUTO EXISTENTE</Link>
        </Button>
            <Button  variant="success" Style ="margin: 50px;" size="lg" block>
                NOVO PRODUTO
        </Button>
        </Row>
        <ToastContainer />
        </Container>
    </Form>

        
    )
}