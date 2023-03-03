import React from 'react'
import Logo from "../../../Images/Logo.png"
import Facebook from "../../../Images/facebook.png"
import Twitter from "../../../Images/twitter.png"
import Instagram from "../../../Images/instagram.png"
import Localization from "../../../Images/loca.png"
import Mail from "../../../Images/mail.png"
import Call from "../../../Images/call.png"
import './Footer.css'
import StyledLink from '../../../SharedComponent/PagesLayoutComponents/StyledLink'

function Footer() {
    return (
    <footer>
        <div className= "footer__wraper">
            <div className = "footer__leftBox">
                <img src={Logo} alt="Logo" style={{marginBottom: '5%'}}/>
                <div>  Strona służąca do</div>
                <div>sprzedawania akcesoriów</div>
                <div>komputerowych</div>
                <div style={{marginTop: '5%'}}>
                    <a href="src/UserComponents/SharedComponents/PageLayoutComponents/Footer">
                        <img src={Facebook} alt = "facebook"/>
                    </a>
                    <a href="src/UserComponents/SharedComponents/PageLayoutComponents/Footer">
                        <img src={Twitter}  alt = "twitter"/>
                    </a>
                    <a href="src/UserComponents/SharedComponents/PageLayoutComponents/Footer" >
                        <img src={Instagram} alt = "instagram"/>
                    </a>
                </div>
            </div>
            <div className = "footer__middleBox">
                <span className = "footer__title"> Przydatne linki </span>
                    <StyledLink to = {"/statute"}>
                        <span>Regulamin</span>
                    </StyledLink>
                    <StyledLink to = {"/contactForm"}>
                        <span>Kontakt</span>
                    </StyledLink>
                    <StyledLink to = {"/"}>
                        <span>Strona Główna</span>
                    </StyledLink>
            </div>
            <div className = "footer__rightBox">
               <span className = "footer__title">Kontakt</span>

               <div className = "footer__description">
                    <img src={Call} alt = "Call"/>
                    <span> 576304115</span>
               </div>   
               <div className = "footer__description">
                    <img src={Mail} alt = "Mail"/>
                    <span> Sellkon@mail.com </span>
                </div>  
                <div className = "footer__description"> 
                    <img src={Localization} alt = "Loca"/>
                    <span> Kielce, ul. Mała </span>
                </div>   
            </div>
        </div>
    </footer>
    )
  }
  
  export default Footer