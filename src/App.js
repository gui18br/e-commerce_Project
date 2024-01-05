import "./App.css";
import React, { useState } from "react";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { Content } from "./Content";
import { FaShoppingCart } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";

function App() {
  const [data, setData] = useState(getItem("carrinhoYt") || []);

  const history = useHistory();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleClick = () => {
    history.push("/cart");
  };
  return (
    <div className="App">
      <header>
        <h1>Store</h1>
        {currentPath !== "/cart" ? (
          <button className="carrinho" onClick={handleClick}>
            <FaShoppingCart />
          </button>
        ) : null}
      </header>
      <Content />
    </div>
  );
}

export default App;
