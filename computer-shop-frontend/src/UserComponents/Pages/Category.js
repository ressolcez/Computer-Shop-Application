import React, {useEffect,useContext} from 'react';
import { UserContext } from '../../SharedComponent/Context/UserContext';
import Footer from '../SharedComponents/PageLayoutComponents/Footer';
import Topbar from '../SharedComponents/PageLayoutComponents/Topbar';
import CategoryComponent from '../CategoryComponents/CategoryComponent';
import AuthServices from '../../SharedComponent/Services/AuthServices';
import StyledDivider from '../../SharedComponent/PagesLayoutComponents/StyledDivider';
import "./Category.css";

function Category() {

  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
   
  const authorizedFunction = () => {  
    if(localStorage.getItem('token')){
        AuthServices.isAuthorized().then((response) => {
          if(response.data.status === 'pass'){
            const user = {
              userId: response.data.user_Id,
              role: response.data.role
            }
            setUser(user)
          }
        });
      }
  }

  authorizedFunction();
  // eslint-disable-next-line
  }, []);

  return (
    <div className="category__wrappper">
      <Topbar user = {user} setUser = {setUser}/>
      <CategoryComponent/>
      <StyledDivider/>
      <Footer/>
    </div>
  )
}

export default Category