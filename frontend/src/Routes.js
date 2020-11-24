import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Teste from "./Pages/Teste";
import RegisterClient from "./Pages/Client/Register";
import ConsultClient from "./Pages/Client/Consult";
import UpdateClient from "./Pages/Client/Update";

import App from "./App"

import UpdateOs from './Pages/ConsultOs/Update'

import RegisterEmployee from "./Pages/Employee/Register";
import ConsultEmployee from "./Pages/Employee/Consult";
import UpdateEmployee from "./Pages/Employee/Update";

import RegisterProduct from "./Pages/Product/Register";
import ConsultProduct from "./Pages/Product/Consult";
import UpdateProduct from "./Pages/Product/Update";

import RegisterProvider from "./Pages/Provider/Register";
import ConsultProvider from "./Pages/Provider/Consult";
import UpdateProvider from "./Pages/Provider/Update";

import ConsultVendas from "./Pages/Vendas/Consult"
import RegisterVenda from "./Pages/Vendas/Register";
import UpdateVendas from "./Pages/Vendas/Update";

import RegisterPurchase from './Pages/Compra/Register'

import ConsultOs from "./Pages/ConsultOs/";
import Header from "./Pages/Header";
import Login from "./Pages/Login";
import Footer from "./Pages/Footer";
import StoreProvider from "./Pages/Context/Provider";
import RoutesPrivate from "./Pages/Rotas/Private/Private";

import NotFound from "./Pages/NotFound"

const DefaultContainer = () => (
  <div>
  <Header />
          <RoutesPrivate path="/" exact={true} component={App} />
          <RoutesPrivate path="/relatorios" exact={true} component={App} />
          <RoutesPrivate path="/teste" exact={true} component={Teste} />

          <RoutesPrivate path="/register/client" component={RegisterClient} />
          <RoutesPrivate path="/consult/client" component={ConsultClient} />
          <Route path="/update/client" component={UpdateClient} />

          <RoutesPrivate path="/register/employee" component={RegisterEmployee} />
          <RoutesPrivate path="/consult/employee" component={ConsultEmployee} />
          <Route path="/update/employee" component={UpdateEmployee} />

          <RoutesPrivate path="/register/product" component={RegisterProduct} />
          <RoutesPrivate path="/consult/product" component={ConsultProduct} />
          <Route path="/update/product" component={UpdateProduct} />

          <RoutesPrivate path="/register/provider" component={RegisterProvider} />
          <RoutesPrivate path="/consult/provider" component={ConsultProvider} />
          <Route path="/update/provider" component={UpdateProvider} />

          <RoutesPrivate path="/consult/os" component={ConsultOs} />
          <Route path="/update/os" component={UpdateOs} />
          <RoutesPrivate path="/register/os" component={Teste} />


          <RoutesPrivate path="/register/purchase" component={RegisterPurchase}  />

          <RoutesPrivate path="/register/sale" component={RegisterVenda} />
          <RoutesPrivate path="/consult/sale" component={ConsultVendas} />
          <Route path="/update/sale" component={UpdateVendas} />
       
    
  </div>
  
)

const LoginContainer = () => (
  
      <Route path="/login" exact={true} component={Login} />
)

const NotFoundPage = () => (
  <RoutesPrivate path="*" component={NotFound} />
)
    

export default function Routes() {
  return (
    
    <StoreProvider>
      <BrowserRouter>
        <Switch>
        <Route path="/login" exact={true} component={LoginContainer}/>

        <Route component={DefaultContainer}/>
        </Switch>
        <Footer />
      </BrowserRouter>
    </StoreProvider>
  );
}