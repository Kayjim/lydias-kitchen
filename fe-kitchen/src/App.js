import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SearchAppBar from "./components/appBar";
import HomePage from "./pages/Home";
import CookiesPage from "./pages/Cookies";
import AdminPage from "./pages/Admin";
import CheckOut from "./components/Checkout/checkout";
import Drawer from '@material-ui/core/Drawer';

import axios from "axios";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

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

  const removeFromCart = (p) => {
    let currentCart = [...cart];
    const idx = currentCart.indexOf(p);
    if(idx !== -1){
      currentCart.splice(idx, 1);
      setCart(currentCart);
    }
  }

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
  }, []);

  return (
    <BrowserRouter>
      <SearchAppBar
        handleSearch={handleSearch}
        toggleDrawer={toggleDrawer}
        cart={cart}
      ></SearchAppBar>
      {showCart === true ?
        (<Drawer anchor="top" open={showCart} onClose={toggleDrawer(false)}>
          {cart.map(p => {
            return (
              <ul key={p.title}>
                <li key={p.title}>{p.title}</li>
              </ul>
            );
          })}
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
          render={props => <CookiesPage {...props} addToCart={addToCart} products={products.filter(p => p.type === 'Cookie')} />} path="/cookies" />
        <Route
          render={props => <CookiesPage {...props} products={products} />} path="/cakes" />
        <Route
          render={props => <CookiesPage {...props} products={products} />} path="/foodprep" />
        <Route
          path="/order" component={CheckOut} />
        <Route
          path="/feedback" component={CookiesPage} />
        <Route
          path="/3" component={AdminPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
