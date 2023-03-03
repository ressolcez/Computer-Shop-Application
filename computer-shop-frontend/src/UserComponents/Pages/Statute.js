import React, { useState,useEffect,useContext } from 'react'
import Topbar from '../SharedComponents/PageLayoutComponents/Topbar';
import Footer from '../SharedComponents/PageLayoutComponents/Footer';
import "./Statute.css"
import AuthServices from '../../SharedComponent/Services/AuthServices';
import StyledDivider from '../../SharedComponent/PagesLayoutComponents/StyledDivider';
import { UserContext } from '../../SharedComponent/Context/UserContext';
import UsersServices from '../../SharedComponent/Services/UsersServices';

function Statute() {

    useEffect(() => {
        if(localStorage.getItem('token')){
            AuthServices.isAuthorized().then((response) => {
              if(response.data.status === 'pass'){
                const user = {
                  userId: response.data.user_Id,
                  role: response.data.role
                }

               UsersServices.getUserById(response.data.user_Id).then ((response) =>{
                 setUserData(response.data);
               })
                setUser(user)
              }
            });
          }
        // eslint-disable-next-line
    }, []);

     const {user,setUser } = useContext(UserContext);
    
     const [setUserData] = useState()

  return (
    <div className='statute__wrapper'>
        <Topbar user = {user} setUser = {setUser}/>
        <div className='single__paragraph__wrapper'>
            <div className='statute__title'>
                I. Zamówienia
            </div>
            <div className='statute__desc'>
                <p>1. Klient ma możliwość realizacji zamówienia, jeżeli jest zalogowany na swoje konto.</p>  
                <p>2. Klient składa zamówienie poprzez wypełnienie formularza znajdującego sie pod adresem <a href = "order">zamówienia</a>, określa w nim towary, które zamierza kupić oraz adres na który mają zostać dostarczone towary. </p>
                <p>3. Po poprawnej weryfikacji zamówienia, Klient dostaje informacje o złożonym zamówieniu od Sprzedawcy na adres mailowy podany podczas wypłeniania formularza zamówienia. </p>
                <p>4. W wiadomości mailowej Klient otrzymuje, krótkie podsumowanie swojego zamówienia.</p>
                <p className='statute__subparagraph'>a) Numer identyfikujący zamówienie.</p>
                <p className='statute__subparagraph'>b) Całkowitą sumę zamówienia.</p>
                <p className='statute__subparagraph'>c) Numer Konta sprzedawcy, na które powinny zostać przelane pieniądze w wysokości całkowitej sumy zamówienia.</p>
                <p>5. Wiadomość mailowa, wspomniana w punkcie 2. jest jedynie informacją o tym, że Sprzedawca otrzymał chęć kupna przedmiotów wybranych podczas wypłeniania formularza zamówienia, a nie potwierdzeniem realizacji zamówienia. </p>
                <p>6. Klient ma czas 5 dni od złożenia zamówienia na przelanie środków na konto Sprzedawcy, wysłane przez Sprzedawce w wiadomości mailowej do Klienta.</p>
                <p className='statute__subparagraph'>a) Przelew, który klient realizuje dla Sprzedawcy na numer konta podany w wiadomości mailowej, musi mieć tytuł z numerem zamówienia, który Klient otrzymuje od Sprzedawcy w wiadomości Mailowej.</p>
                <p>7. Następnie Sprzedawca weryfikuje zamówienie. </p>
                <p>8. Jeżeli weryfikacja zamówienia przebiegła poprawnie oraz wysłane pieniądze od Klienta na numer konta podany przez Sprzedawce pokrywają całą sumę zamówienia oraz tytuł przelewu jest poprawnym numerem zamówienia, Sprzedawca realizuje zamówienie.  </p>
                <p className='statute__subparagraph'>a) Jeżeli zmienia się status zamówienia Klienta, każdorazowo Klient otrzymuje informację o swoim zamówieniu w wiadomości mailowej.</p>
                <p>9. Jeżeli weryfikacja zamówienia przebiegła niepoprawnie.  </p>
                <p className='statute__subparagraph'>a) Jeżeli użytkownik wysłał przelew z błędną kwotą, która niezgadza się z całkowitą sumą zamówienia to pieniądze te mu zostaną zwrócone na konto, z którego zostały wysłane.</p>
                <p className='statute__subparagraph'>b) Jeżeli użytkownik wysłał przelew z błędnym numerem zamówienia to pieniądze, które Klient wysłał zostana zwrócone na konto, z którego zostały wysłane.</p>
            </div>
            <div className='statute__title'>
                I. Konto
            </div>
            <div className='statute__desc'>
            <p>1. Klient uzysuje dostęp do konta po rejestracji.</p>  
            </div>
        </div>
        <StyledDivider/>
        <Footer/>   
    </div>
  )
}

export default Statute