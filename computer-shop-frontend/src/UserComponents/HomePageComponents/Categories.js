import React from 'react';
import styled from "styled-components";
import CategoriesImg from "../../Images/categories.jpg"
import StyledLink from '../../SharedComponent/PagesLayoutComponents/StyledLink';
import "./Categories.css";

const Container = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  position: relative;
  @media (max-width: 470px) {
    width: 100%;
}
`;

  const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

  const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const Title = styled.h1`
      color:#F08080;
  `;

export default function Categories() {
  return (
    <StyledLink to={"/Category"} >
    <div className='categories__wrappper'> 
   
      <Container>
        <Image src = {CategoriesImg}/>
        <Info>
          <Title>Wszystkie kategorie</Title>
        </Info>
      </Container>
    </div>
    </StyledLink>
  )
}
