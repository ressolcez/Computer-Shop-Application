import axios from 'axios'


class OrdersServices{

    getAllOrders(page){
        return axios.get("http://localhost:8080/api/orders/Pageable",
        { 
            params: {pageNumber: page} 
        }
        )
    }

}

export default new OrdersServices()