import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000'
    
})

//baseURL: 'https://nsf-lista-negra-eduardo.herokuapp.com/'

export default class VendaApi {

    async cadastrar(ln) {
        const resp = await api.post('/venda', ln);
        console.log(resp);
        return resp;
    }

    async consultar() {
        const resp = await api.get('/venda');
       
        return resp.data;
    }

    async deletar(id) {
        const resp = await api.delete(`/venda/${id}`)

        return resp.data;

    }

    async alterar(id, venda) {
        const resp = await api.put(`/venda/${id}`, venda)

        return resp.data;
    }
}