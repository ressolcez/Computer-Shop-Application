import React from 'react';
import './SingleCartItem.css';
import Button from '@mui/material/Button';


function SingleCartItem({updateItemQuantity,product,error}) {

      const increaseQt = () => {
        updateItemQuantity(product.id, product.quantity + 1)
      }

      const decreaseQt = () => {
        updateItemQuantity(product.id, product.quantity - 1)
      }

  return (
            <div className='single__item__wrapper'>
            <div className = 'item__image__description'>
                
                <div className='item__image'>
                    <img className='image__cart__product' src = {require(`../../Images/${product.image}`)} alt = "productImage"/>

                </div>
                <div className='item__description__cart'>
                    <p className='name__style'><b>Nazwa: </b> {product.name} </p>
                    <p className='name__style'><b>Kategoria: </b> {product.categoryModel.categoryName} </p>
                    <p className='name__style'><b>Producent: </b> {product.producent} </p>
                    <p className='name__style'><b>Ilość w magazynie: </b> {product.quantityAvailable} </p>
                    {error.length !== 0 && 
                        error.map((cos)=>(
                            cos === product.id && <p style = {{color:'red'}}><b>Produkt niedostępny!</b></p>
                        ))
                    }
                    
                </div>
            </div>
            <div className='item__control__price'>
                <div className='control'>
                    <div className='items__control'>
                    <Button onClick={() => increaseQt()} style={{minWidth:'20px', marginRight:'2px'}} variant="contained" color = "success">+</Button> {product.quantity} 
                    <Button onClick={() => decreaseQt()} style={{minWidth:'20px', marginLeft:'10px'}} variant="contained" color = "success">-</Button>
                    </div>
                </div>
                <div className='price'>
                    {product.price * product.quantity} PLN
                </div>
            </div>
        </div>  
  )
}

export default SingleCartItem