import axios from 'axios'

class ContactFormService{
    
    createMessage(message){
        return axios.post("http://localhost:8080/api/contactForm",message)
    }

}

export default new ContactFormService()