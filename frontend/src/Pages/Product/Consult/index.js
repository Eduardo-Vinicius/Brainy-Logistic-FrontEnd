import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import productApi from "../../../services/productApi";
import ProductApi from "../../../services/productApi";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import Buscar from "./buscar_texto.png";
const api = new productApi();

export default function ConsultProduct() {
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
    <div id="table-container">
      <LoadingBar height={4} color="#f11946" ref={loadingBar} />
      <h1> Consultar Produto </h1>
      <div>
        <button className="btn-consultar" onClick={consultarClick}>
          {" "}
          Consultar{" "}
        </button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Marca</th>
              <th>dataCompra</th>
              <th>Valor Venda</th>
              <th>Quantidade</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {registros.map((item) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>{item.nome}</td>
                <td>{item.marca}</td>
                <td>{item.dataCompra}</td>
                <td>{item.valorVenda}</td>
                <td>{item.qtd}</td>
                <td>
                  <DeleteForeverIcon
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deletarClick(item.id)}
                  ></DeleteForeverIcon>
                </td>
                <td>
                  <Link
                    to={{
                      pathname: "/update/product",
                      state: item,
                    }}
                  >
                    <CreateIcon
                      style={{ color: "#FF9728", cursor: "pointer" }}
                    ></CreateIcon>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
