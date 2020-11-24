import React, { useState, useRef } from "react";

import LoadingBar from "react-top-loading-bar";
import ClienteApi from "../../../services/clienteApi";
import ordemAbertaApi from "../../../services/ordemAbertaApi"
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';


const api = new ClienteApi();
const api_aberta = new ordemAbertaApi();
export default function ConsultClient() {
    
    const loadingBar = useRef(null);
    const [registros, setRegistros] = useState([])


    const consultarClick = async () => {

        loadingBar.current.continuousStart();
        const lns = await api.consultar()
        console.log(lns)
        setRegistros([...lns])


        const aberta = await api_aberta.consultar();
        console.log(aberta[0]["quantidade"])
        
        loadingBar.current.complete();
    }

    const deletarClick = async (id) => {
        const deletado = await api.deletar(id)
        await consultarClick();
    }




    return (
        // <Container>
        //    <Breadcrumb>
        //             <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        //             <Breadcrumb.Item href="/register">Cadastro</Breadcrumb.Item>
        //             <Breadcrumb.Item active>Cadastro de Clientes</Breadcrumb.Item>
        //         </Breadcrumb>
               
        <div id="table-container">
        
            <LoadingBar 
                height={4}
                color="#f11946"
                ref={loadingBar}
                />
            <h1> Consultar Clientes </h1>
        
        <div>
            <button className="btn-consultar" onClick={consultarClick}> Consultar </button>
        </div>
      
        <div class="table-responsive">
            <table className="table">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>CEP</th>
                        <th>Endereco</th>
                        <th>Numero</th>
                        <th>Bairro</th>
                        <th>Localidade</th>
                        <th>UF</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Bicicleta</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {registros.map(item => 
                        <tr key={item.idCliente}>
                        <th>{item.idCliente}</th>
                        <td>{item.nmCliente}</td>
                        <td>{item.dsCpf}</td>
                        <td>{item.dsRg}</td>
                        <td>{item.dsCep}</td>
                        <td>{item.dsEndereco}</td>
                        <td>{item.dsLocalidade}</td>
                        <td>{item.dsBairro}</td>
                        <td>{item.dsLocalidade}</td>
                        <td>{item.dsUf}</td>
                        <td>{item.dsEmail}</td>
                        <td>{item.dsTelefone}</td>
                        <td>{item.dsBicicleta}</td>
                        <td>
                        <DeleteForeverIcon  style={{color: 'red', cursor: 'pointer'}} onClick={() => deletarClick(item.idCliente)}></DeleteForeverIcon>

                        </td>
                        <td>
                            <Link to={{
                                pathname: "/update/client",
                                state: 

                                {
                                    id: item.idCliente,
                                    nome: item.nmCliente,
                                    cpf: item.dsCpf,
                                    rg: item.dsRg,
                                    endereco: item.dsEndereco,
                                    cep: item.dsCep,
                                    localidade: item.dsLocalidade,
                                    numero: item.dsNumero,
                                    uf: item.dsUf,
                                    bairro: item.dsBairro,
                                    email: item.dsEmail,
                                    telefone: item.dsTelefone,
                                    bicicleta: item.dsBicicleta
                                }
                            }}> <CreateIcon style={{color: '#FF9728', cursor: 'pointer'}} ></CreateIcon> </Link>
                        </td>
                        
                    </tr>
                        )}


                    
                </tbody>
            </table>
        </div>
        
        
        
        
        
        
        
      
  

       
        </div>
        
        //</Container>
    )
}
