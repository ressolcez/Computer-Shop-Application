import React, { useState,useEffect,useContext,useCallback } from 'react';
import { UserContext } from '../../SharedComponent/Context/UserContext';
import {useNavigate} from "react-router-dom";
import Products from '../ProductComponent/Products';
import Topbar from '../SharedComponents/PagesLayoutComponent/TopBar';
import AuthServices from '../../SharedComponent/Services/AuthServices';
import ProductServices from '../../SharedComponent/Services/ProductServices';
import WaitPage from '../../SharedComponent/SharedPages/WaitPage';

function AdminProducts() {

  const {user,setUser } = useContext(UserContext);
  const [products,setProducts] = useState([]);
  const [openModalAddProduct, setOpenModalAddProduct] = useState(false);
  const [openModalEditProduct, setOpenModalEditProduct] = useState(false);
  const [searchWord,setSearchWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowCount,setrowCount] = useState(0);
  const navigate = useNavigate();

  const deleteProduct = (productId) =>{
    ProductServices.deleteProduct(productId)
    window.location.reload(false)
  }

  const onFilterChange = useCallback((filterModel) => {
    setSearchWord(filterModel.quickFilterValues.toString());
  }, []);

  useEffect(() => {  


const getPageContent = async () => {

  const AllProducts = await ProductServices.getAllProducts(page,searchWord);

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

      Promise.all([AllProducts]).then(function(response) {   
        setProducts(response[0].data.products);
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
    }, [openModalEditProduct,openModalAddProduct,page,searchWord]);


 if (loading) return <WaitPage/>

  return (
    <>
      <Topbar user = {user} setUser = {setUser}/>
      <Products 
        openModalAddProduct = {openModalAddProduct} 
        setOpenModalAddProduct = {setOpenModalAddProduct}
        openModalEditProduct = {openModalEditProduct} 
        setOpenModalEditProduct = {setOpenModalEditProduct} 
        products = {products}
        page = {page}
        setPage = {setPage}
        rowCount = {rowCount}
        onFilterChange = {onFilterChange}
        deleteProduct = {deleteProduct}
       />
    </>
  )
}

export default AdminProducts