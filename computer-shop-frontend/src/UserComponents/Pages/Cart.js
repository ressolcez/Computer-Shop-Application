import React, {useEffect,useContext } from 'react';
import { UserContext } from '../../SharedComponent/Context/UserContext';
import CartOrderComponent from '../CartComponents/CartOrderComponent';
import Footer from '../SharedComponents/PageLayoutComponents/Footer';
import Topbar from '../SharedComponents/PageLayoutComponents/Topbar';
import StyledDivider from '../../SharedComponent/PagesLayoutComponents/StyledDivider';
import AuthServices from '../../SharedComponent/Services/AuthServices';
import "./Cart.css"

function Cart() {
  const {user, setUser} = useContext(UserContext);
  

  useEffect(() => {

    const authorizedFunction = () => {  
       if(localStorage.getItem('token')){
           AuthServices.isAuthorized().then((response) => {
             if(response.data.status === 'pass'){
               const user = {
                 userId: response.data.user_Id,
                 role: response.data.role
               }
               setUser(user)
             }
           });
         }  
      }

      authorizedFunction();
      // eslint-disable-next-line
    }, []);

  return (
        <div className='Cart__wrapper'>
          <Topbar user = {user} setUser = {setUser}/>
        <div style= {{flex:1}}>
          <CartOrderComponent user = {user}/>
        </div>
        <StyledDivider/>
          <Footer/>
        </div>
  )
}

export default Cart