import React, { useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { Link } from "react-router-dom";
import providerApi from "../../../services/providerApi";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';

const api = new providerApi();

export default function ConsultProvider() {
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
    //    <Breadcrumb>
    //             <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    //             <Breadcrumb.Item href="/register">Cadastro</Breadcrumb.Item>
    //             <Breadcrumb.Item active>Cadastro de Clientes</Breadcrumb.Item>
    //         </Breadcrumb>

    <div id="table-container">
      <LoadingBar height={4} color="#f11946" ref={loadingBar} />
      <h1> Consultar Fornecedores </h1>

      <div>
        <button className="btn-consultar" onClick={consultarClick}> Consultar </button>
      </div>

      <div>
        <table className="table">
          <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Razão Social</th>
              <th>CNPJ</th>
              <th>Endereço</th>
              <th>Bairro</th>
              <th>Número</th>
              <th>Contato</th>
              <th>UF</th>
              <th>Localidade</th>
              <th>CEP</th>
              <th>Email</th>
              <th>Telefone</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {registros.map((item) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>{item.nome}</td>
                <td>{item.razaosocial}</td>
                <td>{item.cnpj}</td>
                <td>{item.endereco}</td>
                <td>{item.bairro}</td>
                <td>{item.numero}</td>
                <td>{item.contato}</td>
                <td>{item.uf}</td>
                <td>{item.localidade}</td>
                <td>{item.cep}</td>
                <td>{item.email}</td>
                <td>{item.telefone}</td>

                <td>
                <DeleteForeverIcon  style={{color: 'red', cursor: 'pointer'}} onClick={() => deletarClick(item.id)}></DeleteForeverIcon>

                </td>
                <td>
                  <Link
                    to={{
                      pathname: "/update/provider",
                      state: {
                        id: item.id,
                        nome: item.nome,
                        razaosocial: item.razaosocial,
                        cnpj: item.cnpj,
                        endereco: item.endereco,
                        cep: item.cep,
                        email: item.email,
                        telefone: item.telefone,
                        bairro: item.bairro,
                        numero: item.numero,
                        localidade: item.localidade,
                        contato: item.contato,
                        uf: item.uf,
                      },
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
