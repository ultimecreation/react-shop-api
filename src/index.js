import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ProductProvider } from "./Context/ProductContext";
import { CartProvider } from "./Context/CartContext";
import { UserProvider, UserConsumer } from "./Context/UserContext";

ReactDOM.render(
  <UserProvider>
    <UserConsumer>
      {userState => (
        <CartProvider>
          <ProductProvider>
            <App userState={userState} />
          </ProductProvider>
        </CartProvider>
      )}
    </UserConsumer>
  </UserProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
