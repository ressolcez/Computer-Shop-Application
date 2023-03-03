import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const SnackbarFail = ({openSnackbarFail, handleCloseSnackbarFail,message}) => {

    return (
        <Snackbar open={openSnackbarFail} autoHideDuration={3000} onClose={handleCloseSnackbarFail}>
        <Alert onClose={handleCloseSnackbarFail} severity="error" sx={{ width: '100%' }}>
         {message.comment && <p style = {{marginBottom:'0'}}>{message.comment}</p>}
         {message.rate && <p style = {{marginBottom:'0'}}>{message.rate}</p>}
        </Alert>
      </Snackbar>
    );
  
}

export default SnackbarFail