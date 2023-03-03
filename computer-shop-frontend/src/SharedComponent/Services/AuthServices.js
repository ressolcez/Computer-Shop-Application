import axios from 'axios'

const baseURL = "http://localhost:8080/api/user";

class AuthServices{
    
    checkEmailExist(email){
      return axios.get("http://localhost:8080/api/user/validation/" + email);
    }

    checkLoginExist(login){
      return axios.get("http://localhost:8080/api/user/validation/login/" + login);
    }

    deleteUserToken(userId){
      return axios.post("http://localhost:8080/api/authentication/deleteToken/"+userId)
    }

    registerUser(user)
    {
      console.log(user)
        return axios.post(baseURL+"/2", user)
    }

    isAuthorized(){
      return axios.get('http://localhost:8080/api/authentication', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
       })
    }

    loginUser(credential){
      return axios.post("http://localhost:8080/api/authentication",credential);
    }

    logoutUser(){
      let token = localStorage.getItem('token');
      return axios.post('http://localhost:8080/api/authentication/logout',token, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
    }
}

export default new AuthServices()