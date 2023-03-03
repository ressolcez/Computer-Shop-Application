import React from 'react';
import MostRatedProduct from './MostRatedProduct';
import "./MostRatedProducts.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function MostRatedProducts({products}) {

  return (
    <div className='MostRatedProducts__wrappper'>
       {products && products.map((product)=>(
          <MostRatedProduct key={product.id} product = {product}/>
      ))}
    </div>
  )
}

export default MostRatedProducts