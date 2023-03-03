import React from 'react';
import StyledDivider from "../../SharedComponent/PagesLayoutComponents/StyledDivider";
import "./UserRecentOrderComponent.css";

export default function UserRecentOrderComponent({orders}) {

  return (
    <div className='userRecentOrderComponent__wrapper'>
      {orders.map((order)=>(
        <div className='single__order__wrappper'>
          <div className='order__title'>
            <p className='order__info'><b>Identyfikator zamówienia:</b> {order.id}</p>
            <p className='order__info'><b>Status:</b> {order.status}</p>
            <p className='order__info'><b>Data:</b> {order.date}</p>
            <p className='order__info'><b>Łączna kwota zamówienia:</b> {order.totalPrice} PLN</p> 
            <div style ={{width:'100%'}}>
                 <StyledDivider/>
            </div>
          </div>
          <div className='products__inorder__wrapper'>
          {order.orderProductModels.map((product)=>(
              <div className='single__productInOrder__wrappper'>
                  <div className='single__product__image'>
                   
                    <img src = {require(`../../Images/${product.productModel.image}`)} alt = "komputer img"/>
                  </div>
                  <div className='single__product__name'>
                    <b>Nazwa:</b>
                    {product.productModel.name}
                  </div>
                  <div className='single__product__quantity'>
                    <b>Ilość:</b>
                      {product.quantity}
                  </div>
                  <div className='single__product__price'>
                    <b>Cena:</b>
                      {product.quantity * product.productModel.price} PLN
                  </div>
                  <div style ={{width:'100%'}}>
                  <StyledDivider/>
                  </div>
              </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
