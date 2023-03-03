import React, {useEffect,useContext,useState } from 'react';
import { UserContext } from '../../SharedComponent/Context/UserContext';
import {useNavigate} from "react-router-dom";
import Topbar from '../SharedComponents/PagesLayoutComponent/TopBar';
import AuthServices from '../../SharedComponent/Services/AuthServices';
import Users from '../UserComponent/Users';
import UsersServices from '../../SharedComponent/Services/UsersServices';
import WaitPage from '../../SharedComponent/SharedPages/WaitPage';
function AdminUsers() {

    const {user,setUser } = useContext(UserContext);
    const [users,setUsers] = useState([])
    const [openModalAddUser, setOpenModalAddUser] = useState(false);
    const [openModalEditUser, setOpenModalEditUser] = useState(false);
    const [page, setPage] = useState(0);
    const [rowCount,setrowCount] = useState(0);
    const [searchWord,setSearchWord] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const deleteUser = (userId) =>{
      AuthServices.deleteUserToken(userId);
      UsersServices.deleteUser(userId);
      window.location.reload(false);
    }

    const onFilterChange = React.useCallback((filterModel) => {
      setSearchWord(filterModel.quickFilterValues.toString());
    }, []);

    useEffect(() => {  

      const getPageContent = async () => {

        const allUsers = await UsersServices.getAllUsers(page,searchWord);
      
        const authorizedFunction = () => {

                  if(localStorage.getItem('token')){
                    AuthServices.isAuthorized().then((response) => {
                      if(response.data.status === 'pass' && response.data.role === 'Admin'){
                        const user = {
                          userId: response.data.user_Id,
                          role: response.data.role
                        }
                        setUser(user)
                      }else{
                      navigate("/NotFound")
                      }
                    }).catch(() => {
                    navigate("/Login")
                })
                  }else{
                  navigate("/NotFound")
                }   
            }
      
            Promise.all([allUsers]).then(function(response) {   
              setUsers(response[0].data.users);
              setrowCount(response[0].data.rowCount);
              authorizedFunction();
            })
          }

          getPageContent().then (() =>{
            setLoading(false)
          }).catch (() =>{
            setLoading(true)
          })
        // eslint-disable-next-line
    }, [openModalEditUser,openModalAddUser,page,searchWord]);


  if (loading) return <WaitPage/>

  return (
    <>
      <Topbar user = {user} setUser = {setUser}/>
      <Users 
          users = {users}
          openModalEditUser = {openModalEditUser}
          openModalAddUser = {openModalAddUser}
          setOpenModalAddUser = {setOpenModalAddUser}
          setOpenModalEditUser = {setOpenModalEditUser}
          page = {page}
          setPage = {setPage}
          rowCount = {rowCount}
          deleteUser = {deleteUser}
          onFilterChange = {onFilterChange}
      />
    </>
  )
}

export default AdminUsers