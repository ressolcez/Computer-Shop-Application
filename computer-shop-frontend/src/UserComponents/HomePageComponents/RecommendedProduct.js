import React,{useState,useEffect} from 'react';
import {useCart} from "react-use-cart";
import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import OpinionsService from '../../SharedComponent/Services/OpinionsService';
import StyledLink from '../../SharedComponent/PagesLayoutComponents/StyledLink';
import SnackbarSuccess from '../SharedComponents/Snackbars/SnackbarSuccess';
import "./RecommendedProduct.css";

function RecommendedProduct({product}) {

    const {addItem} = useCart();
    const [opinionsRate ,setOpinionsRate] = useState([]);
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleCloseSnackbarSuccess = () => setOpenSnackbarSuccess(false);

    const handleAddToCart = () =>{
      addItem(product);
      setOpenSnackbarSuccess(true);
    }

    useEffect(() => {
      const getRecommendedProductContent = async () => { 
        await OpinionsService.getOpinionToProductRate(product.id).then((response) => {
            setOpinionsRate(response.data);
        });
      }

      getRecommendedProductContent().then (() =>{
        setLoading(false)
      }).catch (() =>{
        setLoading(true)
      })

      }, [product.id]);

    if(!loading){
      return (
        <>
          <div className='carousel__item'>
            <div className='carousel__item__img__cont'>
            <StyledLink to={"/"+product.categoryModel.categoryName+"/"+product.id}>
                <img  src = {require(`../../Images/${product.image}`)} alt = "komputer"/>
            </StyledLink>
            </div>
            <div className='carousel__desc'>
                <div className='carousel__desc__title'>
                  <div>
                    <p style = {{marginBottom: '0', marginLeft:'3px'}}> {product.name}</p>
                    <div style = {{paddingRight:'1%'}}>
                      <Rating value={parseFloat(opinionsRate.finalRate)} readOnly precision={0.5} size="small"/>
                    </div>
                  </div>
                    <div className='carousel__desc__price__btn'>
                      <div className='carousel__desc__price'>
                        {product.price} PLN
                      </div>
                      <div className='carousel__desc__btn'>
                      <Button variant="contained" style = {{paddingTop: '2px', paddingBottom:'2px'}} color="success" onClick={()=> handleAddToCart()}>
                        <AddShoppingCart style ={{width:'20px'}} />
                      </Button>
                      </div>
                    </div>
                </div>
            </div>
          </div>
          <div>
          <SnackbarSuccess openSnackbarSuccess = {openSnackbarSuccess} handleCloseSnackbarSuccess = {handleCloseSnackbarSuccess} message = "Dodano do koszyka"/>
          </div>
      </>
      )
    }
}

export default RecommendedProduct