import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Home </h1>

        <div>
          <h2>
            {" "}
            <Link to="/register/client"> Cadastrar Cliente</Link>
          </h2>
        </div>
        <div>
          <h2>
            {" "}
            <Link to="/consult/client"> Consultar Cliente</Link>
          </h2>
        </div>

        <div>
          <h2>
            {" "}
            <Link to="/register/employee"> Cadastrar Func</Link>
          </h2>
        </div>
        <div>
          <h2>
            {" "}
            <Link to="/consult/employee"> Consultar Func</Link>
          </h2>
        </div>
        <div>
          <h2>
            {" "}
            <Link to="/register/product"> Cadastrar Product</Link>
          </h2>
        </div>
        <div>
          <h2>
            {" "}
            <Link to="/consult/product"> Consultar Product</Link>
          </h2>
        </div>
      </header>
    </div>
  );
}

export default App;
