import React from "react";
import { Switch, Route } from "react-router-dom";
import { Store } from "./pages/Store/Store";
import { Cart } from "./pages/Cart/Cart";
import { ItemDetail } from "./pages/ItemDetail/ItemDetail"; // Importe o componente para exibir detalhes do item
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";

export const Content = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/esqueci-senha" component={ForgotPassword} />
      <Route exact path="/cadastro" component={Signup} />
      <Route exact path="/" component={Store} />
      <Route exact path="/cart" component={Cart} />
      <Route path="/:id" component={ItemDetail} />
    </Switch>
  );
};
