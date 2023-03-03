import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const SnackbarSuccess = ({openSnackbarSuccess, handleCloseSnackbarSuccess,message}) => {
    return (
        <Snackbar open={openSnackbarSuccess} autoHideDuration={3000} onClose={handleCloseSnackbarSuccess}>
        <Alert onClose={handleCloseSnackbarSuccess} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
  
}

export default SnackbarSuccess