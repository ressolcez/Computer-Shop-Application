import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ProductServices from '../../../SharedComponent/Services/ProductServices';
import { useFormik } from 'formik';

function AddProductModal({openModal,handleCloseModal,success,setSuccess}) {

  const [errors,setErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      slider: true,
      quantityAvailable: 0,
      producent: '',
      description: '',
      image: '',
      price: 1000,
      category: 1,
    },
    onSubmit: (values) => {
      ProductServices.addProduct(values.category,values).then((response) => {
          setSuccess('Poprawnie dodano przedmiot')
          formik.resetForm()
          setErrors([])
      }).catch((error) => {
        console.log(error)
        setErrors(error.response.data)

    })
    },

  });

    return (
        <>
        <Modal show={openModal} onHide={ handleCloseModal}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Dodawanie Produktu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group className="mb-3" >
                {success && <p style = {{display:'flex', justifyContent:'center', color:'green', fontSize:'18px'}}>{success}</p>}
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
                <Form.Label className='pt-3'>Producent</Form.Label>
                <Form.Control
                  id = "producent"
                  value={formik.values.producent}
                  autoFocus
                  onChange={formik.handleChange}
                />
                {errors.producent && <p style = {{color:'red',marginBottom:'0'}}>{errors.producent}</p>}
                <Form.Label className='pt-3'>Ilość sztuk</Form.Label>
                <Form.Control
                  id = "quantityAvailable"
                  value={formik.values.quantityAvailable}
                  autoFocus
                  onChange={formik.handleChange}
                />
                {errors.quantityAvailable && <p style = {{color:'red',marginBottom:'0'}}>{errors.quantityAvailable}</p>}
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
                    <option value="1">Komputer</option>
                    <option value="2">Myszka</option>
                    <option value="3">Klawiatura</option>
                    <option value="4">Laptop</option>
                    <option value="5">Monitor</option>
                </Form.Select>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Dodaj Produkt
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
}

export default AddProductModal