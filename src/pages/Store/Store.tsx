import { useEffect, useState } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { Link } from "react-router-dom";
import { getLimitProducts } from "../../services/produto.service";
import { Header } from "../../components/header";
import { Button } from "../../components/button";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import Pagination from "../../Paginations";
import "./style.css";

interface ItemData {
  id: string;
  title: string;
  thumbnail: string;
  original_price?: number;
  price: number;
  quantity: number;
}

const mulherCelular = require("../../assets/mulher-escolhendo-telefone-na-loja-de-tecnologia.jpg");
const mulherLivro = require("../../assets/jovem-mulher-a-sorrir-com-livro-perto-da-estante.jpg");
const casalMoveis = require("../../assets/jovem-mulher-se-mudando-para-uma-nova-casa.jpg");

const LIMIT = 12;

export const Store = () => {
  const { userEmail, tokenData } = useAuth();
  const { product } = useProduct();

  const [data, setData] = useState<ItemData[]>([]);
  const [cart, setCart] = useState<ItemData[]>(
    getItem("token") && getItem(userEmail)
      ? getItem(userEmail)
      : getItem("userNotLogged") || []
  );
  const [offset, setOffSet] = useState<number>(0);

  useEffect(() => {
    if (getItem("token") !== "" && getItem("userNotLogged")) {
      const combinedCart: ItemData[] = [
        ...getItem("userNotLogged"),
        ...getItem(userEmail),
      ];
      setCart(combinedCart);
    }
  }, [userEmail]);

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

  const handleClick = (obj: ItemData) => {
    const element: ItemData | undefined = cart.find((e) => e.id === obj.id);
    if (element) {
      const arrFilter = cart.filter((e) => e.id !== obj.id);
      setCart(arrFilter);
      setItem(getItem("token") ? userEmail : "userNotLogged", arrFilter);
    } else {
      const newItem: ItemData = { ...obj, quantity: 1 };
      setCart([...cart, newItem]);
      setItem(getItem("token") ? userEmail : "userNotLogged", [
        ...cart,
        newItem,
      ]);
    }
  };

  const calcQuantity = () => {
    let quantidade: number = 0;
    for (var i = 0; i < cart.length; i++) {
      quantidade += cart[i].quantity;
    }
    return quantidade;
  };

  return (
    <div className="box-store">
      <Header qtdItens={calcQuantity()} />
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
