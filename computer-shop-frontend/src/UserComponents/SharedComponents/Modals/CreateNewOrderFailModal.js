import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./CreateNewOrderFailModal.css"

function CreateNewOrderFailModal({msg,openModal,handleCloseModal}) {
  
  return (
    <div>
        <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box className='modal__wrapper'>
            <Typography variant="h6" component="h2" style = {{display:'flex', justifyContent:'center'}}>
                Błąd podczas zamówienia
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}  style = {{display:'flex', justifyContent:'center'}}>
                {msg}
            </Typography>
        </Box>
        </Modal>
  </div>
  )
}

export default CreateNewOrderFailModal