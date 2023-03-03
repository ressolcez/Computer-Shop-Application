import React,{useState} from 'react';
import {useFormik} from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UsersServices from '../../SharedComponent/Services/UsersServices';
import SnackbarSuccess from '../SharedComponents/Snackbars/SnackbarSuccess';
import validationSchema from '../../SharedComponent/Validations/UserProfileValidations';
import ProfileChoiceModal from "./ProfileChoiceModal";
import ProfileImage from "../../Images/profileImage.png"
import "./ProfileComponent.css"

function ProfileComponent({userdata}) {

  const [errors,setErrors] = useState([])
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openModalChoice, setOpenModalChoice] = useState(false); 
  const handleCloseModalChoice = () => {setOpenModalChoice(false)};
  const handleCloseSnackbarSuccess = () => {setOpenSnackbarSuccess(false)};

  const formik = useFormik({
    initialValues: {
      name: userdata.name,
      surname: userdata.surname,
      address: userdata.address,
      houseNumber: userdata.houseNumber,
      postalCode: userdata.postalCode,
    },
    onSubmit: (values) => {

      UsersServices.changeUserDataByUser(userdata.id,values).then(() => {
        setOpenSnackbarSuccess(true);
        setErrors([])
        }).catch((error) => {
          setErrors(error.response.data)
      })
    },

  });

  const formikPassword = useFormik({
    initialValues: {
      password : '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      UsersServices.changeUserPassword(userdata.id,values).then((response) => {
          setOpenSnackbarSuccess(true);
          formikPassword.resetForm({values: ''})  
        })
    },
  });

  return (
    <div className = "div rounded bg-white">
    <div className="row">
        <div className="col-md-5 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" width="150px" src={ProfileImage} alt = "profileImage"/>
              <span className="font-weight-bold">{userdata.login}</span>
              <span className="text-black-50">{userdata.email}</span>
              <Button onClick = {()=> setOpenModalChoice(true)}className='mt-2' variant="danger">Usuń Konto</Button>
            </div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Podstawowe dane: </h4>
                </div>
                <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="row mt-2">

                    <div className="col-md-6"><Form.Label>Imie</Form.Label>
                    <Form.Control
                      id= 'name' 
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {errors.name && <p style = {{marginBottom:'0',color:'red'}}>{errors.name}</p>}
                    </div>
                    <div className="col-md-6"><Form.Label>Nazwisko</Form.Label>
                    <Form.Control 
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    id='surname'
                    />
                    {errors.surname && <p style = {{marginBottom:'0',color:'red'}}>{errors.surname}</p>}
                    </div>

                    <div className="col-md-12"><Form.Label className="mt-3">Adres</Form.Label>
                    <Form.Control id = 'address' onChange={formik.handleChange} value={formik.values.address}/>
                    {errors.address && <p style = {{marginBottom:'0',color:'red'}}>{errors.address}</p>}
                    </div>

                    <div className="col-md-6"><Form.Label className="mt-3">Numer domu</Form.Label>
                    <Form.Control id = 'houseNumber' onChange={formik.handleChange} value={formik.values.houseNumber}/>
                    {errors.houseNumber && <p style = {{marginBottom:'0',color:'red'}}>{errors.houseNumber}</p>}
                    </ div>

                    <div className="col-md-6"><Form.Label className="mt-3">Kod pocztowy</Form.Label>
                    <Form.Control id = 'postalCode' onChange={formik.handleChange} value={formik.values.postalCode}/>
                    {errors.postalCode && <p style = {{marginBottom:'0',color:'red'}}>{errors.postalCode}</p>}
                    </div>

                    <div className="mt-3">
                      <Button className="profile__button__cont float-end" type="submit" variant="success">Zapisz dane</ Button>
                    </div>

                </Form.Group>
                </Form >
                <Form onSubmit={formikPassword.handleSubmit}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Dane logowania: </h4>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                      <Form.Label className="mt-3">Nowe Hasło</Form.Label>
                      <Form.Control 
                      id = 'password'
                      onChange={formikPassword.handleChange} 
                      value={formikPassword.values.password}
                      type = "password"/>
                     {console.log(formikPassword.errors.password)} 
                     {formikPassword.errors.password && <p style = {{marginBottom:'0',color:'red'}}>{formikPassword.errors.password }</p>}
                    </div>
                    
                    <div className="col-md-12">
                      <Form.Label className="mt-3">Powtórz hasło</Form.Label>
                      <Form.Control 
                      id = 'confirmPassword'
                      onChange={formikPassword.handleChange} 
                      value={formikPassword.values.confirmPassword}
                      type = "password"/>
                      {formikPassword.errors.confirmPassword && <p style = {{marginBottom:'0',color:'red'}}>{formikPassword.errors.confirmPassword}</p>}
                    </div>
                </div>

                <div className="profile__button__cont mt-3 text-center">
                <Button className="float-end" type="submit" variant="success">Zapisz dane</ Button>
                </div>
                </Form>
            </div>
        </div>
    </div>
    <SnackbarSuccess openSnackbarSuccess = {openSnackbarSuccess} handleCloseSnackbarSuccess = {handleCloseSnackbarSuccess} message = "Zmieniono dane kontaktowe"/>
    <ProfileChoiceModal openModal = {openModalChoice} handleCloseModal = {handleCloseModalChoice} user = {userdata}/>
  </div>
)
}

export default ProfileComponent