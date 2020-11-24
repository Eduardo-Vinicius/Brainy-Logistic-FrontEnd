import React, { useState, useEffect  } from 'react'
import { Form, Breadcrumb, Container, Col, Button,} from 'react-bootstrap'
import {ToastContainer, toast } from "react-toastify";
import ClienteApi from '../../../services/clienteApi'
import productApi from '../../../services/productApi'
import employeeApi from '../../../services/employeeApi'
import vendaApi from '../../../services/vendaApi'
import vendaItemApi from '../../../services/vendaItemApi'
import Logo from './logo.png';


const api = new ClienteApi();
const api_produto = new productApi();
const api_func = new employeeApi();
const api_venda = new vendaApi();
const api_vendaitem = new vendaItemApi();
var carrinho = []
var data = new Date();
var hoje = data.getDate()
var month = data.getMonth()
if (month < 10){
    month = "0" + month
}
var year = data.getFullYear()
const data_hoje = year+'-'+month+'-'+hoje

console.log(data_hoje)

export default function RegisterVenda() {
    
    const [registros, setRegistros] = useState([])
    const [produtos, setProdutos] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [bicicleta, setBicicleta] = useState('')
    const [valorUnitario, setValorUnitario] = useState('')
    const [marca, setMarca] = useState('')
    const [qtd, setQtd] = useState()
    const [valorTotal, setValorTotal] = useState()
    const [nome, setNomeProduto] = useState()
    const [id, setId] = useState()
    const [valorOS, setValorOS] = useState()
    const [status, setStatus] = useState()
    const [qtdProd, setQtdProd] = useState(0)
    const [dataCompra, setDataCompra] = useState()
    const [calculo, setCalculo] = useState()
    const [valorManutencao, setValorManutencao] = useState()
    const [dataHoje, setDataHoje] = useState()
    //insert ordem serviço
    const [idOrdemServico, setIdOrdemServico] = useState()
    const [valor, setValor] = useState()
    const [dtOrdemServico, setDtOrdemServico] = useState()
    const [idFuncionario, setIdFuncionario] = useState()
    const [idCliente, setIdCliente] = useState()
    // const [dic, setDic] = useState(Date.now)

  
    const [IdFunc, setIdFunc] = useState()
   
    var count = 0
    var dict = {}


    const atualizarProdutos = async () => {
        const pr = await api_produto.consultar()
        setProdutos([...pr])
    }
    
    const salvarVenda = async () => {
        const pr = await api_produto.consultar()
        var request = {
            valor: valorOS,
            dataVenda: dtOrdemServico,
            idFuncionario: parseInt(idFuncionario),
            idCliente: parseInt(idCliente),
            }


        //console.log(request)
        //console.log(carrinho)
        const   resp = await
                api_venda.cadastrar(request)

        var e = (resp["data"]["id"])
        //console.log(e)

        for (let x in carrinho){
            const pr = await api_produto.consultar()
            //console.log(carrinho[x])
            var produtoId = carrinho[x]["id"]
            var qtdProdutos = parseInt(carrinho[x]["qtd"])
            //console.log(produtoId)
            //console.log()
            var request_item = {
                idVenda: parseInt(e),
                idProduto: produtoId,
                qtd: parseInt(carrinho[x]["qtd"]),
                valorTotal: carrinho[x]["valorTotal"]
            }

            console.log(request_item)
            var calc = 0
            for (let prod in pr){

                if (pr[prod]["id"] == produtoId)
                
                {
                    calc = qtdProd - qtdProdutos
                    //console.log(calc)
                    setCalculo(calc)
                   // console.log(calculo)
                    
                    //console.log("achou")
                    
                    var r = {
                        marca: pr[prod]["marca"],
                        nome: pr[prod]["nome"],
                        qtd: pr[prod]["qtd"] - qtdProdutos,
                        valorVenda: pr[prod]["valorVenda"],
                        dataCompra: pr[prod]["dataCompra"]
                    }
                    //console.log(r)
    
                    const resp3 = await api_produto.alterar(produtoId, r)
                   // console.log(resp3)
                atualizarProdutos()
                verIndexProdutos()
                }
            }
          
            
           // console.log(request_item)
            
            
            const resp2 = await api_vendaitem.cadastrar(request_item)
            //console.log(resp2)
            console.log("🚀 Venda Item Cadastrada")


            // console.log(qtdProd)
            // console.log(qtdProdutos)
            
            // console.log(calculo)
            // atualizarProdutos()
            // console.log(qtdProd)
            
            // console.log("antes: " + qtdProd)
            // var c = qtdProd - qtdProdutos
            // setCalculo(c)

            
            // console.log("depois: " + calculo)
            
            // console.log("depois qtd:  " + qtdProd)
            // var r = {
            //     marca: marca,
            //     nome: nome,
            //     qtd: calculo,
            //     valorVenda: valorUnitario,
            //     dataCompra: dataCompra
            // }
            // console.log(r)
            // const resp3 = await api_produto.alterar(produtoId, r)
            // console.log(resp3)
           
        
            }
        
        toast.dark("🚀 Venda realizada com sucesso!");
    }
    
    function MyFunction() {
        atualizarProdutos()
        if (qtd > qtdProd) {
            toast.error("Quantidade Insuficiente do produto " + nome)
        }
        else{
        var table = document.getElementById("tableProdutos");
        var row = table.insertRow(1);
        var cel_id = row.insertCell(0);
        var cel_nome = row.insertCell(1);
        var cel_marca = row.insertCell(2);
        var cel_unit = row.insertCell(3);
        var cel_qtd = row.insertCell(4);
        var cel_total = row.insertCell(5);
     
        cel_id.innerHTML = id
        cel_nome.innerHTML = nome
        cel_marca.innerHTML = marca
        cel_unit.innerHTML = valorUnitario
        cel_qtd.innerHTML = qtd
        cel_total.innerHTML = valorTotal
        
        carrinho.push({
            "id":  id,
            "nome": nome,
            "marca": marca,
            "valorUnitario": valorUnitario,
            "qtd": qtd,
            "valorTotal": valorTotal})
        console.log(carrinho)
      
        var soma = 0
        for (let i in carrinho)
        {
            soma = soma + carrinho[i]["valorTotal"]
        }
        setValorOS(soma)
    }
  
}
       
    
    
    function somaTotal() {
        var x = qtd*valorUnitario
        setValorTotal(x)
        
    
        
    }
    const consultarClick = async () => {

        
        //loadingBar.current.continuousStart();
        const lns = await api.consultar()
        setRegistros([...lns])
        //loadingBar.current.complete();
        
        
    }

    function verIndex() {
        
        var comboCidades = 
        document.getElementById("cboCidades");
        // console.log("O indice é: " + comboCidades.selectedIndex);
        // console.log("O texto é: " + comboCidades.options[comboCidades.selectedIndex].value);
        var idc = comboCidades.options[comboCidades.selectedIndex].value
        setIdCliente(idc)
        // console.log(id)
        
        for (let i in registros) {
            var id_negocio = registros[i]["idCliente"]
            console.log("negocio: " + id_negocio)
            console.log("cliente: " + idc)
            // console.log(id_negocio)
        
            //console.log("negocio: " + id_negocio)
            //console.log("cliente: " + idc)
            
            //console.log(registros[i])
            if (id_negocio == idc) {
                //console.log('entrou')
                //console.log("id que entrou no if negocio: " + id_negocio)
                //console.log("id que entrou no if: " + id)
                //console.log(registros[i])
                setEmail(registros[i]["dsEmail"])
                setTelefone(registros[i]["dsTelefone"])
                setBicicleta(registros[i]["dsBicicleta"])
                
                // console.log(registros[id]["email"])
            }
     
            // console.log(registros[i]);
          }
          consultarClickProduto()
    }

 
    const consultarClickProduto = async () => {

        
        //loadingBar.current.continuousStart();
        const p = await api_produto.consultar()
        setProdutos([...p])
        //loadingBar.current.complete();
        
    }

    function verIndexProdutos() {
        var comboProdutos = 
        document.getElementById("cboProdutos");
        //console.log("O indice é: " + comboProdutos.selectedIndex);
        //console.log("O texto é: " + comboProdutos.options[comboProdutos.selectedIndex].value);
        var id = comboProdutos.options[comboProdutos.selectedIndex].value
        //console.log(id)
        // console.log(produtos)
       
        for (let i in produtos) {
            //console.log(produtos[i]["id"])
            var id_negocio = produtos[i]["id"]
            //console.log(id_negocio)
            if (id_negocio == id) {
                setMarca(produtos[i]["marca"])
                setValorUnitario(produtos[i]["valorVenda"])
                setNomeProduto(produtos[i]["nome"])
                setId(produtos[i]["id"])
                setQtdProd(produtos[i]["qtd"])
                setDataCompra(produtos[i]["dataCompra"])
            }
     
            //console.log(produtos[i]);
            
          }
    }
    
    const consultarClickFuncionario = async () => {
        //loadingBar.current.continuousStart();
        const f = await api_func.consultar()
        setFuncionarios([...f])
        //loadingBar.current.complete();
        
    }
    function verIndexFuncionario() {
        var comboFunc = 
        document.getElementById("cboFuncionarios");
        //console.log("O indice é: " + comboProdutos.selectedIndex);
        //console.log("O texto é: " + comboProdutos.options[comboProdutos.selectedIndex].value);
        var id = comboFunc.options[comboFunc.selectedIndex].value
        setIdFuncionario(id)
        //console.log(id)
        // console.log(produtos)
       
        for (let i in funcionarios) {
            //console.log(produtos[i]["id"])
            var id_negocio = funcionarios[i]["id"]
            //console.log(id_negocio)
            if (id_negocio == id) {
                setIdFunc(funcionarios[i]["marca"])
                
            }
     
            
          }
          consultarClick();
    }




    // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {
    // Atualiza o titulo do documento usando a API do browser
    
    somaTotal();
    consultarClickFuncionario();

    // consultarClickProduto();
  });


return (
    <Form>
    <Container>
    <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/register">Cadastro</Breadcrumb.Item>
                    <Breadcrumb.Item active>Venda de Produtos</Breadcrumb.Item>
                </Breadcrumb>
               
                <h5>Informações do Funcionário</h5>
                <hr />
            
            <Form.Row>
                    <select id="cboFuncionarios"  width="900" style={{width: "900px"}}> 
                        {funcionarios.map(item => 
                        <option value={item.id}> {item.nome} </option>)}
                    </select>
                    <Button onClick={verIndexFuncionario} variant="success" as={Col} xs={2} Style ="margin-left: 30px;" size="small">
                        Selecionar Funcionário
                    </Button>
            </Form.Row>
    <br></br>
                <h5>Informações do Cliente:</h5>
                <hr />
            <Form.Row>    
                    <select id="cboCidades"  width="900" style={{width: "900px"}}> 
                        {registros.map(item => 
                        <option value={item.idCliente}> {item.nmCliente} </option>)}
                    </select>
                    <Button onClick={verIndex} variant="success" as={Col} xs={2} Style ="margin-left: 30px;" size="small">
                          Selecionar Cliente
                    </Button>
            </Form.Row>
              
        <Form.Row>
        <Form.Group as={Col} xs={4} controlId="formgridEmail" >
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                         type="text"
                         value={email}
                         disabled="true"
                         onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    
                    <Form.Group as={Col} xs={4} controlId="formGridTel" >
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                        disabled="true"
                         type="text"
                         value={telefone}
                         onChange={e => setTelefone(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} xs={4} controlId="formGridCpf" >
                        <Form.Label>Bicicleta</Form.Label>
                        <Form.Control
                         type="text"
                         value={bicicleta}
                         disabled="true"
                         onChange={e => setBicicleta(e.target.value)} />
                    </Form.Group>
        </Form.Row>
                {/* <Dropdown>
                <Dropdown.Toggle  id="cboCidades">
                    Clientes
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {registros.map(item =>
                    <Dropdown.Item value={item.id} >{item.nome} </Dropdown.Item>
                    )}
                </Dropdown.Menu>
                </Dropdown> */}
                
                <h5>Informações dos Produtos</h5>
                <hr />
                
       
        <Form.Row>
                <select id="cboProdutos"  width="900" style={{width: "900px"}}> 
                    {produtos.map(item => 
                    <option value={item.id}> {item.nome} </option>)}
                </select>
                <Button onClick={verIndexProdutos} variant="success" as={Col} xs={2} Style ="margin-left: 30px;" size="small">
                    Selecionar Produto
                </Button>

        </Form.Row>
        <Form.Row>
    
                    <Form.Group as={Col} xs={2} controlId="formGridCpf" >
                        <Form.Label>Quantidade Em Estoque</Form.Label>
                        <Form.Control
                         type="number"
                         disabled="true"
                         value={qtdProd}
                         onChange={e => setQtdProd(e.target.value)} />
                       
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId="formGridMarca" >
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                    
                         type="text"
                         value={marca}
                         disabled="true"
                         onChange={e => setMarca(e.target.value)} />
                    </Form.Group>


                    <Form.Group as={Col} xs={2} controlId="formgridVlUnit" >
                        <Form.Label>Vl. Unitário</Form.Label>
                        <Form.Control
                         type="text"
                         value={valorUnitario}
                         disabled="true"
                         onChange={e => setValorUnitario(e.target.value)} />
                    </Form.Group>
                 
                    <Form.Group as={Col} xs={2} controlId="formGridCpf" >
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control
                         type="number"
                         onChange={e => setQtd(e.target.value)} />
                       
                    </Form.Group>
                
                    <Form.Group as={Col} xs={2} controlId="formGridValorTotal" >
                        <Form.Label>Valor Total</Form.Label>
                        <Form.Control
                         type="number"
                         value={valorTotal}
                         onChange={e => setValorTotal(parseFloat(e.target.value))} />
                    </Form.Group>
                <Button variant="success" onClick={MyFunction} as={Col} xs={2} Style ="margin: auto; right: -465px;" size="small">
                    Adicionar
                </Button>
                </Form.Row> 
          <br/> 
          <br />
                <Form.Row>
                    
                <img src={Logo} width="50" height="30" Style="margin: 1px;" xs={1} id="imgLogo" ></img>  <h5> Carrinho </h5>  
                </Form.Row>
                
                <table class="table table-striped" style={{width: "100%"}} id="tableProdutos">
                <tr>
                    <th>ID do Produto</th>
                    <th>Nome do Produto</th>
                    <th>Marca</th>
                    <th>Valor Unitário</th>
                    <th>Quantidade</th>
                    <th>Valor Total</th>

                </tr>
                {/* {dict.map(item =>
                <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.valorUnitario}</td>
                    <td>{item.qtd}</td>
                    <td>{item.valorTotal}</td>
                </tr>)} */}
                </table>
                <hr/>
             

<br />
<h5>Finalizar a venda</h5>
<hr />
            <Form.Row>
            <Form.Group as={Col} xs={4} controlId="formgridVlUnit" >
                        <Form.Label>Data do Pedido</Form.Label>
                        <Form.Control
                         
                         type="date"
                         onChange={e => setDtOrdemServico(e.target.value)}
                         />
                    </Form.Group>
                    
                    <Form.Group as={Col} xs={4} controlId="formGridMarca" >
                        <Form.Label>Valor Total da O.S</Form.Label>
                        <Form.Control
                         value={valorOS}
                         type="text"
                         onChange={e => setValor(e.target.value)}
                      />
                    </Form.Group>
    </Form.Row>

                    <Button variant="success" onClick={salvarVenda} as={Col} xs={4} Style ="margin: 10px;" size="small">
                    Concluir Venda
                </Button>

    
                <ToastContainer />
    </Container>
    </Form>
)

};
