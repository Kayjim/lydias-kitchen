import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchAppBar from "./components/appBar";
import HomePage from './pages/Home';
import CookiesPage from './pages/Cookies';
import AdminPage from './pages/Admin';
import CheckOut from './components/Checkout/checkout'

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <SearchAppBar></SearchAppBar>
      <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/cookies" component={CookiesPage} />
      <Route path="/cakes" component={CookiesPage} />
      <Route path="/foodprep" component={CookiesPage} />
      <Route path="/order" component={CheckOut} />
      <Route path="/feedback" component={CookiesPage} />
      <Route path='/3' component={AdminPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
