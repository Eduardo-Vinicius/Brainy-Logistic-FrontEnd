import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

//baseURL: 'https://nsf-lista-negra-eduardo.herokuapp.com/'

export default class ClienteApi {
  async cadastrar(ln) {
    const resp = await api.post("/cliente", ln);
    console.log(resp);
    return resp;
  }

  async consultar() {
    const resp = await api.get("/cliente");
    return resp.data;

  }

  async alterar(id, cliente) {
    const resp = await api.put(`/cliente/${id}`, cliente);

    return resp.data;
  }
  
  async deletar(id) {
    const resp = await api.delete(`/cliente/${id}`);

    return resp.data;
  }

}
