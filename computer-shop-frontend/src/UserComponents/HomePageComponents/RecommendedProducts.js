import React from 'react';
import Carousel from "react-multi-carousel";
import RecommendedProduct from './RecommendedProduct';
import "react-multi-carousel/lib/styles.css";
import "./RecommendedProducts.css";

function RecommendedProducts({products}) {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 780 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 780, min: 470 },
          items: 2
        },
        minMobile: {
            breakpoint: { max: 470, min: 0 },
            items: 1
          }
      }

  if(products){
    return (
      <div className='RecommendedProducts__wrappper'>
          <Carousel responsive={responsive}>
          {products.map((product)=>(
              <RecommendedProduct product = {product} key={product.id}/>
              ))}
          </Carousel>
          </div>
         )
  }
}



export default RecommendedProducts