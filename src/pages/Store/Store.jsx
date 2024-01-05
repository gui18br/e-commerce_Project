import React, { useEffect, useState } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { Link } from "react-router-dom";
import { ProductsArea } from "../../CSS/style";
import "./style.css";
import { PropagateLoader } from "react-spinners";
import { css } from "@emotion/react";
import { getAllProducts } from "../../services/produto.service";
import coupleMovingSofaImage from "../../assets/homem-e-mulher-encantados-positivamente-brincando-com-seu-cachorro-favorito-posam-no-sofa.jpg";

export const Store = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(getItem("carrinhoYt") || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        console.log(products);
        setData(products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchData();
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  if (!data) {
    return (
      <PropagateLoader
        css={override}
        size={15}
        color={"crimson"}
        loading={true}
      />
    );
  }

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
      {/* <header>
        <h1>Store</h1>
        <Link to={"/cart"} className="linkSemDecoracao">
          <div className="carrinho">
            <FaShoppingCart color="crimson" />
          </div>
        </Link>
      </header> */}
      <div className="div-image">
        <img className="initial-image" src={coupleMovingSofaImage} alt="" />
      </div>
      <div className="carousel-itens">
        {data.map((e) => [
          <div className="card-item" key={e.id}>
            <Link className="link" to={`/${e.id}`}>
              <h4>{e.title}</h4>
              <img src={e.thumbnail} alt="" />
            </Link>
            <h4>R${e.price}</h4>
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
      </div>
    </div>
  );
};
