import axios from "axios";

export const getAllProducts = async (products) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const getLimitProducts = async (limit, offset, products) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${products}&offset=${offset}&limit=${limit}`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
