import React, { useEffect, useState } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { Link } from "react-router-dom";
import { getLimitProducts } from "../../services/produto.service";
import casalMoveis from "../../assets/jovem-mulher-se-mudando-para-uma-nova-casa.jpg";
import mulherCelular from "../../assets/mulher-escolhendo-telefone-na-loja-de-tecnologia.jpg";
import mulherLivro from "../..//assets/jovem-mulher-a-sorrir-com-livro-perto-da-estante.jpg";
import { Header } from "../../components/header/index.js";
import { Button } from "../../components/button/index.js";
import { useAuth } from "../../context/AuthContext.js";
import Pagination from "../../Paginations.js";
import "./style.css";
import { useProduct } from "../../context/ProductContext.js";

const LIMIT = 12;

export const Store = () => {
  const { userEmail, tokenData } = useAuth();
  const { product } = useProduct();

  const [data, setData] = useState([]);
  const [cart, setCart] = useState(
    tokenData && getItem(userEmail)
      ? getItem(userEmail)
      : getItem("userNotLogged") || []
  );
  const [offset, setOffSet] = useState(0);

  useEffect(() => {
    if (tokenData !== "" && getItem("userNotLogged")) {
      const combinedCart = [...getItem("userNotLogged"), ...getItem(userEmail)];
      setCart(combinedCart);
    }
  }, [tokenData, userEmail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getLimitProducts(LIMIT, offset, product);
        setData(products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchData();
  }, [offset, product]);

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
    <div className="box-store">
      <Header qtdItens={`${calcQuantity()}`} />
      <img
        className="initial-image"
        src={
          product === "moveis"
            ? casalMoveis
            : product === "livros"
            ? mulherLivro
            : mulherCelular
        }
        alt=""
      />
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
      <div className="pagination">
        <Pagination
          limit={LIMIT}
          total={1200}
          offset={offset}
          setOffset={setOffSet}
        />
      </div>
    </div>
  );
};
