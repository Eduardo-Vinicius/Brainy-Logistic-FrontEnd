import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000'
    
})

//baseURL: 'https://nsf-lista-negra-eduardo.herokuapp.com/'

export default class PurchaseApi {

    async cadastrar(ln) {
        const resp = await api.post('/compra', ln);
        console.log(resp);
        return resp;
    }

    async consultar() {
        const resp = await api.get('/compra');
       
        return resp.data;
    }
}