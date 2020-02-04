import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchAppBar from "./components/appBar";
import HomePage from './pages/Home';
import CookiesPage from './pages/Cookies';


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
      <Route path="/order" component={CookiesPage} />
      <Route path="/feedback" component={CookiesPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
