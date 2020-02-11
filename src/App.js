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
import Register from "./Components/Register";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/commande" component={Cart} />
          <Route exact path="/details/:id" component={ProductDetails} />
          {/* <Route
            exact
            path="/paiement"
            render={props => <Checkout {...props} user={userState.user} />}
          /> */}
          <Route path="/connexion" component={Login} />
          <Route path="/inscription" component={Register} />
          <ProtectedRoute path="/mon-compte" component={Dashboard} />
          <ProtectedRoute path="/paiement" component={Checkout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
