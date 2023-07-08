import axios from "axios";

export class ProductoService {

    baseUrl = "http://localhost:8080/api/productos/";

    async create(producto){
        const res = await axios.post(this.baseUrl + "producto/", producto);
        return res.data;
    }

    async readAll(){
        const res = await axios.get(this.baseUrl);
        return res.data;
    }

    async update(producto){
        const res = await axios.put(this.baseUrl + "producto/" + producto._id, producto);
        return res.data;
    }

    async delete(id){
        const res = await axios.delete(this.baseUrl + "producto/" + id);
        return res.data;
    }
}