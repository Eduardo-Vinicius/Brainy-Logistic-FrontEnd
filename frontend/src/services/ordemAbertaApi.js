import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

//baseURL: 'https://nsf-lista-negra-eduardo.herokuapp.com/'

export default class ordemAbertaApi {
  

  async consultar() {
    const resp = await api.get("/ordemaberta");
    return resp.data;
  }

}
