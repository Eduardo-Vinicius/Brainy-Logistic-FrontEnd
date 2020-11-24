import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import "./App.css"
import { Link } from "react-router-dom";


var abertos = 0;
var fechados = 0;

const App = () => {
  const [chartData, setChartData] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState();
  const [employeeAge, setEmployeeAge] = useState();

 

  const chart = () => {
    var value = ''

    axios
      .get("http://localhost:5000/tbordemservico")
      .then(res => {
        console.log(res);
        for (let x in res["data"]){  
          value = res["data"][x]["status"]
          if (value === "Aberto") {
            
            abertos = abertos + 1
            console.log("achamos o aberto")

          }
          else
          {
            fechados = fechados + 1
            console.log("Fechado")
          }
         
          console.log(abertos)
        }
        console.log(abertos, fechados);
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

  useEffect(() => {
    chart();
    console.log(abertos, fechados);

  }, []);

  return (
    <div className="App">
        
      
      <div className="Grafico">
      
      <h1>Grafico 1</h1>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Relatórios - Ordem de Serviço Abertas/Fechadas", display: true },
            
            }}
            />
            
    </div>
        <div className="Grafico2">
        <h1>Grafico 2 </h1>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Relatórios - Ordem de Serviço Abertas/Fechadas", display: true },
            
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
