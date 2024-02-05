import React, { useEffect, useState } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../services/produto.service";
import coupleMovingSofaImage from "../../assets/homem-e-mulher-encantados-positivamente-brincando-com-seu-cachorro-favorito-posam-no-sofa.jpg";
import { Header } from "../../components/header/index.js";
import { Button } from "../../components/button/index.js";
import { useAuth } from "../../context/AuthContext.js";
import "./style.css";

export const Store = () => {
  const { userEmail, tokenData } = useAuth();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(
    tokenData && getItem(userEmail)
      ? getItem(userEmail)
      : getItem("userNotLogged") || []
  );

  useEffect(() => {
    if (tokenData !== "" && getItem("userNotLogged")) {
      const combinedCart = [...getItem("userNotLogged"), ...getItem(userEmail)];
      setCart(combinedCart);
    }
  }, [tokenData, userEmail]);

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
      setItem(tokenData ? userEmail : "userNotLogged", arrFilter);
    } else {
      const newItem = { ...obj, quantity: 1 };
      setCart([...cart, newItem]);
      setItem(tokenData ? userEmail : "userNotLogged", [...cart, newItem]);
    }
  };

  const calcQuantity = () => {
    let quantidade = 0;
    for (var i = 0; i < cart.length; i++) {
      quantidade += cart[i].quantity;
    }
    return quantidade;
  };

  return (
    <div>
      <Header qtdItens={`${calcQuantity()}`} />
      <img className="initial-image" src={coupleMovingSofaImage} alt="" />
      <div className="carousel-itens">
        {data.map((e) => [
          <div className="card-item" key={e.id}>
            <Link className="link" to={`/${e.id}`}>
              <h4>{e.title.slice(0, 50) + "..."}</h4>
              <img className="image-store" src={e.thumbnail} alt="" />
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
