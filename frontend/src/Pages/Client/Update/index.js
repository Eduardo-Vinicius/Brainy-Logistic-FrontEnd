import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClienteApi from "../../../services/clienteApi";
import { Form, Breadcrumb, Container, Col, Button, Row } from "react-bootstrap";
import CorreiosApi from "../../../services/correiosApi";

const api = new ClienteApi();

const api_correios = new CorreiosApi();

export default function UpdateClient(props) {
  const [id, setId] = useState(props.location.state.id);
  const [nome, setNome] = useState(props.location.state.nome);
  const [cpf, setCpf] = useState(props.location.state.cpf);
  const [rg, setRg] = useState(props.location.state.rg);
  const [endereco, setEndereco] = useState(props.location.state.endereco);
  const [cep, setCep] = useState(props.location.state.cep);
  const [email, setEmail] = useState(props.location.state.email);
  const [telefone, setTelefone] = useState(props.location.state.telefone);
  const [bairro, setBairro] = useState(props.location.state.bairro);
  const [uf, setUf] = useState(props.location.state.uf);
  const [numero, setNumero] = useState(props.location.state.numero);
  const [localidade, setLocalidade] = useState(props.location.state.localidade);
  const [bicicleta, setBicicleta] = useState(props.location.state.bicicleta);
  const [registros, setRegistros] = useState([]);
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

  const alterarClick = async () => {
    const request = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      endereco: endereco,
      cep: cep,
      bairro: bairro,
      uf: uf,
      numero: numero,
      localidade: localidade,
      email: email,
      telefone: telefone,
      bicicleta: bicicleta,
    };

    const resp = await api.alterar(id, request);

    toast.dark("🚀 Cliente alterado com sucesso!");
  };

  return (
    <Form>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/register">Cadastro</Breadcrumb.Item>
          <Breadcrumb.Item active>Cadastro de Clientes</Breadcrumb.Item>
        </Breadcrumb>
        <Form.Row>
          <Form.Group as={Col} xs={4} controlId="formGridNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              placeholder="Nome do Cliente"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridRg">
            <Form.Label>Rg</Form.Label>
            <Form.Control
              placeholder="xx.xxx.xxx-x"
              type="text"
              value={rg}
              onChange={(e) => setRg(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridCpf">
            <Form.Label>Cpf</Form.Label>
            <Form.Control
              placeholder="xxx.xxx.xxx-xx"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} xs={3} controlId="formGridCEP">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              placeholder="00000-000"
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

          <Form.Group as={Col} xs={8} controlId="formGridEndereco">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              placeholder="Rua, Bairro e Número"
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridEndereco">
            <Form.Label>Número</Form.Label>
            <Form.Control
              placeholder="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={6} controlId="formGridEndereco">
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              placeholder="Bairro"
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridEndereco">
            <Form.Label>Localidade</Form.Label>
            <Form.Control
              placeholder="Localidade"
              type="text"
              value={localidade}
              onChange={(e) => setLocalidade(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={2} controlId="formGridEndereco">
            <Form.Label>UF</Form.Label>
            <Form.Control
              placeholder="UF"
              type="text"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridemail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="email@email.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridTelefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              placeholder="(11)99999-9999"
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridNome">
            <Form.Label>Bicicleta</Form.Label>
            <Form.Control
              type="Nome"
              placeholder="Digite o nome da bicicleta"
              value={bicicleta}
              onChange={(e) => setBicicleta(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

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
