import axios from 'axios'


class UsersServices{


    changeUserPassword(userId,password){
        return axios.put("http://localhost:8080/api/user/updatePassword/" + userId,password);
    }

    deleteUser(userId){
        return axios.delete("http://localhost:8080/api/user/" + userId)
    }

    getAllUsers(page,searchWord){
        return axios.get('http://localhost:8080/api/user/Pageable',{ 
            params: {
                pageNumber: page,
                searchWord: searchWord
            } 
            })
    }

    addUser(user,roleId){
        return axios.post('http://localhost:8080/api/user/' + roleId,user)
    }

    updateUser(user,roleId,userId){
        return axios.put("http://localhost:8080/api/user/"+roleId + "/" + userId,user)
    }

    getUserById(userId){
        return axios.get("http://localhost:8080/api/user/"+userId);
    }

    changeUserDataByUser(userId,user){
        return axios.put("http://localhost:8080/api/user/"+userId,user,{})
    }
}

export default new UsersServices()