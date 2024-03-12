import { useProduct } from "../../context/ProductContext";
import { Header } from "../../components/header";
import StoreItens from "../../components/storeItens/StoreItens";
import "./style.css";

const mulherCelular = require("../../assets/mulher-escolhendo-telefone-na-loja-de-tecnologia.jpg");
const mulherLivro = require("../../assets/jovem-mulher-a-sorrir-com-livro-perto-da-estante.jpg");
const casalMoveis = require("../../assets/jovem-mulher-se-mudando-para-uma-nova-casa.jpg");

export const Store = () => {
  const { product } = useProduct();

  return (
    <div className="box-store">
      <Header />
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
      <div>
        <StoreItens />
      </div>
    </div>
  );
};
