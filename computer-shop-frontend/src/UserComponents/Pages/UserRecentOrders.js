import React, {useEffect,useContext,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../SharedComponent/Context/UserContext';
import AuthServices from '../../SharedComponent/Services/AuthServices';
import Footer from '../SharedComponents/PageLayoutComponents/Footer';
import Topbar from '../SharedComponents/PageLayoutComponents/Topbar';
import UserRecentOrdersComponent from '../UserAccountComponent/UserRecentOrdersComponent';
import StyledDivider from '../../SharedComponent/PagesLayoutComponents/StyledDivider';
import OrderServices from '../../SharedComponent/Services/OrderServices';
import "./UserRecentOrders.css";

function UserRecentOrders() {

    const {user,setUser } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const getUserOders = (userId) => {           
      OrderServices.getUserOrders(userId).then((response) => {
        setOrders(response.data);
      });
    }

    useEffect(() => {

           if(localStorage.getItem('token')){
               AuthServices.isAuthorized().then((response) => {
                 if(response.data.status === 'pass'){
                   const user = {
                     userId: response.data.user_Id,
                     role: response.data.role
                   }
                   setUser(user)
                   getUserOders(user.userId)
                 }
               });
             }else{
              navigate("/");
             }

           // eslint-disable-next-line
    }, []);

  return (
    <main className='userRecentOrders__wrapper'>
        <Topbar user = {user} setUser = {setUser}/>
        {orders.length !== 0 ?
        (
        <>
          <div className='UserRecentOrders__wrapper'>
            <h3 className='userOrder__title'>Twoje zamówienia: </h3>
          </div>
          <div style= {{flex:1}}>
              <UserRecentOrdersComponent user = {user} orders = {orders}/>
          </div>
        </>
        ) :(
          <div style= {{flex:1}}>
            <div className='nocontent__wrapper'>
                  <p>Nie znaleziono zamówień</p>
            </div>
          </div>
        )
        }
        <StyledDivider/>
        <Footer/>
    </main>
  )
}

export default UserRecentOrders