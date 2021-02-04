import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SearchAppBar from "./components/appBar";
import HomePage from "./pages/Home";
import CookiesPage from "./pages/Cookies";
import CakesPage from "./pages/Cakes"
import AdminPage from "./pages/Admin";
import EventsPage from "./pages/Events";
import LoginPage from './pages/Login';
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

const useStyles = makeStyles(theme => ({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
    width: '100%',
  },
}));

const App = (props) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const classes = useStyles();

  //#region Search bar functionality
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
  //#endregion

  //#region Login Functions
  const loginSuccess = res => {
    axios.post('http://localhost:4000/3/login', {
      headers: {
        Authorization: `Bearer ${res.tokenId}`
      }
    })
    .then(res => {
      if(res.data.isLoggedIn){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        toast.error(`${res.data.msg}`, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });
  };

  const loginFailure = res => {
    console.log('[Login Failure] res: ', + res);
  };
  //#endregion

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
  }, [isLoggedIn]);

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" target='_blank' href="http://www.lydiaskitchen.net/">
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
        <Link color="inherit" target='_blank' href="http://www.chrispcodes.com">
          ChrisPCodes
        </Link>
        {'.'}
      </Typography>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer className='mobileToast' />
      <SearchAppBar
        handleSearch={handleSearch}
        toggleDrawer={toggleDrawer}
        cart={cart}
      ></SearchAppBar>
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
          render={props => isLoggedIn ? <EventsPage {...props} /> : <LoginPage loginSuccess={loginSuccess} loginFailure={loginFailure} />}
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
          path="/3" 
          exact
          render = {props => isLoggedIn ? <AdminPage /> : <LoginPage loginSuccess={loginSuccess} loginFailure={loginFailure} />}
          />
      </Switch>
      <footer className={classes.footer}>
        <Copyright />
        <CpCodes />
      </footer>
    </BrowserRouter>
  );
}

export default App;
