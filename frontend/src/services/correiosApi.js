import axios from "axios";

const api = axios.create({
  baseURL: "https://viacep.com.br/ws",
});

export default class CorreiosApi {
  async consultar(cep) {
    console.log(cep);
    var url = `/${cep}/json`;
    console.log(url);
    var resp = await api.get(`/${cep}/json`);
    console.log(resp);
    return resp;
  }
}
