import React, { useEffect, useState } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import { getAllProducts } from "../../services/produto.service";
import coupleMovingSofaImage from "../../assets/homem-e-mulher-encantados-positivamente-brincando-com-seu-cachorro-favorito-posam-no-sofa.jpg";
import { Header } from "../../components/header/index.js";
import { Button } from "../../components/button/index.js";
import "./style.css";

export const Store = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(getItem("carrinhoYt") || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        setData(products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchData();
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
      <Header qtdItens={`${cart.length}`} />

      <img className="initial-image" src={coupleMovingSofaImage} alt="" />

      <div className="carousel-itens">
        {data.map((e) => [
          <div className="card-item" key={e.id}>
            <Link className="link" to={`/${e.id}`}>
              <h4>{e.title.slice(0, 50) + "..."}</h4>
              <img src={e.thumbnail} alt="" />
            </Link>
            <h4>
              {e.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h4>
            <Button onClick={() => handleClick(e)}>
              {cart.some((itemCart) => itemCart.id === e.id) ? (
                <BsFillCartCheckFill />
              ) : (
                <BsFillCartPlusFill />
              )}
            </Button>
          </div>,
        ])}
      </div>
    </div>
  );
};
