import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeApi from "../../../services/employeeApi";
import { Form, Breadcrumb, Container, Col, Button, Row } from "react-bootstrap";
import CorreiosApi from "../../../services/correiosApi";

const api = new EmployeeApi();
const api_correios = new CorreiosApi();

export default function RegisterEmployee() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [registros, setRegistros] = useState("");
  const [cep_request, setCepRequest] = useState("");
  const [localidade, setLocalidade] = useState("");

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
      cpf: cpf,
      rg: rg,
      endereco: endereco,
      email: email,
      telefone: telefone,
      cargo: cargo,
      usuario: usuario,
      senha: senha,
      dataCadastro: dataCadastro,
      bairro: bairro,
      uf: uf,
      numero: numero,
      localidade: localidade,
      cep: cep,
    });

    toast.dark("🚀 Funcionário cadastrado com sucesso!");
  };

  return (
    <Form>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/">Cadastro</Breadcrumb.Item>
          <Breadcrumb.Item active>Cadastro de Funcionário</Breadcrumb.Item>
        </Breadcrumb>

        <Form.Row>
          <Form.Group as={Col} xs={6} controlId="formGridNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridRG">
            <Form.Label>RG</Form.Label>
            <Form.Control
              placeholder="Digite o RG"
              type="text"
              value={rg}
              onChange={(e) => setRg(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridCPF">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              placeholder="111.111.111.-11"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={6} controlId="formGridCargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              placeholder="Cargo"
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={3} controlId="formGridEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              placeholder="email@email.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridTel">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              placeholder="(11)99999-9999"
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={5} controlId="formGridNome">
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              placeholder="Nome de usuário"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridNome">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Form.Group>

          {/* <Form.Group as={Col} xs={3} controlId="formGridNome">
                        <Form.Label>Data de nascimento</Form.Label>
                        <Form.Control placeholder="Data de nascimento" />
                    </Form.Group> */}

          <Form.Group as={Col} xs={3} controlId="formGridNome">
            <Form.Label>Data de Criação</Form.Label>
            <Form.Control
              placeholder="Data de criação"
              type="date"
              value={dataCadastro}
              onChange={(e) => setDataCadastro(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={6} controlId="formGridCEP">
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
              placeholder="Rua"
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
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

          <Form.Group as={Col} xs={2} controlId="formGridEndereco">
            <Form.Label>N°</Form.Label>
            <Form.Control
              placeholder="Número"
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={6} controlId="formGridEndereco">
            <Form.Label>Localidade</Form.Label>
            <Form.Control
              placeholder="Local"
              type="text"
              value={localidade}
              onChange={(e) => setLocalidade(e.target.value)}
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
        <ToastContainer />
      </Container>
    </Form>
  );
}
