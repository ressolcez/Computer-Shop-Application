import axios from 'axios'

const baseURLOrders = "http://localhost:8080/api/orders/";

class OrderServices{
    getAllOrdersWithDifference(page,searchWord){
        return axios.get("http://localhost:8080/api/orders/ordersWithDifference",
        { 
            params: {
                pageNumber: page,
                searchWord: searchWord
            } 
        }
        )
    }

    checkoutCart(items){
        return axios.post("http://localhost:8080/api/orderProduct/checkoutCart",items);
    }

    creteOrderMail(userId,orderId){
        return axios.get("http://localhost:8080/api/orders/createOrderMail/"+userId + "/" + orderId);
    }

    getCartInfo(items){
        console.log(items)
        return axios.post("http://localhost:8080/api/orderProduct/checkoutCart",items);
    }

    deleteOrder(orderId){
        return axios.delete("http://localhost:8080/api/orders/" + orderId);
    }

    addOrder(userId,order,totalPrice,items){
        const newOrder = {totalPrice: totalPrice, address: order.address, houseNumber: order.houseNumber, postalCode: order.postalCode,cartDTOList: items}
        return axios.post(baseURLOrders+userId,newOrder)
    } 

    getUserOrders(userId){
        return axios.get(baseURLOrders + "userOrder/" + userId)
    }

    getOrderById(orderId){
        return axios.get("http://localhost:8080/api/orders/" + orderId);
    }

    changeOrderStatus(orderId,orderStatus,comment){     
        console.log(orderStatus)   
        return axios.put('http://localhost:8080/api/orders/' + orderId,{},
        { params: 
            { 
                orderStatus: orderStatus,
                comment: comment
            } 
        })
        
    }

    
  
}

export default new OrderServices()