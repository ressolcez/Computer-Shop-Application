import React from 'react';
import StyledLink from '../../../SharedComponent/PagesLayoutComponents/StyledLink';
import {motion} from "framer-motion"
import "./Searchbar.css";

function SearchBar({products,setSearchWord}) {
    return (
      <div>
        <div>
          <input type="text" className = "topbar__search" onChange={(e) => setSearchWord(e.target.value)}/>
        </div>
        {products.length !== 0 && (
            <motion.div layout animate = {{opacity: 1}} initial = {{opacity:0}} exit = {{opacity: 0}} className='data__result__wrapper'>
            {products.map((product) => {
              return (
                <StyledLink to={"/"+product.categoryModel.categoryName+"/"+product.id} >
                <div className='styled__single__iteam__search' key = {product.productId}>
                <div className='item__image__search'>
                    <img style ={{width:'110px', height:'95px'}} src = {require(`../../../Images/${product.image}`)} alt = "product_image"/>
                 </div>
                 <div className='item__description__search'>
                    <div className='name__serach'>
                      <b>Nazwa:&nbsp;</b> {product.name} 
                    </div>
                    <div className='category__search'>
                      <b>Kategoria:&nbsp;</b> {product.categoryModel.categoryName}
                    </div>
                    <div className='producent__search'>
                      <b>Producent:&nbsp;</b> {product.producent}
                    </div>
                    <div className='price__search'>
                      <b>Cena:&nbsp;</b> {product.price} PLN
                    </div>
                 </div>
                </div>    
                </StyledLink> 
              );
            })}
          </motion.div>
        )}
      </div>
    );
  }

export default SearchBar