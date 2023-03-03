import React, { useState, useMemo} from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import {UserContext} from "./SharedComponent/Context/UserContext";
import { CartProvider } from "react-use-cart";
import Home from "./UserComponents/Pages/Home"
import ProductDetails from './UserComponents/Pages/ProductDetails';
import Cart from './UserComponents/Pages/Cart';
import Login from './UserComponents/Pages/Login';
import Register from './UserComponents/Pages/Register';
import Category from "./UserComponents/Pages/Category";
import WaitPage from "./SharedComponent/SharedPages/WaitPage";
import UserRecentOrders from "./UserComponents/Pages/UserRecentOrders";
import AdminHome from "./AdminComponents/Pages/AdminHome";
import AdminProducts from "./AdminComponents/Pages/AdminProducts";
import AdminUsers from "./AdminComponents/Pages/AdminUsers";
import AdminOrders from "./AdminComponents/Pages/AdminOrders";
import AdminOpinions from "./AdminComponents/Pages/AdminOpinions";
import Profile from "./UserComponents/Pages/Profile";
import CreateOrder from "./UserComponents/Pages/CreateOrder";
import PageNotFound from "./SharedComponent/SharedPages/PageNotFound";
import Statute from "./UserComponents/Pages/Statute";
import ContactForm from "./UserComponents/Pages/ContactForm";
import ScrollToTop from "./SharedComponent/PagesLayoutComponents/ScrollToTop";

function App() {

  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <CartProvider>
    <UserContext.Provider value={value}>
      <HashRouter>
        <ScrollToTop/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/:name/:id" element={<ProductDetails/>}/>
          <Route path="/Category" element={<Category/>}/>
          <Route path="/Cart" element={<Cart/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Wait" element={<WaitPage/>}/>
          <Route path="/Admin" element={<AdminHome/>}/>
          <Route path="/Admin/Products" element={<AdminProducts/>}/>
          <Route path="/Admin/Users" element={<AdminUsers/>}/>
          <Route path="/RecentOrders" element={<UserRecentOrders/>}/>
          <Route path="/Admin/Orders" element={<AdminOrders/>}/>
          <Route path="/Admin/Opinions" element={<AdminOpinions/>}/>
          <Route path="/User/Profile" element={<Profile/>}/>
          <Route path="/Order" element={<CreateOrder/>}/>
          <Route path="/Statute" element={<Statute/>}/>
          <Route path="/ContactForm" element={<ContactForm/>}/>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </HashRouter>
    </UserContext.Provider>
    </CartProvider>
  );
}

export default App;
