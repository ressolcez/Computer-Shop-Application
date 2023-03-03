import React from 'react';
import Carousel from "react-multi-carousel";
import StyledLink from '../../SharedComponent/PagesLayoutComponents/StyledLink';
import "./Slider.css";
import "react-multi-carousel/lib/styles.css";

export default function Slider({products}) {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

  if(products){
  return (
      <Carousel responsive={responsive}>
          {products.map((product)=>(
            <div key={product.id} className='carousel__wrappper'>
                <div>
                <StyledLink to={"/"+product.categoryModel.categoryName+"/"+product.id}>
                    <img className='inside__img'  src = {require(`../../Images/${product.image}`)} alt = "computer"/>
                </StyledLink>
                </div>
              <div className='carousel__wrapper__description'>
                  <div className='carousel__wrapper__title'>
                      {product.name}
                  </div>
                  <div className='carousel__wrapper__desc'>
                      {product.description}
                  </div>
              </div>
          </div>
          ))}
      </Carousel>
  )}
}