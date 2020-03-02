import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchAppBar from "./components/AppBar";
import HomePage from './pages/Home';
import CookiesPage from './pages/Cookies';
<<<<<<< HEAD
import AdminPage from './pages/Admin';


=======
>>>>>>> c27dd4ef458425781bf7f2d4e8fa44d477749553
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
      <Route path='/3' component={AdminPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
