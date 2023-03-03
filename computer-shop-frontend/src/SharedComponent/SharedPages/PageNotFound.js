import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate();
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  >
    <Typography variant="h1">
      404
    </Typography>
    <Typography variant="h6" >
      Wybrana strona nie istnieje.
    </Typography>
    <Button sx = {{marginTop:'20px'}}variant="contained" color = "error" onClick = {()=> navigate("/")}>Wróć do strony głównej</Button>
  </Box>
  )
}

export default PageNotFound