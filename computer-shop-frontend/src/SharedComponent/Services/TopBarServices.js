import axios from 'axios'

const baseURL = "http://localhost:8080/api/products/filters/searchBarFilter/";

class TopBarServices{

    getProductsFiltered(searchWord){
        return axios.get(baseURL,{ params: 
            { searchWord: searchWord} 
        })
    }    
}

export default new TopBarServices()