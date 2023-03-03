import React,{useState,useEffect} from 'react';
import {useCart} from "react-use-cart";
import styled from "styled-components";
import Button from '@mui/material/Button';
import SingleCartItem from './SingleCartItem';
import CreateNewOrderFailModal from '../SharedComponents/Modals/CreateNewOrderFailModal';
import StyledDivider from "../../SharedComponent/PagesLayoutComponents/StyledDivider";
import { useNavigate } from "react-router-dom";
import OrderServices from '../../SharedComponent/Services/OrderServices';
import "./CartOrderComponent.css";

const SummaryTitle = styled.h1`
  font-weight: 200;
  display: flex;
  justify-content: center;
`;

const SummaryItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

function CartOrderComponent({user}) {

  const navigate = useNavigate();

  const { items,cartTotal,totalItems,updateItemQuantity} = useCart();

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const [error,setError] = useState([]);
  const [msg, setMsg] = useState('');


  useEffect(() => {
    OrderServices.checkoutCart(items).then(() => {
      setError([])
    })
    .catch((error) => {
      setError(error.response.data)
    })
      // eslint-disable-next-line
 }, [updateItemQuantity]);


  const checkoutCart = () => {
      if(error.length === 0){
          navigate("/order")
      }else{
        setMsg('Nie posiadamy wystarczającej ilości przedmiotów w magazynie')
        setOpenModal(true);
      }
  }


  return (
    <>
    {items.length !== 0 ? (
      <div className='cart__items__order__wrapper'>
          <div className='cart__items__wrapper'>
          <div className='cart__heading'>
            <h2>Twój koszyk</h2>
           </div>  
          {items.map((product)=>(
            <SingleCartItem key = {product.id} updateItemQuantity = {updateItemQuantity} product = {product} error = {error}/>
          ))}
          </div>
          <div className='cart__order__wrapper'>

          <SummaryTitle>Podsumowanie</SummaryTitle>
          <StyledDivider/>
              <SummaryItem>
                <SummaryItemText>Ilość przedmiotów</SummaryItemText>
                <SummaryItemPrice>{totalItems}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Dostawa</SummaryItemText>
                <SummaryItemPrice>Gratis</SummaryItemPrice>
              </SummaryItem>
              <StyledDivider/>
              <SummaryItem type="total">
                <SummaryItemText>Cena</SummaryItemText>
                <SummaryItemPrice>{cartTotal} PLN</SummaryItemPrice>
              </SummaryItem>
              {!user ? (
              <Button style = {{margin:'15px'}} variant = "contained" onClick={()=> {
                setMsg('Zaloguj się aby zrealizować zamówienie')
                setOpenModal(true)}}> Zamów</Button>
              ) : (
                <Button style = {{margin:'15px'}} variant = "contained"  onClick={()=> checkoutCart()}> Przejdź do płatności</Button>
              )}
          </div>
          <CreateNewOrderFailModal msg={msg} openModal = {openModal} handleCloseModal = {handleCloseModal}/>
      </div>
    ):(
      <div className='cart__no__content'> 
        <h3> Brak przedmiotów w koszyku</h3>
        <Button variant = 'contained' color = 'success' style = {{marginTop:'15px'}} onClick = {()=> navigate('/')}> Przejdź do strony głównej</Button>
      </div>
    )
    }
  </>
  )
}

export default CartOrderComponent