import { Button } from '@mui/material';
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import StyledLink from '../../../SharedComponent/PagesLayoutComponents/StyledLink'

export default function CreateOrderSuccessModal({openModal,handleCloseModal}) {
  return (
    <Modal show={openModal} style = {{marginTop:'15%'}}>
          <Modal.Header>
                <Modal.Title style={{display:'flex', justifyContent:'center', width:'100%'}}><h3>Sukces!</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style= {{width:'100%', display:'flex', justifyContent:'center', fontSize:'19px'}}>Gratulacje! Udało Ci się zrealizować zamówienie!</p>
                <div  style= {{width:'100%', display:'flex', justifyContent:'center'}}>
                  <StyledLink to = {"/RecentOrders"}>
                  <Button variant = 'contained' color = 'success'>Przejdź do twoich zamówień</Button>
                  </StyledLink>
                </div>
            </Modal.Body>
        </Modal>
  )
}

