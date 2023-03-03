import React, { useState,useEffect,useContext } from 'react';
import {UserContext} from '../../SharedComponent/Context/UserContext';
import {useNavigate} from "react-router-dom";
import Topbar from '../SharedComponents/PagesLayoutComponent/TopBar';
import OrderServices from '../../SharedComponent/Services/OrderServices';
import Orders from '../OrdersComponent/Orders';
import AuthServices from '../../SharedComponent/Services/AuthServices';
import WaitPage from '../../SharedComponent/SharedPages/WaitPage';


function AdminOrders() {

  const {user,setUser } = useContext(UserContext);
  const [orders,setOrders] = useState([]);
  const navigate = useNavigate();
    
  const [openModalEditOrder, setOpenModalEditOrder] = useState(false);
  const [page, setPage] = useState(0);
  const [rowCount,setrowCount] = useState(0);
  const [searchWord,setSearchWord] = useState('');
  const [loading, setLoading] = useState(true);

  const deleteOrder = (orderId) =>{
    OrderServices.deleteOrder(orderId)
    window.location.reload(false)
  }

  const onFilterChange = React.useCallback((filterModel) => {
    setSearchWord(filterModel.quickFilterValues.toString());
  }, []);

  useEffect(() => {  

    const getPageContent = async () => {

      const allOrders = await OrderServices.getAllOrdersWithDifference(page,searchWord);
    
      const authorizedFunction = () => {
              if(localStorage.getItem('token')){
                AuthServices.isAuthorized().then((response) => {
                  if(response.data.status === 'pass' && response.data.role === 'Admin'){
                    const user = {
                      userId: response.data.user_Id,
                      role: response.data.role
                    }
                    setUser(user)
                  }else{
                  navigate("/NotFound")
                  }
                }).catch(() => {
                navigate("/Login")
            })
              }else{
              navigate("/NotFound")
            }   
          }
    
          Promise.all([allOrders]).then(function(response) {   
            setOrders(response[0].data.orders);
            setrowCount(response[0].data.rowCount);
            authorizedFunction();
          })
        }

        getPageContent().then (() =>{
          setLoading(false)
        }).catch (() =>{
          setLoading(true)
        })
    // eslint-disable-next-line
   }, [openModalEditOrder,page,searchWord]);

   if (loading) return <WaitPage/>

  return (
    <>
      <Topbar user = {user} setUser = {setUser}/>
      <Orders 
        orders = {orders}
        openModalEditOrder = {openModalEditOrder}
        setOpenModalEditOrder = {setOpenModalEditOrder}
        page = {page}
        setPage = {setPage}
        rowCount = {rowCount}
        deleteOrder = {deleteOrder}
        onFilterChange = {onFilterChange}
      />
    </>
    )
}

export default AdminOrders