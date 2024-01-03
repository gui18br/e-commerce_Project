import React from "react";
import { Switch, Route } from "react-router-dom";
import { Store } from "./pages/Store/Store";
import { Cart } from "./pages/Cart/Cart";
import { ItemDetail } from "./pages/ItemDetail/ItemDetail"; // Importe o componente para exibir detalhes do item

export const Content = () => {
  return (
    <Switch>
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/" component={Store} />
      <Route path="/:id" component={ItemDetail} />
    </Switch>
  );
};
