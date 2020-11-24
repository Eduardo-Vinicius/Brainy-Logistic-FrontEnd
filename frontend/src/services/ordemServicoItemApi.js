import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

//baseURL: 'https://nsf-lista-negra-eduardo.herokuapp.com/'

export default class ordemServicoItemApi {
  async cadastrar(ln) {
    const resp = await api.post("/tbordemservicoitem", ln);
    console.log(resp);
    return resp;
  }

  async consultar() {
    const resp = await api.get("/tbordemservicoitem");
    return resp.data;
  }

  async deletar(id) {
    const resp = await api.delete(`/tbordemservicoitem/${id}`);

    return resp.data;
  }

  async alterar(id, tbordemservico) {
    const resp = await api.put(`/tbordemservicoitem/${id}`, tbordemservico);

    return resp.data;
  }
}
