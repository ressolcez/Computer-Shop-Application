import React, {useState, useEffect} from 'react';
import {useCart} from "react-use-cart";
import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import SnackbarSuccess from '../SharedComponents/Snackbars/SnackbarSuccess';
import StyledLink from '../../SharedComponent/PagesLayoutComponents/StyledLink';
import OpinionsService from '../../SharedComponent/Services/OpinionsService';
import "./MostRatedProduct.css"

function MostRatedProduct({product}) {

  const {addItem} = useCart();
  const [opinionsRate ,setOpinionsRate] = useState([]);
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [loading,setLoading] = useState(true);
  const handleCloseSnackbarSuccess = () =>  setOpenSnackbarSuccess(false);

  const handleAddToCart = () =>{
    addItem(product);
    setOpenSnackbarSuccess(true);
  }

  useEffect(() => {
    const getMostRatedProductContent = async () => {
     await OpinionsService.getOpinionToProductRate(product.id).then((response) => {
        setOpinionsRate(response.data);
      });
    }

  getMostRatedProductContent().then (() =>{
    setLoading(false)
  }).catch (() =>{
    setLoading(true)
  })

  }, [product.id]);

  if(!loading){
    return (
        <>
            <div className='MostRatedProduct__wrapper' >
            <StyledLink to={"/"+product.categoryModel.categoryName+"/"+product.id}>
              <div className='img__container__rated'>
                <img  src = {require(`../../Images/${product.image}`)} alt ="computer"/>
              </div>
            </StyledLink>
            <div className='title__container__rated'>{product.name}</div>
            <div className='stars__container__rated'> 
              <Rating value={parseFloat(opinionsRate.finalRate)} readOnly precision={0.5} size="small"/>
            </div>
            <div className='price__btn__container__rated'>
              <div className='price__container__rated'>{product.price} PLN</div>
              <div className='btn__container__rated'>
                <Button variant="contained" style = {{paddingTop: '2px', paddingBottom:'2px'}} color="success" onClick={()=> handleAddToCart()}>
                  <AddShoppingCart style ={{width:'20px'}} />
                </Button>
              </div>
            </div>
          </div>
          <SnackbarSuccess openSnackbarSuccess = {openSnackbarSuccess} handleCloseSnackbarSuccess = {handleCloseSnackbarSuccess} message = "Dodano do koszyka"/>
      </>
    )
  }
}


export default MostRatedProduct