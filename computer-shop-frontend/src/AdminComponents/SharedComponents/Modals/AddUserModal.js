import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import UserServices from '../../../SharedComponent/Services/UsersServices';


function AddUserModal({openModal,handleCloseModal, success, setSuccess}) {

  const [errors,setErrors] = useState([]);

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        name: '',
        surname: '',
        login: '',
        address: '',
        houseNumber: '',
        postalCode: '',
        role: 1
      },
      onSubmit: (values) => {
                 
        UserServices.addUser(values,values.role).then((response) => {
          
          setSuccess('Poprawnie dodano użytkownika')
          formik.resetForm()
          setErrors([])

      }).catch((error) => {

        setErrors(error.response.data)
        setSuccess()
    
      })
      },
    });

    return (
        <>
        <Modal show={openModal} onHide={handleCloseModal}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Dodawanie Użytkownika</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group className="mb-3" >
                {success && <p style = {{display:'flex', justifyContent:'center', color:'green', fontSize:'18px'}}>{success}</p>}
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  id = 'email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                 {errors.email && <p style = {{color:'red',marginBottom:'0'}}>{errors.email}</p>}
                <Form.Label className='pt-3'>Hasło</Form.Label>
                <Form.Control
                  id = 'password'
                  type = 'password'
                  autoFocus
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {errors.password && <p style = {{color:'red',marginBottom:'0'}}>{errors.password}</p>}
                <Form.Label className='pt-3'>Imie</Form.Label>
                <Form.Control
                  id = 'name'
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                  {errors.name && <p style = {{color:'red',marginBottom:'0'}}>{errors.name}</p>}
                 <Form.Label className='pt-3'>Nazwisko</Form.Label>
                <Form.Control
                  id = 'surname'
                  autoFocus
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                />
                 {errors.surname && <p style = {{color:'red',marginBottom:'0'}}>{errors.surname}</p>}
                <Form.Label className='pt-3'>Login</Form.Label>
                <Form.Control
                  id = 'login'
                  autoFocus
                  value={formik.values.login}
                  onChange={formik.handleChange}
                />
                {errors.login && <p style = {{color:'red',marginBottom:'0'}}>{errors.login}</p>}
                <Form.Label className='pt-3'>Adres</Form.Label>
                <Form.Control
                  id = 'address'
                  autoFocus
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                {errors.address && <p style = {{color:'red',marginBottom:'0'}}>{errors.address}</p>}
                 <Form.Label className='pt-3'>Numer Domu</Form.Label>
                 <Form.Control
                  id = 'houseNumber'
                  autoFocus
                  value={formik.values.houseNumber}
                  onChange={formik.handleChange}
                />
                {errors.houseNumber && <p style = {{color:'red',marginBottom:'0'}}>{errors.houseNumber}</p>}
                <Form.Label className='pt-3'>Kod pocztowy</Form.Label>
                 <Form.Control
                  id = 'postalCode'
                  autoFocus
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                />
                {errors.postalCode && <p style = {{color:'red',marginBottom:'0'}}>{errors.postalCode}</p>}
                <Form.Label className='pt-3'>Rola</Form.Label>
                <Form.Select
                  id = 'role'
                  value={formik.values.role}
                  onChange={formik.handleChange}
                 >
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                </Form.Select>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Dodaj Użytkownika
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    )

}

export default AddUserModal