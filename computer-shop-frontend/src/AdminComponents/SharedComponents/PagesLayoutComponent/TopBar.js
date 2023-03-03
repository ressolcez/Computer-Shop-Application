import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Leftbar from "./Leftbar";
import Prof from "../../../Images/prof.jpg"

function Topbar({user,setUser}) {
  const [isDrawerOpen,setIsDrawerOpen ] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <div style = {{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick = {() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <div style={{display:'flex', alignItems:'center',paddingRight:'30px'}}>
          <Avatar><img src = {Prof} alt='profileImage'/></Avatar>
          <span style={{paddingLeft:'10px'}}><b>Konrad Chrabąszcz</b></span>
        </div>

        </div>
      </AppBar>
    </Box>
    <Leftbar isDrawerOpen = {isDrawerOpen} setIsDrawerOpen = {setIsDrawerOpen} user = {user} setUser = {setUser}/>
  </>
  )
}

export default Topbar