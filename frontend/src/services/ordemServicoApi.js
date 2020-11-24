import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

//baseURL: 'https://nsf-lista-negra-eduardo.herokuapp.com/'

export default class ordemServicoApi {
  async cadastrar(ln) {
    const resp = await api.post("/tbordemservico", ln);
    console.log(resp);
    return resp;
  }

  async consultar() {
    const resp = await api.get("/tbordemservico");
    return resp.data;
  }

    async deletar(id) {
        console.log(id)
        const resp = await api.delete(`/tbordemservico/${id}`)
        
        return resp.data;
    }

    async alterar(id, tbordemservico) {
        const resp = await api.put(`/tbordemservico/${id}`, tbordemservico)

        return resp.data;
    }
}
