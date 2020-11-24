import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import providerApi from "../../../services/providerApi";
import { Form, Breadcrumb, Container, Col, Button, Row } from "react-bootstrap";
import CorreiosApi from "../../../services/correiosApi";

const api = new providerApi();
const api_correios = new CorreiosApi();

export default function RegisterProvider() {
  const [nome, setNome] = useState("");
  const [razaosocial, setRazaosocial] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [contato, setContato] = useState("");
  const [bairro, setBairro] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState("");
  const [registros, setRegistros] = useState("");
  const [cep_request, setCepRequest] = useState("");

  const consultarClick = async (cep) => {
    //loadingBar.current.continuousStart();
    const dados = await api_correios.consultar(cep);
    console.log(dados);
    setRegistros(dados);
    //loadingBar.current.complete();
    setEndereco(dados["data"]["logradouro"]);
    setCepRequest(dados["data"]["cep"]);
    setBairro(dados["data"]["bairro"]);
    setUf(dados["data"]["uf"]);
    setLocalidade(dados["data"]["localidade"]);
  };

  const salvarClick = async () => {
    const resp = await api.cadastrar({
      nome: nome,
      razaosocial: razaosocial,
      cnpj: cnpj,
      localidade: localidade,
      cep: cep,
      email: email,
      telefone: telefone,
      contato: contato,
      bairro: bairro,
      uf: uf,
      numero: numero,
      endereco: endereco,
    });

    toast.dark("🚀 Fornecedor cadastrado com sucesso!");
  };

  return (
    <Form>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/">Cadastro</Breadcrumb.Item>
          <Breadcrumb.Item active>Cadastro de Fornecedores</Breadcrumb.Item>
        </Breadcrumb>

        <Form.Row>
          <Form.Group as={Col} xs={6} controlId="formGridNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              placeholder="Nome do fornecedor"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={6} controlId="formGridNome">
            <Form.Label>Razão Social</Form.Label>
            <Form.Control
              placeholder="Razão social"
              type="text"
              value={razaosocial}
              onChange={(e) => setRazaosocial(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridCPF">
            <Form.Label>CNPJ</Form.Label>
            <Form.Control
              placeholder="CNPJ do fornecedor"
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              placeholder="E-mail do fornecedor"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridTel">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              placeholder="Telefone do fornecedor"
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={5} controlId="formGridCEP">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              placeholder="CEP do fornecedor"
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </Form.Group>

          <Button
            onClick={() => consultarClick(cep)}
            variant="success"
            as={Col}
            xs={1}
            Style="margin: 32px;"
            size="small"
          >
            Buscar
          </Button>

          <Form.Group as={Col} xs={6} controlId="formGridEndereco">
            <Form.Label>Endereco</Form.Label>
            <Form.Control
              placeholder="Endereço do fornecedor"
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridEndereco">
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              placeholder="Bairro do fornecedor"
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={2} controlId="formGridEndereco">
            <Form.Label>Numero</Form.Label>
            <Form.Control
              placeholder="Número"
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridEndereco">
            <Form.Label>Localidade</Form.Label>
            <Form.Control
              placeholder="Local"
              type="text"
              value={localidade}
              onChange={(e) => setLocalidade(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridEndereco">
            <Form.Label>Contato</Form.Label>
            <Form.Control
              placeholder="Contato do fornecedor"
              type="text"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridEndereco">
            <Form.Label>UF</Form.Label>
            <Form.Control
              placeholder="UF do fornecedor"
              type="text"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        {/* BOTÕES */}
        <Row className="justify-content-md-end">
          <Button variant="secondary" Style="margin: 5px;" size="lg">
            Cancelar
          </Button>
          <Button
            onClick={salvarClick}
            variant="success"
            Style="margin: 5px;"
            size="lg"
          >
            Cadastrar
          </Button>
        </Row>
      </Container>
      <ToastContainer />
    </Form>
  );
}
