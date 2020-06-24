import React from "react";
import { OrderProvider } from "./contexts/OrderContext";
import Menu from "./components/Menu";
import Order from "./components/Order";
import "./App.css";

function App() {
  return (
    <OrderProvider>
      <div className="layout">
        <div className="menu-section">
          <Menu />
        </div>
        <div className="order-section">
          <Order />
        </div>
      </div>
    </OrderProvider>
  );
}

export default App;
