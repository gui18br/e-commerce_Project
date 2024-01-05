import axios from "axios";
const url = "https://api.mercadolibre.com/sites/MLB/search?q=moveis";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
