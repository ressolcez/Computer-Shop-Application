import React,{useState,useEffect,useContext } from 'react'
import { UserContext } from '../../SharedComponent/Context/UserContext';
import AuthServices from '../../SharedComponent/Services/AuthServices';
import Footer from '../SharedComponents/PageLayoutComponents/Footer';
import Topbar from '../SharedComponents/PageLayoutComponents/Topbar';
import StyledDivider from '../../SharedComponent/PagesLayoutComponents/StyledDivider';
import UsersServices from '../../SharedComponent/Services/UsersServices';
import ProfileComponent from '../UserAccountComponent/ProfileComponent';
import "./Profile.css"

function Profile() {

    const {user,setUser } = useContext(UserContext);
    const [userData,setUserData] = useState()

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

        
  return (
    <div className='profile__wrapper'>
        <Topbar user = {user} setUser = {setUser}/>
        <div style= {{flex:1}}>
            {userData &&<ProfileComponent userdata = {userData}/>}
        </div>
        <StyledDivider/>
        <Footer/>
    </div>
  )
}

export default Profile