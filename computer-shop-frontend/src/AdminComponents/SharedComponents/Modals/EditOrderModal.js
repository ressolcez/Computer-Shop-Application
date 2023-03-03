import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import OrdersServices from "../../../SharedComponent/Services/OrderServices";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function EditOrderModal({openModal,handleCloseModal,order,success,setSuccess,orderStatus,setOrderStatus,errors,setErrors}) {

    const [comment, setComment] = useState(null);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    console.log(comment)
    const changeStatus = () => {
        setOpenBackdrop(true)
        OrdersServices.changeOrderStatus(order.id,orderStatus,comment).then((response) => {
          setSuccess('Poprawnie zmieniono status');
          setOpenBackdrop(false);
          setComment(null)
          setErrors('')

        }).catch((error) => {
          setSuccess([])
          setOpenBackdrop(false)
          setComment(null)
          setErrors(error.response.data);
        })
    }

  return (
    <div>
      <>
        <Modal show={openModal} onHide={handleCloseModal}>
            <Modal.Header >
                <Modal.Title>Edytowanie Zamówienia numer {order.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {console.log(orderStatus)}
            {success && <p style = {{display:'flex', justifyContent:'center', color:'green', fontSize:'18px'}}>{success}</p>}
            <Form.Label className='pt-3' style = {{display:'flex', justifyContent:'center',fontSize:'20px'}}>Aktualny status zamówienia</Form.Label>
                 <Container>
                    <p style = {{display:'flex', justifyContent:'center'}}>{order.status}</p>
                </Container> 
            <Form.Label className='pt-3'>Wybierz status zamówienia:</Form.Label>
                 <Form.Select onChange={e => {
                  setOrderStatus(e.target.value);
                  }}>
                    <option value="W trakcie realizacji">W trakcie realizacji</option>
                    <option value="Zrealizowano">Zrealizowano</option>
                    <option value="Anulowano">Anulowano</option>
                </Form.Select>
              {errors.status && <p style = {{color:'red'}}>{errors.status}</p>}
               {orderStatus === 'Anulowano' &&
               <>
                  <Form.Label className='pt-3'>Komentarz:</Form.Label>
                  <Form.Control
                    id = "name"
                    as="textarea" 
                    rows="4"
                    autoFocus
                    onChange={(e) => setComment(e.target.value)}
                  />
               </>
               }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type = "submit" onClick = {()=>changeStatus()}>
                Zmień status
                </Button>
            </Modal.Footer>
        </Modal>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </>
    </div>
  )
}

export default EditOrderModal