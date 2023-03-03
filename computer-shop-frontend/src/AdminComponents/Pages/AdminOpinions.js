import React, { useState,useEffect,useContext } from 'react';
import {UserContext} from '../../SharedComponent/Context/UserContext';
import {useNavigate} from "react-router-dom";
import Topbar from '../SharedComponents/PagesLayoutComponent/TopBar';
import AuthServices from '../../SharedComponent/Services/AuthServices';
import Opinions from '../OpinionsComponent/Opinions';
import OpinionsService from '../../SharedComponent/Services/OpinionsService';
import WaitPage from '../../SharedComponent/SharedPages/WaitPage';

function AdminOpinions() {

    const {setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [openModalEditopinions, setOpenModalEditOpinions] = useState(false);
    const [page, setPage] = useState(0);
    const [opinions, setOpinions] = useState([]);
    const [rowCount,setrowCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const deleteOpinion = (opinionId) =>{
      OpinionsService.deleteOpinion(opinionId)
      window.location.reload(false)
    }

    useEffect(() => {  

      const getPageContent = async () => {

        const AllOpinions = await OpinionsService.getAllOpinions(page);
      
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
      
            Promise.all([AllOpinions]).then(function(response) {   
              setOpinions(response[0].data.opinions);
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
    }, [page,openModalEditopinions]);

  if (loading) return <WaitPage/>

  return (
    <>
        <Topbar/>
        <Opinions
          opinions = {opinions}
          page = {page}
          setPage = {setPage}
          rowCount = {rowCount}
          openModalEditopinions = {openModalEditopinions}
          setOpenModalEditOpinions = {setOpenModalEditOpinions}
          deleteOpinion = {deleteOpinion}
        />
    </>
  )
}

export default AdminOpinions