import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import SearchAppBar from "./components/appBar";
import HomePage from "./pages/Home";
import CookiesPage from "./pages/Cookies";
import CakesPage from "./pages/Cakes"
import AdminPage from "./pages/Admin";
import EventsPage from "./pages/Events";
import MaintenancePage from "./pages/Maintenance";
import CheckOut from "./components/Checkout/checkout";
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import { ToastContainer, toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';

import axios from "axios";

import "./App.css";
import "./css/media-queries.css";
import 'react-toastify/dist/ReactToastify.css';


const StyledDrawer = withStyles({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    padding: '20px'
  }
})(Drawer);

const App = (props) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [search, setSearch] = useState('');

  //Search bar functionality
  const handleSearch = txt => {
    let newProductState = [];
    switch (txt) {
      case (''):
        setProducts(allProducts);
        setSearch('');
        break;
      case "Cake":
        newProductState = products.filter(p => p.type === "Cake");
        setProducts(newProductState);
        setSearch('cakes');
        break;
      case "Cakes":
        newProductState = products.filter(p => p.type === "Cake");
        setProducts(newProductState);
        setSearch('cakes');
        break;
      case "Cookie":
        newProductState = products.filter(p => p.type === "Cookie");
        setProducts(newProductState);
        setSearch('cookies');
        break;
      case "Cookies":
        newProductState = products.filter(p => p.type === "Cookie");
        setProducts(newProductState);
        setSearch('cookies');
        break;
      case "Cupcakes":
        newProductState = products.filter(p => p.type === "Cupcake");
        setProducts(newProductState);
        setSearch('cupcakes');
        break;
      case "Cupcake":
        newProductState = products.filter(p => p.type === "Cupcake");
        setProducts(newProductState);
        setSearch('cupcakes');
        break;
      default:
        break;
    }
  };

  //Add to shopping cart
  const addToCart = (p) => {
    let currentCart = [...cart];
    currentCart.push(p);
    sessionStorage.setItem('cart', JSON.stringify(currentCart));
    setCart(currentCart);
  };

  //remove from shopping cart
  const removeFromCart = (p) => {
    let currentCart = [...cart];
    const idx = currentCart.findIndex(prod => prod.id === p.id);
    if (idx !== -1) {
      currentCart.splice(idx, 1);
      setCart(currentCart);
      sessionStorage.setItem('cart', JSON.stringify(currentCart));
    }
  }
  //create order logic
  const validateCart = (cart) => {
    if (cart.length < 1) {
      setAlertMessage('You do not have any items in your shopping cart. Try adding some, and trying again!');
      setAlertType('error');
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
    axios.get("https://lydias-kitchen.herokuapp.com/all-products").then(res => {
      setProducts(res.data.products);
      setAllProducts(res.data.products);
    }).catch(e => { console.log(e) });
    if (typeof (sessionStorage) !== 'undefined' && sessionStorage !== null) {
      let cart = sessionStorage.getItem('cart');
      if (typeof (cart) !== 'undefined' && cart !== null && cart.length >= 1) {
        setCart(JSON.parse(cart));
      }
    }
    if (window.location.href.indexOf('noCart') > -1) {
      setAlertMessage('You do not have any items in your shopping cart. Try adding some, and trying again!');
      setAlertType('error');
    }
  }, []);

  //after order alertMessage is updated
  useEffect(() => {
    switch (alertType) {
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

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://www.lydiaskitchen.net/">
          Lydia's Kitchen
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  function CpCodes() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Website created and maintained by Chris Patrick of '}
        <Link color="inherit" href="http://www.chrispcodes.com">
          ChrisPCodes
        </Link>{' '}
        {'.'}
      </Typography>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <SearchAppBar
        handleSearch={handleSearch}
        toggleDrawer={toggleDrawer}
        cart={cart}
      ></SearchAppBar>
      {showCart === true ?
        (<StyledDrawer anchor="top" open={showCart} onClose={toggleDrawer(false)}>
          <CloseIcon id='close' onClick={() => setShowCart(false)} />
          {cart.map(p => {
            return (
              <div id='cart-item-container' key={p.title}>
                <ul className='cart-list' key={p.title}>
                  <li key={p.title}>
                    <img className="checkout-img" src={p.images[0]}></img>
                    <p>{p.title}</p>
                    <Button variant='outlined' color='secondary' onClick={() => removeFromCart(p)}><RemoveIcon /></Button>
                  </li>
                </ul>
              </div>
            );
          })}
          <Link className="checkout-btn" href='/order' onClick={() => validateCart(cart)}>Proceed to Checkout</Link>
        </StyledDrawer>) :
        null
      }
      <Switch>
        <Route
          path="/"
          exact
          render={props => <HomePage {...props} search={search} products={products} />}
        />
        <Route
          path="/home"
          exact
          render={props => <HomePage {...props} search={search} products={products} />}
        />
        <Route
          path="/3/events"
          exact
          render={props => <EventsPage {...props} />}
        />
        {/* <Route 
          path='/noCart'
          exact
          render={props => <HomePage {...props}products={products} />}
        /> */}
        {/* <Route
          render={props => <CookiesPage {...props} products={products.filter(p => p.type === 'Cookie')} />} path="/cookies" />
        <Route
          render={props => <CakesPage {...props} products={products.filter(p => p.type === 'Cake')} />} path="/cakes" /> */}
        {/* <Route
          render={props => <CookiesPage {...props} products={products} />} path="/foodprep" /> */}
        <Route
          render={props => <CheckOut {...props} />} path="/order" />
        {/* <Route
          path="/feedback" component={CookiesPage} /> */}
        <Route
          path="/3" component={AdminPage} />
      </Switch>
      <Copyright />
      <CpCodes />
    </BrowserRouter>
  );
}

export default App;
