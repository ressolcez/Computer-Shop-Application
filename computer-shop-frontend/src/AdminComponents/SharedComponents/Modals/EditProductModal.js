import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ProductServices from '../../../SharedComponent/Services/ProductServices';
import { useFormik } from 'formik';

function EditProductModal({openModal,handleCloseModal,product,success,setSuccess}) {

    const [errors,setErrors] = useState([]);
    const formik = useFormik({
      initialValues: {
        id: product.id,
        name: product.name,
        slider: product.slider,
        quantityAvailable: product.quantityAvailable,
        producent: product.producent,
        description: product.description,
        image: product.image,
        price: product.price,
        category: 1,
      },
      enableReinitialize: true,
      onSubmit: (values) => {
        ProductServices.editProduct(values.category,values.id,values).then((response) => {
            setErrors([])
            setSuccess('Poprawnie Edytowano przedmiot')
            formik.resetForm({values: ''})
        }).catch((error) => {
          setErrors(error.response.data)
      })
      },
    });
    return (    
        <>
        <Modal show={openModal} onHide={handleCloseModal}>
        <Form onSubmit={formik.handleSubmit}> 
          <Modal.Header closeButton>
            <Modal.Title>Edytowanie Produktu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {success && <p style = {{display:'flex', justifyContent:'center', color:'green', fontSize:'18px'}}>{success}</p>}
          <Form.Group className="mb-3" >
                <Form.Label>Identyfikator</Form.Label>
                <Form.Control
                  id = "id"
                  value={formik.values.id}
                  autoFocus
                  disabled
                />
                <Form.Label>Nazwa</Form.Label>
                <Form.Control
                  id = "name"
                  value={formik.values.name}
                  autoFocus
                  onChange={formik.handleChange}
                />
                {errors.name && <p style = {{color:'red',marginBottom:'0'}}>{errors.name}</p>}
                <Form.Label className='pt-3'>Slider</Form.Label>
                 <Form.Select
                  id = "slider"
                  value={formik.values.slider}
                  onChange={formik.handleChange}
                 >
                    <option value="true">true</option>
                    <option value="false">false</option>
                </Form.Select>
                {errors.slider && <p style = {{color:'red',marginBottom:'0'}}>{errors.slider}</p>}
                <Form.Label className='pt-3'>Ilość sztuk</Form.Label>
                <Form.Control
                  id = "quantityAvailable"
                  value={formik.values.quantityAvailable}
                  autoFocus
                  onChange={formik.handleChange}
                />
                {errors.quantityAvailable && <p style = {{color:'red',marginBottom:'0'}}>{errors.quantityAvailable}</p>}
                <Form.Label className='pt-3'>Producent</Form.Label>
                <Form.Control
                  id = "producent"
                  value={formik.values.producent}
                  autoFocus
                  onChange={formik.handleChange}
                />
                {errors.producent && <p style = {{color:'red',marginBottom:'0'}}>{errors.producent}</p>}
                 <Form.Label className='pt-3'>Opis</Form.Label>
                <Form.Control
                  id="description"
                  value={formik.values.description}
                  autoFocus
                  onChange={formik.handleChange}
                />
                {errors.description && <p style = {{color:'red',marginBottom:'0'}}>{errors.description}</p>}
                <Form.Label className='pt-3'>Zdjęcie</Form.Label>
                <Form.Control
                  id = "image"
                  value={formik.values.image}
                  autoFocus
                  onChange={formik.handleChange}
                />
                {errors.image && <p style = {{color:'red',marginBottom:'0'}}>{errors.image}</p>}
                <Form.Label className='pt-3'>Cena</Form.Label>
                <Form.Control
                  id = "price"
                  value={formik.values.price}
                  autoFocus
                  onChange={formik.handleChange}
                />
                  {errors.price && <p style = {{color:'red',marginBottom:'0'}}>{errors.price}</p>}
                 <Form.Label className='pt-3'>Kategoria</Form.Label>
                 <Form.Select
                  id="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                 >
                    <option value="1">komputery</option>
                    <option value="2">laptopy</option>
                    <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type = "submit">
              Edytuj Produkt
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
}

export default EditProductModal