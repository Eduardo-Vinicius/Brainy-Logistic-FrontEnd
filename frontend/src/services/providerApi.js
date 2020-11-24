import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

//baseURL: 'https://nsf-lista-negra-eduardo.herokuapp.com/'

export default class providerApi {
  async cadastrar(ln) {
    const resp = await api.post("/fornecedor", ln);
    console.log(resp);
    return resp;
  }

  async consultar() {
    const resp = await api.get("/fornecedor");
    return resp.data;
  }

  async deletar(id) {
    const resp = await api.delete(`/fornecedor/${id}`);

    return resp.data;
  }

  async alterar(id, f) {
    const resp = await api.put(`/fornecedor/${id}`, f);

    return resp.data;
  }
}
