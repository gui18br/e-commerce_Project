import axios from "axios";

export const getAllProducts = async () => {
  const url = "https://api.mercadolibre.com/sites/MLB/search?q=moveis";
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const getLimitProducts = async (limit, offset) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=moveis&offset=${offset}&limit=${limit}`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
