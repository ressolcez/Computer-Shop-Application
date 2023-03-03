import React, { useState,useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import User from "../../../Images/user.png";
import Logo from "../../../Images/Logo.png";
import ShoppingCart from "../../../Images/shopping_cart.png";
import TopBarServices from "../../../SharedComponent/Services/TopBarServices";
import SearchBar from '../PageFunctionality/SearchBar';
import StyledLink from '../../../SharedComponent/PagesLayoutComponents/StyledLink';
import AuthServices from '../../../SharedComponent/Services/AuthServices';
import StyledDivider from '../../../SharedComponent/PagesLayoutComponents/StyledDivider';
import './Topbar.css';

function Topbar({user,setUser}) {

    const [allProducts, setAllProducts] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
   
    const open = Boolean(anchorEl);

    useEffect(() => {

        const getTopbarContent = async() =>{
         await TopBarServices.getProductsFiltered(searchWord).then((response) => {
            setAllProducts(response.data);
         })
        }

        getTopbarContent();

       }, [searchWord]);

       const logoutUser = () =>
       {
            AuthServices.logoutUser();
            localStorage.removeItem('token')
            setUser(null);
            window.location.reload(false)
       }

    return (
        <div className="topbar__wrapper" role="navigation">       
            <div className="topbar__leftBox">
                <StyledLink to={"/"}>
                    <img src={Logo} alt="Logo" className= "topbar__img"/>
                </StyledLink>
            </div>
            <div className="topbar__middleBox">
                <SearchBar products={allProducts} setSearchWord = {setSearchWord}/>
            </div>
           <div className="topbar__rightBox">
                <div className = "topbar__rightBox__account">
                    <img src={User} alt = "User"/>
                        {!user ? ( 
                            <StyledLink to = {"/Login"}>
                                <span className = "topbar__rightBox_spanItem">Zaloguj</span>
                             </StyledLink>
                                ) : (
                                <>
                                <span className = "topbar__rightBox_spanItem" onClick={handleClickMenu}>Twoje Konto</span>
                                <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleCloseMenu}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                                }}
                                >
                                    <StyledLink to={"/User/Profile"}>
                                        <Typography style = {{cursor:'pointer'}} sx = {{p: 1}}><ManageAccountsIcon/> Profil</Typography>
                                    </StyledLink>
                                    <StyledDivider/>
                                    <StyledLink to={"/RecentOrders"}>
                                        <Typography style = {{cursor:'pointer'}} sx = {{p: 1}}><TextSnippetIcon/> Twoje zamówienia</Typography>
                                    </StyledLink>
                                    <StyledDivider/>
                                    {
                                    user.role === 'Admin' && 
                                    <>
                                        <StyledLink to = "/Admin">
                                            <Typography style = {{cursor:'pointer'}} sx = {{p: 1}}><AdminPanelSettingsIcon/> Panel administratora</Typography>
                                        </StyledLink>
                                        <StyledDivider/>
                                    </>
                                    }
                                    <Typography style = {{cursor:'pointer'}} sx = {{p: 1}} onClick = {() => logoutUser()}><LogoutIcon/> Wyloguj</Typography>
                                </Popover> 
                                </>

                                )
                            }           
                </div>
                <StyledLink to={"/Cart"}>
                    <div className = "topbar__rightBox__cart"> 
                        <img src={ShoppingCart} alt = "ShoppingCart"/>    
                        <span className = "topbar__rightBox_spanItem">Twój Koszyk</span>
                    </div>
                </StyledLink>  
            </div>
        </div>
    )
  }
  
  export default Topbar