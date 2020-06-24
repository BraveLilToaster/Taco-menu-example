import React from "react";
import { OrderItemComponentInterface } from "../types/OrderItemComponentInterface";

const OrderItem = ({ name, quantity, price }: OrderItemComponentInterface) => {
  return (
    <div className="order-item">
      <h3>
        {name}
        <span className="order-item-quantity"> x {quantity}</span>
      </h3>
      <p>${quantity * price}</p>
    </div>
  );
};

export default OrderItem;
