import React, { useState,useEffect,useContext } from 'react'
import { UserContext } from '../../SharedComponent/Context/UserContext';
import Topbar from '../SharedComponents/PageLayoutComponents/Topbar';
import Footer from '../SharedComponents/PageLayoutComponents/Footer';
import AuthServices from '../../SharedComponent/Services/AuthServices';
import StyledDivider from '../../SharedComponent/PagesLayoutComponents/StyledDivider';
import ContactFormService from '../../SharedComponent/Services/ContactFormService';
import { useFormik } from 'formik';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./ContactForm.css";

export default function ContactForm() {

const {user,setUser } = useContext(UserContext);
const [errors,setErrors] = useState([]);
const [success, setSuccess] = useState([])
const [openBackdrop, setOpenBackdrop] = useState(false);

useEffect(() => {

  const authorizedFunction = () => {
       if(localStorage.getItem('token')){
           AuthServices.isAuthorized().then((response) => {
             if(response.data.status === 'pass'){
               const user = {
                 userId: response.data.user_Id,
                 role: response.data.role
               }
               setUser(user)
             }
           });
         }
    }

    authorizedFunction();
    // eslint-disable-next-line
    }, []);

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          message: '',
        },
        onSubmit: (values) => {
            setOpenBackdrop(true)
            ContactFormService.createMessage(values).then((response) => {          
                setSuccess('Wiadomość została wysłana')
                setOpenBackdrop(false);
                setErrors([])
                formik.resetForm()

            }).catch((error) => {
              setErrors(error.response.data)
              setOpenBackdrop(false);
              setSuccess()
            })
        },
      });

  return (
    <div className='contactForm__wrapper'>
        <Topbar user = {user} setUser = {setUser}/>
        <div style={{flex:1}}>
            <div className='main__form__wrapper'>
                <h2 className="form__title">Skontaktuj się z nami</h2>
                {success && <p style = {{display:'flex', justifyContent:'center', color:'green', fontSize:'18px'}}>{success}</p>}
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                        Imie
                    </label>
                    <input className="form-control" type="text" id="name" 
                    value={formik.values.name}
                    onChange={formik.handleChange}
                     />
                    {errors.name && <p style = {{color:'red',marginBottom:'0'}}>{errors.name}</p>}
                    </div>
                    <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input className="form-control" id="email" 
                    value={formik.values.email}
                    onChange={formik.handleChange}
                     />
                    {errors.email && <p style = {{color:'red',marginBottom:'0'}}>{errors.email}</p>}
                    </div>
                    <div className="mb-3">
                    <label className="form-label" htmlFor="message">
                        Wiadomość
                    </label>
                    <textarea className="form-control" id="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}                    
                    rows = {4}  />
                    {errors.message && <p style = {{color:'red',marginBottom:'0'}}>{errors.message}</p>}
                    </div>
                    <button className="btn btn-success" type="submit">
                    Prześlij
                    </button>
                </form>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
        <CircularProgress color="inherit" />
      </Backdrop>
        </div>
        <StyledDivider/>
        <Footer/>
    </div>
  )
}
 