import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeApi from "../../../services/employeeApi";
import { Form, Breadcrumb, Container, Col, Button, Row } from "react-bootstrap";
import CorreiosApi from "../../../services/correiosApi";

const api = new EmployeeApi();
const api_correios = new CorreiosApi();

export default function UpdateEmployee(props) {
  const [id, setId] = useState(props.location.state.id);
  const [nome, setNome] = useState(props.location.state.nome);
  const [cpf, setCpf] = useState(props.location.state.cpf);
  const [rg, setRg] = useState(props.location.state.rg);
  const [endereco, setEndereco] = useState(props.location.state.endereco);
  const [cep, setCep] = useState(props.location.state.cep);
  const [email, setEmail] = useState(props.location.state.email);
  const [telefone, setTelefone] = useState(props.location.state.telefone);
  const [cargo, setCargo] = useState(props.location.state.cargo);
  const [usuario, setUsuario] = useState(props.location.state.usuario);
  const [senha, setSenha] = useState(props.location.state.senha);
  const [dataCadastro, setDataCadastro] = useState(
    props.location.state.dataCadastro
  );
  const [localidade, setLocalidade] = useState(props.location.state.localidade);
  const [bairro, setBairro] = useState(props.location.state.bairro);
  const [numero, setNumero] = useState(props.location.state.numero);
  const [uf, setUf] = useState(props.location.state.uf);
  const [ceprequest, setCepRequest] = useState(props.location.state.ceprequest);
  const [registros, setRegistros] = useState(props.location.state.registros);

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
      email: email,
      telefone: telefone,
      cargo: cargo,
      usuario: usuario,
      senha: senha,
      dataCadastro: dataCadastro,
      localidade: localidade,
      bairro: bairro,
      numero: numero,
      uf: uf,
    };
    console.log(request);

    const resp = await api.alterar(id, request);

    toast.dark("🚀 Fornecedor alterado com sucesso!");
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
