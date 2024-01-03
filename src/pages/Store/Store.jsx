import React, { useEffect, useState } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { Link } from "react-router-dom";
import { ProductsArea } from "../../CSS/style";
import "./style.css";

export const Store = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(getItem("carrinhoYt") || []);

  useEffect(() => {
    const fetchApi = async () => {
      const url = "https://api.mercadolibre.com/sites/MLB/search?q=moveis";
      const response = await fetch(url);
      const objJson = await response.json();
      setData(objJson.results);
    };
    fetchApi();
  }, []);

  const handleClick = (obj) => {
    const element = cart.find((e) => e.id === obj.id);
    if (element) {
      const arrFilter = cart.filter((e) => e.id !== obj.id);
      setCart(arrFilter);
      setItem("carrinhoYt", arrFilter);
    } else {
      setCart([...cart, obj]);
      setItem("carrinhoYt", [...cart, obj]);
    }
  };

  return (
    <div>
      <header>
        <h1>Store</h1>
        <ul>
          <li>livros</li>
          <li>Celulares</li>
          <li>carros</li>
        </ul>
        <div>
          <Link to={"/cart"}>Carrinho</Link>
        </div>
      </header>
      <ProductsArea>
        {data.map((e) => [
          <div key={e.id}>
            <Link to={`/${e.id}`}>
              <h4>{e.title}</h4>
              <img src={e.thumbnail} alt="" />
              <h4>$ {e.price}</h4>
            </Link>
            <button
              className="transparent-button"
              onClick={() => handleClick(e)}
            >
              {cart.some((itemCart) => itemCart.id === e.id) ? (
                <BsFillCartCheckFill />
              ) : (
                <BsFillCartPlusFill />
              )}
            </button>
          </div>,
        ])}
      </ProductsArea>
    </div>
  );
};
