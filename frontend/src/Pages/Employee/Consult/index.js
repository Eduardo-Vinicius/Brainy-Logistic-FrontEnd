import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import EmployeeApi from "../../../services/employeeApi";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';

const api = new EmployeeApi();

export default function ConsultEmployee() {
  const loadingBar = useRef(null);
  const [registros, setRegistros] = useState([]);

  const consultarClick = async () => {
    loadingBar.current.continuousStart();
    const lns = await api.consultar();
    setRegistros([...lns]);

    loadingBar.current.complete();
  };

  const deletarClick = async (id) => {
    const deletado = await api.deletar(id);
    await consultarClick();
  };

  return (
    // <Container>
    // <Breadcrumb>
    //          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    //          <Breadcrumb.Item href="/register">Cadastro</Breadcrumb.Item>
    //          <Breadcrumb.Item active>Cadastro de Clientes</Breadcrumb.Item>
    //      </Breadcrumb>

    <div id="table-container">
      <LoadingBar height={4} color="#f11946" ref={loadingBar} />
      <h1> Consultar Funcionários </h1>

      <div>
        <button className="btn-consultar" onClick={consultarClick}>
          {" "}
          Consultar{" "}
        </button>
      </div>
      <div class="table-responsive">
        <table className="table" responsive="md">
          <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>RG</th>
              <th>CEP</th>
              <th>Endereco</th>
              <th>Localidade</th>
              <th>Bairro</th>
              <th>Uf</th>
              <th>Numero</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Cargo</th>
              <th>Data de Nascimento</th>
              <th>Data de Contratação</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {registros.map((item) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>{item.nome}</td>
                <td>{item.cpf}</td>
                <td>{item.rg}</td>
                <td>{item.cep}</td>
                <td>{item.endereco}</td>
                <td>{item.localidade}</td>
                <td>{item.bairro}</td>
                <td>{item.uf}</td>
                <td>{item.numero}</td>
                <td>{item.email}</td>
                <td>{item.telefone}</td>
                <td>{item.cargo}</td>
                <td>{item.dataNascimento}</td>
                <td>{item.dataContratacao}</td>

                <td>
                <DeleteForeverIcon  style={{color: 'red', cursor: 'pointer'}} onClick={() => deletarClick(item.id)}></DeleteForeverIcon>
                </td>
                <td>
                  <Link
                    to={{
                      pathname: "/update/employee",
                      state: item,
                    }}
                  >
                  <CreateIcon style={{color: '#FF9728', cursor: 'pointer'}} ></CreateIcon>

                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    //</Container>
  );
}
