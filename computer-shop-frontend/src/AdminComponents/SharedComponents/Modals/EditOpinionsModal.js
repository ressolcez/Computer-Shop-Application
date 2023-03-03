import React,{useState} from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import OpinionsService from '../../../SharedComponent/Services/OpinionsService';

function EditOpinionsModal({openModal,handleCloseModal,opinion,success,setSuccess}) {

  const [errors,setErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: opinion.id,
      rate: opinion.rate,
      comment: opinion.comment,
    },
    enableReinitialize: true,
    onSubmit: (values) => {

      OpinionsService.editOpinions(values).then((response) => {
        setSuccess('Poprawnie zmieniono opinie');
        setErrors([])
    }).catch((error) => {
      setErrors(error.response.data)
    })
  },
});

  return (
    <div>
    <>
      <Modal show={openModal} onHide={handleCloseModal}>
      <Form onSubmit={formik.handleSubmit}> 
          <Modal.Header >
            <Modal.Title>Edytowanie opini numer {opinion.id}</Modal.Title>
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
                <Form.Label className='pt-3'>Ocena</Form.Label>
                <Form.Control
                  id = "rate"
                  value={formik.values.rate}
                  autoFocus
                  onChange={formik.handleChange}
                />
                 {errors.rate && <p style = {{color:'red',marginBottom:'0'}}>{errors.rate}</p>}                
                <Form.Label className='pt-3'>Komentarz</Form.Label>
                <Form.Control
                  id = "comment"
                  value={formik.values.comment}
                  autoFocus
                  onChange={formik.handleChange}
                />
                 {errors.comment && <p style = {{color:'red',marginBottom:'0'}}>{errors.comment}</p>}
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type = "submit">
              Edytuj Opinie
            </Button>
          </Modal.Footer>
          </Form>
      </Modal>
    </>
  </div>
  )
}

export default EditOpinionsModal