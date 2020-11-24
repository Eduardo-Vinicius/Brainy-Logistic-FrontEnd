import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import "./App.css"
import { Link } from "react-router-dom";


var abertos = 0;
var fechados = 0;
var lucro = 0;
var despesa = 0;

const App = () => {
  const [chartData, setChartData] = useState({});
  const [financeiroData, setFinanceiroData] = useState({})
  const [employeeSalary, setEmployeeSalary] = useState();
  const [employeeAge, setEmployeeAge] = useState();

 

  const chart = () => {
    var value = ''

    axios
      .get("http://localhost:5000/tbordemservico")
      .then(res => {
        for (let x in res["data"]){  
          value = res["data"][x]["status"]
          if (value === "Aberto") {
            
            abertos = abertos + 1

          }
          else
          {
            fechados = fechados + 1
          }
         
        
        }
   

        setChartData({
          labels: ["Abertos", "Fechados"],
          datasets: [
            {
              label: "level of thiccness",
              data: [abertos, fechados],
              backgroundColor: ["rgba(0, 65, 0, 0.7)", "rgba(123, 0, 0, 0.7)"],
              borderWidth: 5
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    
  };


  const lucros = () => {
    axios.get("http://localhost:5000/venda").then(res =>
    {
      console.log(res)
      for (let x in res["data"]){  
        console.log(res["data"][x]["dsValor"])
        lucro = lucro + res["data"][x]["dsValor"]


    }
  });
  

  axios.get("http://localhost:5000/tbordemservico").then(res =>
  {
    console.log(res)
    for (let x in res["data"]){  
      console.log(res["data"][x]["valor"])
      lucro = lucro + res["data"][x]["valor"]


      }
      
  }
  );
}
  
  const financeiro = () => {
    var value = ''

   
    axios
      .get("http://localhost:5000/compra")
      .then(res => {
        console.log(res)
        for (let x in res["data"]){  
          console.log(res["data"][x]["vlCompra"])
          despesa = despesa + res["data"][x]["vlCompra"]

       
           
        }


        setFinanceiroData({
          labels: ["Lucro", "Despesas"],
          datasets: [
            {
              label: "level of thiccness",
              data: [lucro, despesa],
              backgroundColor: ["rgba(0, 65, 0, 0.7)", "rgba(123, 0, 0, 0.7)"],
              borderWidth: 5
            }
          ]
        });


      })
      .catch(err => {
        console.log(err);
      });
    
  };

  useEffect(() => {
    chart();
    lucros();
    financeiro();
    
    console.log(abertos, fechados);

  }, []);

  return (
    
    <div className="App">
        
        <br></br>
        <br></br>  
      <div className="Grafico">
      
      <h3> Ordem de Serviço </h3>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Relatórios - Ordem de Serviço Abertas/Fechadas", display: true },
            
            }}
            />
            
    </div>
        <div className="Grafico2">
        <h3>Lucro</h3>
        <Pie
          data={financeiroData}
          options={{
            responsive: true,
            title: { text: "Relatórios - Lucro/Despesa", display: true },
            
            }
          }
        />
      </div>
      <div>
      </div>
      {/* <div className="Grafico4">
        <h1>Grafico 3 </h1>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Relatórios - Ordem de Serviço Abertas/Fechadas", display: true },
            
            }
          }
        />
      </div>
      <div className="Grafico3">
        <h1>Grafico 3 </h1>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Relatórios - Ordem de Serviço Abertas/Fechadas", display: true },
            
            }
          }
        />
      </div> */} 
      

    </div>
  );
};

export default App;
