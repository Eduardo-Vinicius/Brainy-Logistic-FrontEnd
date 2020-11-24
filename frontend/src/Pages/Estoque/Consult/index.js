import React, { useState, useRef } from 'react'
import estoqueApi from '../../../services/estoqueApi'
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import "./ConsultProduct.css";


import { Table, Button, Form } from "react-bootstrap";

const api = new estoqueApi();

export default function ConsultEstoque() {

  const loadingBar = useRef(null);
  const [registros, setRegistros] = useState([])


  const consultarClick = async () => {
      loadingBar.current.continuousStart();
      const lns = await api.consultar()
      setRegistros([...lns])
      loadingBar.current.complete();
  }



  return (
    <div>
      
      <LoadingBar 
                height={4}
                color="#f11946"
                ref={loadingBar}
                />
      <Form.Row>
        <h1> Consultar Estoque </h1>
        <Button variant="success" xs={2} Style ="margin: 10px;"  onClick={consultarClick}>Consultar</Button>{' '}
      </Form.Row>
      <div class="table-responsive">
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Id do Estoque</th>
            <th>Nome do Produto</th>
            <th>Marca</th>
            <th>Local </th>
            <th>Data de Compra</th>
            <th>Valor Compra</th>
            <th>Valor Venda</th>
            <th>Quantidade</th>
            <th>Fornecedor</th>
          </tr>
        </thead>
        <tbody>
          {registros.map(item =>
            <tr key = {item.id}>
              <th>{item.idEstoque}</th>
              <th>{item.nmProduto}</th>
              <th>{item.dsMarca}</th>
              <th>{item.dsLocal}</th>
              <th>{item.dtCompra}</th>
              <th>{item.vlCompra}</th>
              <th>{item.vlVenda}</th>
              <th>{item.sumEDsQtd}</th>
              <th>{item.nmFornecedor}</th>
        
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