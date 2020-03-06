import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SearchAppBar from "./components/AppBar";
import HomePage from "./pages/Home";
import CookiesPage from "./pages/Cookies";
import AdminPage from "./pages/Admin";
import CheckOut from "./components/Checkout/checkout";

import axios from "axios";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const handleSearch = txt => {
    let newProductState = [];
    switch (txt) {
      case(''):
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

  useEffect(() => {
    axios.get("http://localhost:4000/all-products").then(res => {
      setProducts(res.data.products);
      setAllProducts(res.data.products);
    });
  }, []);

  return (
    <BrowserRouter>
      <SearchAppBar handleSearch={handleSearch}></SearchAppBar>
      <Switch>
        <Route
          path="/"
          exact
          render={props => <HomePage {...props} products={products} />}
        />
        <Route
          render={props => <CookiesPage {...props} products={products.filter(p => p.type === 'Cookie')} />} path="/cookies" />
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
