import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000'
    
})

//baseURL: 'https://nsf-lista-negra-eduardo.herokuapp.com/'

export default class EstoqueApi {

    async consultar() {
        const resp = await api.get('/estoque');
        return resp.data;
    }

    
    async cadastrar(ln) {
        const resp = await api.post('/estoque', ln);
        console.log(resp);
        return resp;
    }

}