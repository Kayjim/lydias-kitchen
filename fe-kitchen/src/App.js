import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SearchAppBar from "./components/AppBar";
import HomePage from "./pages/Home";
import CookiesPage from "./pages/Cookies";
import AdminPage from "./pages/Admin";
import CheckOut from "./components/Checkout/checkout";
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import {ToastContainer, toast} from 'react-toastify';

import axios from "axios";

import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

const App = (props) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isCheckout, setIsCheckout] = useState(false);

  //Search bar functionality
  const handleSearch = txt => {
    let newProductState = [];
    switch (txt) {
      case (''):
        setProducts(allProducts);
        break;
      case "Cake":
        newProductState = products.filter(p => p.type === "Cake");
        setProducts(newProductState);
        break;
      case "Cakes":
        newProductState = products.filter(p => p.type === "Cake");
        setProducts(newProductState);
        break;
      case "Cookie":
        newProductState = products.filter(p => p.type === "Cookie");
        setProducts(newProductState);
        break;
      case "Cookies":
        newProductState = products.filter(p => p.type === "Cookie");
        setProducts(newProductState);
        break;
      case "Food Prep":
        newProductState = products.filter(p => p.type === "Cake");
        setProducts(newProductState);
        break;
      default:
        break;
    }
  };

  //Add to shopping cart
  const addToCart = (p) => {
    let currentCart = [...cart];
    currentCart.push(p);
    setCart(currentCart);
  };

  //remove from shopping cart
  const removeFromCart = (p) => {
    let currentCart = [...cart];
    const idx = currentCart.indexOf(p);
    if(idx !== -1){
      currentCart.splice(idx, 1);
      setCart(currentCart);
    }
  }
  //create order logic
  const createOrder = (cart) => {
    if(cart.length < 1){
      setAlertMessage('You do not have any items in your shopping cart. Try adding some, and trying again!');
      setAlertType('error');
    }
    else {
      // setAlertMessage('Order form from context logic to be implemented.');
      // setAlertType('success');
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShowCart(open);
  };

  //render
  useEffect(() => {
    axios.get("http://localhost:4000/all-products").then(res => {
      setProducts(res.data.products);
      setAllProducts(res.data.products);
    });
    if(typeof(sessionStorage) !== 'undefined' && sessionStorage !== null){
      let cart = sessionStorage.getItem('cart');
      if(typeof(cart) !== 'undefined' && cart !== null && cart.length >= 1){
        setCart(JSON.parse(cart));
      }
    }
    if(window.location.href.indexOf('noCart') > -1){
      setAlertMessage('You do not have any items in your shopping cart. Try adding some, and trying again!');
      setAlertType('error');
    }
  }, []);

  //after order alertMessage is updated
  useEffect(() => {
    switch(alertType){
      case 'error':
        toast.error(alertMessage, 
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressbar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          }
        );
        break;
      case 'success':
        toast.success(alertMessage, 
          {
            position: "top-center",
            autoClose: 4000,
            hideProgressbar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          }
        );
        break;
    }
  }, [alertType]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <SearchAppBar
        handleSearch={handleSearch}
        toggleDrawer={toggleDrawer}
        cart={cart}
      ></SearchAppBar>
      {showCart === true ?
        (<Drawer anchor="top" open={showCart} onClose={toggleDrawer(false)}>
          
          {cart.map(p => {
            return (
              <div id='cart-container'>
                <ul key={p.title}>
                  <li key={p.title}>
                    <img style={{width: '20%', height: 75}} src={p.images[0]}></img>
                    {p.title}
                  </li>
                </ul>
              </div>
            );
          })}
                <Link href='/order' onClick={() => createOrder(cart)} >Proceed to Checkout</Link>
        </Drawer>) :
        null
      }
      <Switch>
        <Route
          path="/"
          exact
          render={props => <HomePage {...props} addToCart={addToCart} products={products} />}
        />
        <Route 
          path='/noCart'
          exact
          render={props => <HomePage {...props} addToCart={addToCart} products={products} />}
        />
        <Route
          render={props => <CookiesPage {...props} addToCart={addToCart} products={products.filter(p => p.type === 'Cookie')} />} path="/cookies" />
        <Route
          render={props => <CookiesPage {...props} products={products} />} path="/cakes" />
        <Route
          render={props => <CookiesPage {...props} products={products} />} path="/foodprep" />
        <Route 
          path="/order" component={CheckOut}/>
        <Route
          path="/feedback" component={CookiesPage} />
        <Route
          path="/3" component={AdminPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
