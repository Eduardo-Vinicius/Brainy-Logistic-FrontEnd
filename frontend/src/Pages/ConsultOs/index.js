import React, { useState, useRef } from 'react'
import ordemServicoApi from '../../services/ordemServicoApi'
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import { Table, Button, Form } from "react-bootstrap";
import ordemServicoItemApi from '../../services/ordemServicoItemApi';
import "./style.css";


const api = new ordemServicoApi();
const api_itens = new ordemServicoItemApi();

export default function ConsultOs() {

  const loadingBar = useRef(null);
  const [registros, setRegistros] = useState([])
  const [itens, setItens] = useState([])

  const consultarClick = async () => {
      loadingBar.current.continuousStart();
      const lns = await api.consultar()
      setRegistros([...lns])
      loadingBar.current.complete();
  }

  const deletarClick = async (id) => {

      const ordemitens = await api_itens.consultar()
     

      for (let i in ordemitens)
      {
        
        if (ordemitens[i]["id_ordem_servico"] == id){
          console.log(ordemitens[i])
          const del = await api_itens.deletar(id)
        }
      }

      console.log(id)
      const deletado = await api.deletar(id)
      await consultarClick();
  }




  return (
    <div id="table-container">
      
      <LoadingBar 
                height={4}
                color="#f11946"
                ref={loadingBar}
                />
      <Form.Row>
        <h1> Consultar Ordem de Serviço </h1>
        <button className="btn-consultar" onClick={consultarClick}> Consultar </button> 
             </Form.Row>
      <div class="table-responsive">
      <Table responsive="md" className="table">
        <thead class="thead-dark">
          <tr>
            <th>Id</th>
            <th>Valor</th>
            <th>Data de Abertura</th>
            <th>Id Funcionário</th>
            <th>Id Cliente</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {registros.map(item =>
            <tr key = {item.id}>
              <th>{item.id}</th>
              <th>{item.valor}</th>
              <th>{item.dtOrdemServico}</th>
              <th>{item.idFuncionario}</th>
              <th>{item.idCliente}</th>
              <th>{item.status}</th>
              <td>
                  <DeleteForeverIcon  style={{color: 'red', cursor: 'pointer'}} onClick={() => deletarClick(item.id)}></DeleteForeverIcon>
                </td>
            
            <td>
                            <Link to={{
                                pathname: "/update/os",
                                state: 

                                {
                                    id: item.id,
                                    valor: item.valor,
                                    dtOrdemServico: item.dtOrdemServico,
                                    IdFuncionario: item.idFuncionario,
                                    IdCliente: item.idCliente,
                                    status: item.status
                                    
                                }
                            }}> <CreateIcon style={{color: '#FF9728', cursor: 'pointer'}} ></CreateIcon> </Link>
                        </td>

            </tr>)}
        </tbody>
      </Table>
    </div>
    </div>
  );
}


            // <th>Id</th>
            // <th>Funcionário</th>
            // <th>Cliente</th>
            // <th>E-mail</th>
            // <th>Bicicleta</th>
            // <th>Valor</th>
            // <th>Data O.S</th>
            // <th>Status</th>

            // {registros.map(item =>
            //   <tr key = {item.id}>
            //     <th>{item.id}</th>
            //     <th>{item.funcionario}</th>
            //     <th>{item.cliente}</th>
            //     <th>{item.email}</th>
            //     <th>{item.bicicleta}</th>
            //     <th>{item.valor}</th>
            //     <th>{item.dtOrdemServico}</th>
            //     <th>{item.status}</th>
