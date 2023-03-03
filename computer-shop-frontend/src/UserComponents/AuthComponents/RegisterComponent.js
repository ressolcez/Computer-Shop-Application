import React, { useState } from 'react';
import './RegisterComponent.css'
import Button from '@mui/material/Button';
import Logo from "../../Images/Logo.png"
import AuthServices from "../../SharedComponent/Services/AuthServices";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import validationSchema from '../../SharedComponent/Validations/newUserValidations';
import {useNavigate} from "react-router-dom";

function RegisterComponent() {

  const[errors,setErrors] = useState('');
  const[success,setSuccess] = useState('');

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmpassword: '',
      name: '',
      surname: '',
      login: '',
      address: '',
      housenumber: '',
      postalCode: ''
    },
    validationSchema:validationSchema,
    onSubmit: (values) => {
      
          AuthServices.registerUser(values).then((response) => { 

            formik.resetForm({values: ''})  
            setErrors('')
            setSuccess('Poprawnie Stworzono użytkownika, możesz przejsć do logowania')      

            setTimeout(() => {
              navigate("/login")
            }, 2000);

          }).catch((error) => { 

            setErrors(error.response.data)
            console.log(error.response)
            setSuccess('');
          })

    },
  });


  return (
   <div className='register__wrapper'>
      <div className='register__conent'>
          <div className='register__image'>
            <img src = {Logo} alt = 'logo'/>
          </div>

          {errors.email && <p style={{marginBottom:'0'}} className='error__register'>{errors.email}</p>}
          {errors.login && <p style={{marginBottom:'0'}} className='error__register'>{errors.login}</p>}
          {errors.name && <p style={{marginBottom:'0'}} className='error__register'>{errors.name}</p>}
          {errors.surname && <p style={{marginBottom:'0'}} className='error__register'>{errors.surname}</p>}
          {errors.address && <p style={{marginBottom:'0'}} className='error__register'>{errors.address}</p>}
          {errors.password && <p style={{marginBottom:'0'}} className='error__register'>{errors.password}</p>}
          {errors.housenumber && <p style={{marginBottom:'0'}} className='error__register'>{errors.housenumber}</p>}
          {errors.postalCode && <p style={{marginBottom:'0'}} className='error__register'>{errors.postalCode}</p>}

          {success && <p className='correct__register'>{success}</p>}
          <div className='register__input'>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id = "name"
              name = "name"
              label="Imie*"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              style = {{width:'48%',marginTop:'25px'}}
            />
              <TextField
              id = "surname"
              label="Nazwisko*"
              onChange={formik.handleChange}
              value={formik.values.surname}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
              style = {{width:'48%',marginTop:'25px',marginLeft:'4%'}}
            />
            <TextField
              id="email"
              label="Email*"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              style = {{width:'100%',marginTop:'25px'}}
            />
              <TextField
              id = "login"
              label="Login*"
              value={formik.values.login}
              onChange={formik.handleChange}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
              style = {{width:'100%',marginTop:'25px'}}
            />
              <TextField
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type = 'password'
              label="Hasło*"
              style = {{width:'100%',marginTop:'25px'}}
            />
              <TextField
              id = "confirmpassword"
              onChange={formik.handleChange}
              value={formik.values.confirmpassword}
              error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
              helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
              type = "password"
              label="Potwierdź hasło*"
              style = {{width:'100%',marginTop:'25px'}}
            />
              <TextField
              id = "address"
              label="Adres Zamieszkania"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              style = {{width:'100%',marginTop:'25px'}}
            />
             <TextField
              id="housenumber"
              onChange={formik.handleChange}
              value={formik.values.housenumber}
              error={formik.touched.housenumber && Boolean(formik.errors.housenumber)}
              helperText={formik.touched.housenumber && formik.errors.housenumber}
              label="Numer domu"
              style = {{width:'48%',marginTop:'25px'}}
            />
            <TextField
              id ="postalCode"
              onChange={formik.handleChange}
              value={formik.values.postalCode}
              error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
              helperText={formik.touched.postalCode && formik.errors.postalCode}
              label="Kod pocztowy"
              style = {{width:'48%',marginTop:'25px',marginLeft:'4%'}}
            />
            <div className='register__btn__cont'>
              <Button variant = 'contained' color = 'success' style= {{width:'60%',height:'45px'}} type="submit">
                Zarejestruj
              </Button>
            </div>
            </form>
          </div>
      </div>
   </div>
  );
}

export default RegisterComponent;