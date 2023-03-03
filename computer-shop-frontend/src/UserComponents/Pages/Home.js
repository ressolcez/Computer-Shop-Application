import React, { useState,useEffect,useContext } from 'react'
import {UserContext} from '../../SharedComponent/Context/UserContext';
import Footer from '../SharedComponents/PageLayoutComponents/Footer';
import Topbar from '../SharedComponents/PageLayoutComponents/Topbar';
import StyledDivider from '../../SharedComponent/PagesLayoutComponents/StyledDivider';
import MostOrderProducts from "../HomePageComponents/MostOrderProducts";
import Slider from "../HomePageComponents/Slider";
import RecommendedProducts from "../HomePageComponents/RecommendedProducts";
import Categories from "../HomePageComponents/Categories";
import MostRatedProducts from "../HomePageComponents/MostRatedProducts";
import HomePageServices from '../../SharedComponent/Services/HomePageServices';
import AuthServices from '../../SharedComponent/Services/AuthServices';
import WaitPage from "../../SharedComponent/SharedPages/WaitPage";
import "./Home.css"

const Home = () => {  

    const [sliderProduct, setSliderProduct] = useState([]);
    const [recoomendedProducts, setRecommendedProducts] = useState([]);
    const [mostOrderProducts, setMostOrderProducts] = useState([]);
    const [mostRatedProducts, setMostRatedProducts] = useState([]);
    const {user,setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
      
      const getHomePageContent = async () => {
        
        const sliderContent = await HomePageServices.getSliderContent();
        const recommendedProduct = await HomePageServices.getRecommendedProducts();
        const mostOrderProducts = await HomePageServices.getMostOrderProducts();
        const mostRatedProducts = await HomePageServices.getMostRatedProducts();

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

          Promise.all([sliderContent, recommendedProduct,mostOrderProducts,mostRatedProducts]).then(function(response) {   
            authorizedFunction();
            setSliderProduct(response[0].data);
            setRecommendedProducts(response[1].data);
            setMostOrderProducts(response[2].data);
            setMostRatedProducts(response[3].data);
          })
      }

        getHomePageContent().then (() =>{
          setLoading(false)
        }).catch (() =>{
          setLoading(true)
        })

        // eslint-disable-next-line
    }, []);

       if (loading) return <WaitPage/>

    return (      
            <main className="home__wrapper">
                <Topbar user = {user} setUser = {setUser}/>
                <Slider products = {sliderProduct}/>
                <StyledDivider/>
                <div className="products-heading">
                    <h2>Kategorie</h2>
                </div>
                <Categories/>
                <StyledDivider/>
                <div className="products-heading">
                    <h2>Najczęściej kupowane przedmioty</h2>
                </div>
                <MostOrderProducts products = {mostOrderProducts}/>
                <StyledDivider/>
                <div className="products-heading">
                    <h2>Polecane produkty!</h2>
                </div>
                <RecommendedProducts products = {recoomendedProducts}/>
                <StyledDivider/>
                <div className="products-heading">
                    <h2>Najlepiej oceniane produkty!</h2>
                </div>
                <MostRatedProducts products = {mostRatedProducts}/>
                <StyledDivider/>
                <Footer/>
            </main>
    );
  }
  
  export default Home