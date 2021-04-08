import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import SearchAppBar from "./components/appBar";
import HomePage from "./pages/Home";
import AdminPage from "./pages/Admin";
import LoginPage from './pages/Login';
import CheckOut from "./components/Checkout/checkout";
import Link from '@material-ui/core/Link';
import { ToastContainer, toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

import "./App.css";
import "./css/media-queries.css";
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  loginCtr: {
    margin: 'auto',
  }
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

  //#region auth Functions
  const loginSuccess = res => {
    // axios.post('https://lydias-kitchen.herokuapp.com/3/login', {
      axios.post('http://localhost:4000/3/login', {
      headers: {
        Authorization: `Bearer ${res.tokenId}`
      }
    })
      .then(res => {
        if (res.data.isLoggedIn) {
          setIsLoggedIn(true);
          document.cookie = `DixieChicks=true;max-age=${(res.data.wishyWashy * 60)};path=/3`;
        } else {
          setIsLoggedIn(false);
          toast.error(`${res.data.msg}`, {
            position: toast.POSITION.TOP_CENTER
          });
        }
      });
  };

  const loginFailure = res => {
    toast.error(`[Login Failure]: ${res.error}`, {
      position: toast.POSITION.TOP_CENTER
    });
  };
  //#endregion

  const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //render

  useEffect(() => {
    if(getCookie('DixieChicks') !== null && getCookie('DixieChicks') !== '' && getCookie('DixieChicks') === 'true'){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
        isLoggedIn={isLoggedIn}
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
          render={props => isLoggedIn ? <AdminPage /> : <LoginPage className={classes.loginCtr} loginSuccess={loginSuccess} loginFailure={loginFailure} />}
        />
        <Route
          path="/3/uploadImages"
          exact
        >
          <Redirect to='/3' />
          </Route>
      </Switch>
      <footer className={classes.footer}>
        <Copyright />
        <CpCodes />
      </footer>
    </BrowserRouter>
  );
}

export default App;
