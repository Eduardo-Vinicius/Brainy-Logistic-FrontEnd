import React, { useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import VendaApi from "../../../services/vendaApi";
import VendaItemApi from "../../../services/vendaItemApi"


const api = new VendaApi();
const api_itens = new VendaItemApi();
export default function ConsultVendas() {
  const loadingBar = useRef(null);
  const [registros, setRegistros] = useState([]);

  const consultarClick = async () => {
    loadingBar.current.continuousStart();
    const lns = await api.consultar();
    setRegistros([...lns]);
    loadingBar.current.complete();
  };

  const deletarClick = async (id) => {
    const ordemitens = await api_itens.consultar()
     

    for (let i in ordemitens)
    {   
      console.log(id)  
      console.log(ordemitens[i]["idVenda"])
      
      if (ordemitens[i]["idVenda"] == id){
        console.log("entrou")
        var item = ordemitens[i]["idVendaItem"]
        const del = await api_itens.deletar(item)
      }
    }

    console.log(id)
    
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
      <h1> Consultar Vendas </h1>

      <div>
        <button className="btn-consultar" onClick={consultarClick}> Consultar </button>
      </div>

      <div class="table-responsive">
        <table className="table">
          <thead class="thead-dark">
            <tr>
              <th>Id</th>
              <th>Valor da Venda</th>
              <th>Data da Venda</th>
              <th>Cód. do Cliente</th>
              <th>Cód. do Funcionário</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {registros.map((item) => (
              <tr key={item.idVenda}>
                <th>{item.idVenda}</th>
                <td>{item.dsValor}</td>
                <td>{item.dtVenda}</td>

                <td>{item.idCliente}</td>
                <td>{item.idFuncionario}</td>
                
                <td>
                <DeleteForeverIcon  style={{color: 'red', cursor: 'pointer'}} onClick={() => deletarClick(item.idVenda)}></DeleteForeverIcon>

                </td>
                <td>
                  <Link
                    to={{
                      pathname: "/update/sale",
                      state: {
                        idVenda: item.idVenda,
                        dsValor: item.dsValor,
                        dtVenda: item.dtVenda,
                        idFuncionario: item.idFuncionario,
                        idCliente: item.idCliente,
                        
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
