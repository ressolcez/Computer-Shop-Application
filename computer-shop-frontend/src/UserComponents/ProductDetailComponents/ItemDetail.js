import React,{useState} from 'react';
import {useCart} from "react-use-cart";
import ImageGallery from 'react-image-gallery';
import SnackbarSuccess from '../SharedComponents/Snackbars/SnackbarSuccess';
import "react-image-gallery/styles/css/image-gallery.css";
import "./ItemDetail.css";

export default function ItemDetail({product}) {

  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const handleCloseSnackbarSuccess = () => setOpenSnackbarSuccess(false);
  const {addItem} = useCart();
  
  const handleAddToCart = () =>{
    addItem(product);
    setOpenSnackbarSuccess(true);
  }

  return (
    <div className='ItemDetail__wrapper'>
        <div className='ItemDetail__images__wrapper'>
        {product.image !== undefined && <ImageGallery items={[{original: require(`../../Images/${product.image}`),thumbnail: require(`../../Images/${product.image}`)}]} showPlayButton = {false}/>}
        </div>
        <div className='ItemDetail__description_wrapper'> 
        <div className="product-description">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
            </div>
            <div className="product-price">
              <span>{product.price} zł</span>
              <p className="cart-btn" onClick={()=> handleAddToCart()}>Kup</p>
            </div>
        </div>
        <SnackbarSuccess openSnackbarSuccess = {openSnackbarSuccess} handleCloseSnackbarSuccess = {handleCloseSnackbarSuccess} message = "Dodano do koszyka"/>
    </div>
  )
}
