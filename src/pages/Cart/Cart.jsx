import React, { useState, useEffect } from "react";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import { Header } from "../../components/header/index.js";
import cart from "../../assets/14182.jpg";
import { useHistory } from "react-router-dom";
import { searchCep } from "../../services/cep.service.js";
import "./style.css";
import { Button } from "../../components/button/index.js";

export const Cart = () => {
  const { tokenData, userEmail } = useAuth();
  const [data, setData] = useState(
    tokenData && getItem(userEmail)
      ? getItem(userEmail)
      : getItem("userNotLogged") || []
  );
  const [endereco, setEndereco] = useState();

  const history = useHistory();

  useEffect(() => {
    if (tokenData !== "" && getItem("userNotLogged")) {
      const combinedCart = [...getItem("userNotLogged"), ...getItem(userEmail)];
      setData(combinedCart);
    }
  }, [tokenData, userEmail]);

  let totalPrice = 0;
  data.forEach((obj) => {
    console.log((totalPrice += obj.price));
  });

  const removeItem = (obj) => {
    // Remover o item do estado
    const arraFilter = data.filter((e) => e.id !== obj.id);
    setData(arraFilter);

    // Atualizar o carrinho do usuário logado no localStorage
    if (tokenData) {
      setItem(userEmail, arraFilter);
    }

    // Atualizar o carrinho do usuário não logado no localStorage
    const notLoggedInCart = getItem("userNotLogged") || [];
    const notLoggedInFiltered = notLoggedInCart.filter((e) => e.id !== obj.id);
    setItem("userNotLogged", notLoggedInFiltered);
  };

  const handleClick = () => {
    history.push("/");
  };

  const handleSearchCEP = async () => {
    try {
      const cepDigitado = document.getElementById("cep").value;
      const resultado = await searchCep(cepDigitado);
      if (resultado.cidade !== "") {
        setEndereco(resultado);
      } else {
        alert("Informe um CEP correto!");
      }
    } catch (e) {
      console.error("Erro ao pesquisar CEP: ", e);
    }
  };
  return (
    <div className="container">
      <Header cartDisable={true} />
      {totalPrice > 0 ? (
        <div className="itens">
          {data.map((e) => (
            <div key={e.id} className="item">
              <Link to={`/${e.id}`} className="linkSemDecoracao">
                <img src={e.thumbnail} alt="" />
                <h4 className="title-item">{e.title.slice(0, 50) + "..."}</h4>
              </Link>
              <div className="price-button">
                <h4>
                  {e.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h4>
                <Button onClick={() => removeItem(e)}>
                  <BsFillCartDashFill />
                </Button>
              </div>
            </div>
          ))}
          <div className="bottom-cart">
            <div className="endereco">
              <div className="input-endereco">
                <h3>Entrega</h3>
                <label htmlFor="cep">CEP: </label>
                <input type="text" name="cep" id="cep" />
                <Button onClick={handleSearchCEP} smallButton={true}>
                  Pesquisar
                </Button>
              </div>
              <div className="dados-coluna">
                <div className="dados-endereco">
                  <p>Cidade: {endereco?.cidade || ""}</p>
                  <p>Bairro: {endereco?.bairro || ""}</p>
                  <p>Endereço: {endereco?.endereco || ""}</p>
                  <p>UF: {endereco?.uf || ""}</p>
                </div>
              </div>
            </div>
            <div className="total-pricing">
              <h1>
                Total:{" "}
                {totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h1>
              <p> - Frete: Grátis</p>
              <Button
                onClick={() => (tokenData ? null : history.push("/login"))}
              >
                Comprar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-itens">
          <h1>Carrinho Vazio :/</h1>
          <p>
            Adicione itens ao seu carrinho para poder prosseguir com a compra!
          </p>
          <img className="cart-image" src={cart} alt="" />
          <Button onClick={() => handleClick()}>Ir</Button>
        </div>
      )}
    </div>
  );
};
