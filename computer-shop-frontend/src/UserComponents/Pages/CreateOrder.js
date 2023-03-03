import React, { useState,useEffect,useContext } from 'react'
import { UserContext } from '../../SharedComponent/Context/UserContext';
import Topbar from '../SharedComponents/PageLayoutComponents/Topbar';
import Footer from '../SharedComponents/PageLayoutComponents/Footer';
import CreateOrderComponent from "../CreateOrderComponent/CreateOrderComponent";
import AuthServices from '../../SharedComponent/Services/AuthServices';
import StyledDivider from '../../SharedComponent/PagesLayoutComponents/StyledDivider';
import UsersServices from '../../SharedComponent/Services/UsersServices';
import "./CreateOrder.css"


export default function CreateOrder() {

const {user,setUser } = useContext(UserContext);
const [userData,setUserData] = useState()

useEffect(() => {

  const authorizedFunction = () => {
       if(localStorage.getItem('token')){
           AuthServices.isAuthorized().then((response) => {
             if(response.data.status === 'pass'){
               const user = {
                 userId: response.data.user_Id,
                 role: response.data.role
               }
               UsersServices.getUserById(response.data.user_Id).then ((response) =>{
                setUserData(response.data);
              })
               setUser(user)
             }
           });
         }
      }

      authorizedFunction();
    // eslint-disable-next-line
    }, []);

  return (
    <div className='createOrder__wrapper'>
        <Topbar user = {user} setUser = {setUser}/>
        <div style= {{flex:1}}>
           {userData && <CreateOrderComponent userdata = {userData} user = {user}/>}
        </div>
        <StyledDivider/>
        <Footer/>
    </div>
  )
}
 