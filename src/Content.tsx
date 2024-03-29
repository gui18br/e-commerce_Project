import React from "react";
import { Switch, Route } from "react-router-dom";
import { Store } from "./pages/Store/Store";
import { Cart } from "./pages/Cart/Cart";
import { ItemDetail } from "./pages/ItemDetail/ItemDetail";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { Payment } from "./pages/Payment/Payment";
import { Profile } from "./pages/Profile/Profile";

export const Content = () => {
  return (
    <Switch>
      <Route exact path="/perfil" component={Profile} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/esqueci-senha" component={ForgotPassword} />
      <Route exact path="/cadastro" component={Signup} />
      <Route exact path="/" component={Store} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/payment" component={Payment} />
      <Route path="/:id" component={ItemDetail} />
    </Switch>
  );
};
