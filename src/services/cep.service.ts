import axios from "axios";

export const searchCep = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return {
      cidade: response.data.localidade,
      bairro: response.data.bairro,
      endereco: response.data.logradouro + " " + response.data.complemento,
      uf: response.data.uf,
    };
  } catch (error) {
    throw error;
  }
};
