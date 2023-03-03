import axios from 'axios'

class AdminDashboardServices{

    getNumberOfUsers(){
        return axios.get("http://localhost:8080/api/adminDashboard/numberOfUsers")
    }

    getActiveUsers(){
        return axios.get("http://localhost:8080/api/adminDashboard/activeUsers")
    }

    getNumberOfOrders(){
        return axios.get("http://localhost:8080/api/adminDashboard/numberOfOrders")
    }
    getNumberWaitingOrders(){
        return axios.get("http://localhost:8080/api/adminDashboard/waitingOrders")
    }
    getProfit(){
        return axios.get("http://localhost:8080/api/adminDashboard/profit")
    }

    getSalesByCategory(){
        return axios.get("http://localhost:8080/api/adminDashboard/salesByCategory")
    }
    
}

export default new AdminDashboardServices()