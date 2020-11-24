import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductApi from "../../../services/productApi";
import { Form, Breadcrumb, Container, Col, Button, Row } from "react-bootstrap";

const api = new ProductApi();

export default function UpdateProduct(props) {
  const [id, setId] = useState(props.location.state.id);
  const [nome, setNome] = useState(props.location.state.nome);
  const [marca, setMarca] = useState(props.location.state.marca);
  const [datacompra, setDataCompra] = useState(props.location.state.dataCompra);
  const [valorcompra, setValorCompra] = useState(
    props.location.state.valorCompra
  );
  const [valorvenda, setValorVenda] = useState(props.location.state.valorVenda);
  const [qtd, setQtd] = useState(props.location.state.qtd);
  const [idfornecedor, setIdFornecedor] = useState(
    props.location.state.idFornecedor
  );

  const alterarClick = async () => {
    const request = {
      nome: nome,
      marca: marca,
      dataCompra: datacompra,
      valorCompra: valorcompra,
      valorVenda: valorvenda,
      qtd: qtd,
      idfornecedor: idfornecedor,
    };
    const resp = await api.alterar(id, request);

    toast.dark("🚀 Produto alterado com sucesso!");
  };

  return (
    <Form>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/">Cadastro</Breadcrumb.Item>
          <Breadcrumb.Item active>Cadastro de produtos</Breadcrumb.Item>
        </Breadcrumb>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              placeholder="Digite o nome do produto"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridMarca">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              placeholder="Digite a marca"
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </Form.Group>

          {/* <Form.Group as={Col} controlId="formGridfornecedor">
            <Form.Label>Fornecedor</Form.Label>
            <Form.Control
              placeholder="Digite o fornecedor"
              type="number"
              value={idfornecedor}
              onChange={(e) => setIdFornecedor(parseInt(e.target.value))}
            /> */}
          {/* </Form.Group> */}
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={2} controlId="formGridqtd">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              placeholder="1, 20, 100"
              type="number"
              value={qtd}
              onChange={(e) => setQtd(parseInt(e.target.value))}
            />
          </Form.Group>

          <Form.Group as={Col} xs={2} controlId="formGridpreco">
            <Form.Label>Preço Unitário</Form.Label>
            <Form.Control
              placeholder="R$ 0,00"
              type="number"
              value={valorvenda}
              onChange={(e) => setValorVenda(parseFloat(e.target.value))}
            />
          </Form.Group>

          {/* <Form.Group as={Col} xs={3} controlId="formGridpreco">
            <Form.Label>Valor da compra</Form.Label>
            <Form.Control
              placeholder="R$ 0,00"
              type="number"
              value={valorcompra}
              onChange={(e) => setValorCompra(parseFloat(e.target.value))}
            />
          </Form.Group> */}

          <Form.Group as={Col} xs={3} controlId="formGriddatacompra">
            <Form.Label>Data da compra</Form.Label>
            <Form.Control
              placeholder="11/11/11"
              type="date"
              value={datacompra}
              onChange={(e) => setDataCompra(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        {/* BOTÕES */}
        <Row className="justify-content-md-end">
          <Button variant="secondary" Style="margin: 5px;" size="lg">
            Cancelar
          </Button>
          <Button
            onClick={alterarClick}
            variant="success"
            Style="margin: 5px;"
            size="lg"
          >
            Alterar
          </Button>
        </Row>
        <ToastContainer />
      </Container>
    </Form>
  );
}
