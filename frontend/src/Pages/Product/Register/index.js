import React, { useState } from 'react'
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductApi from '../../../services/productApi';
import { Form, Breadcrumb, Container, Col, Button, Row  } from 'react-bootstrap'
import EstoqueApi from '../../../services/estoqueApi';

const api = new ProductApi();
const api_estoque = new EstoqueApi();


export default function RegisterProduct() {

    
    const [nome, setNome] = useState('')
    const [marca, setMarca] = useState('')
    const [datacompra, setDataCompra] = useState('')
    const [valorcompra, setValorCompra] = useState(0)
    const [valorvenda, setValorVenda] = useState(0)
    const [qtd, setQtd] = useState(0)
    const [idfornecedor, setIdFornecedor] = useState(0)
    const [idfuncionario, setIdFuncionario] = useState(0)
 
    const salvarClick= async () => {
        
        const request = {
            nome: nome,
            marca: marca,
            dataCompra: datacompra,
            valorCompra: valorcompra,
            valorVenda: valorvenda,
            qtd: qtd,
            idfornecedor: idfornecedor,
            idfuncionario: idfuncionario
        }



        // const resp = await api.cadastrar(request)

        // var id_produto = resp["data"]["id"]

        // const request_estoque = {
        //     local: local,
        //     qtd: qtd,
        //     idProduto: id_produto,
        //     valorvenda: valorvenda
        // }

        // const est = await api_estoque.consultar()
        // console.log(est)
        // for (let x in est)
        // {
        //     if (est[x]["dsMarca"] == marca && est[x]["nmProduto"] == nome )
        //     {
        //         console.log("achei")
        //     }
        // }

        // const resp_estoque = await api_estoque.cadastrar(request_estoque)

        // console.log(resp_estoque)
        // console.log(resp)

        // var id_produto = resp.id_produto



        toast.dark("🚀 Compra efetada com sucesso!");
    }

    return (
         
        <Form>
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/">
                    Cadastro
        </Breadcrumb.Item>
                <Breadcrumb.Item active>Compra de produtos</Breadcrumb.Item>
            </Breadcrumb>

            <Form.Row >
                <Form.Group as={Col} controlId="formGridNome" >
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                    placeholder="Digite o nome do produto"
                    type="text" 
                    value={nome}
                    onChange={e => setNome(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridMarca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control 
                    placeholder="Digite a marca"
                    type="text" 
                    value={marca}
                    onChange={e => setMarca(e.target.value)} />
                </Form.Group>


                <Form.Group as={Col} controlId="formGridfornecedor">
                    <Form.Label>Fornecedor</Form.Label>
                    <Form.Control 
                    placeholder="Digite o fornecedor"
                    type="number" 
                    value={idfornecedor}
                    onChange={e => setIdFornecedor(parseInt(e.target.value))} />
                    
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} xs={2} controlId="formGridqtd">
                    <Form.Label >Quantidade</Form.Label>
                    <Form.Control 
                    placeholder="1, 20, 100"
                    type="number" 
                    value={qtd}
                    onChange={e => setQtd(parseInt(e.target.value))} />
                </Form.Group>
                
               
                

                <Form.Group as={Col} xs={3} controlId="formGridpreco">
                    <Form.Label>Valor da compra</Form.Label>
                    <Form.Control placeholder="R$ 0,00" 
                    type="number" 
                    value={valorcompra}
                    onChange={e => setValorCompra(parseFloat(e.target.value))}/>
                </Form.Group>

                <Form.Group as={Col} xs={3} controlId="formGridpreco">
                    <Form.Label>Valor de Venda</Form.Label>
                    <Form.Control 
                    placeholder="R$ 0,00"
                    type="number" 
                    value={valorvenda}
                    onChange={e => setValorVenda(parseFloat(e.target.value))}
                     />
                </Form.Group>

                <Form.Group as={Col} xs={4} controlId="formGriddatacompra">
                    <Form.Label>Data da compra</Form.Label>
                    <Form.Control placeholder="11/11/11" 
                    type="date" 
                    value={datacompra}
                    onChange={e => setDataCompra(e.target.value)}/>
                </Form.Group>
            </Form.Row>

            
            <hr/>

            <Form.Row>
            <Form.Group as={Col} xs={4} controlId="formGriddatacompra">
                    <Form.Label>Funcionario </Form.Label>
                    <Form.Control 
                    type="text" 
                    value={idfuncionario}
                    onChange={e => setIdFuncionario(e.target.value)}/>
                </Form.Group>

            </Form.Row>


            {/* BOTÕES */}
            <Row className="justify-content-md-end">
            <Button variant="secondary" Style ="margin: 5px;"  size="lg">
                Cancelar
        </Button>
            <Button onClick={salvarClick} variant="success" Style ="margin: 5px;" size="lg">
                Cadastrar
        </Button>
        </Row>
        <ToastContainer />
        </Container>
    </Form>

        
    )
}