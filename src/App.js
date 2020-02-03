import React from "react";
import "./App.scss";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import Shop from "./Components/Shop";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
