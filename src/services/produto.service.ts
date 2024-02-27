import axios from "axios";

interface productProps {
  products: string;
  limit: number;
  offset: number;
}

export const getAllProducts = async (props: productProps) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${props.products}`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const getLimitProducts = async (props: productProps) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${props.products}&offset=${props.offset}&limit=${props.limit}`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
