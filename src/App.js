import React from "react";
import "./App.scss";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import Shop from "./Components/Shop";
import ProductDetails from "./Components/products/ProductDetails";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/Utils/ProtectedRoute";
import Dashboard from "./Components/Dashboard";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/details/:id" component={ProductDetails} />
          <Route exact path="/paiement" component={Checkout} />
          <Route path="/connexion" component={Login} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
