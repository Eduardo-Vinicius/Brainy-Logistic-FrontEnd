import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "../Context/Context";
import UIButton from "../Button/index";
import logo from "../Images/logo.png";
import EmployeeApi from "../../services/employeeApi"
import "./Login.css";

const api = new EmployeeApi();

function initialState() {
  return { user: "", password: "" };
}


function login({ user, password }) {


  console.log(user)
  if (user === "admin" && password === "admin") {
    return { token: "1234" };
  }
  return { error: "Usuário ou senha inválido" };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();
  const [registros, setRegistros] = useState([])
  const [user, setUser] = useState()
  const [pass, setPass] = useState()

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
    //console.log(values)
  }

  const LoginSystem = async() => {
    const lns = await api.consultar()
    console.log(lns)

    for (let e in lns) {


      if (lns[e]["usuario"] == values["user"] && lns[e]["senha"] == values["password"]) {
        console.log("entrou")
        setToken("1234");
        return history.push("/")
        return { token: "1234" };
      }
    }
    console.log("não entrou")
    setError("Usuário ou senha inválido" );
    setValues(initialState);
    return { error: "Usuário ou senha inválido" };

  
}

  function onSubmit(event) {
    event.preventDefault();

    const { token, error } = LoginSystem();
    console.log(token)
    if (token) {
      setToken(token);
      console.log("entrou no if do token")
      return history.push("/");
    }
    console.log("nao entrou")
    setError(error);
    setValues(initialState);
  }

  return (
    <div className="user-login">
      <form onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <img
            src={logo}
            alt="logo"
            width="380px"
            height="270px"
            alt="Logo Bike na porta"
          ></img>
          <label htmlFor="user">Usuário</label>
          <input
            id="user"
            type="text"
            name="user"
            value={values.user}
            onChange={onChange}
            
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </div>
        {error && <div className="user-login__error">{error}</div>}
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          
          rounded
        >
          Entrar
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;
