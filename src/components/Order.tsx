import React, { useContext } from "react";
import OrderContext from "../contexts/OrderContext";
import OrderItem from "./OrderItem";

const Order = () => {
  const { order, total, discount, submitOrder } = useContext(OrderContext);

  return (
    <>
      <div>
        <h2 className="order-heading">Order Details</h2>
        <div className="order-list">
          {order.map(({ name, id, quantity, price }) => (
            <OrderItem key={id} name={name} price={price} quantity={quantity} />
          ))}
        </div>
      </div>
      <div>
        <p>Subtotal: ${total.toFixed(2)}</p>
        <p>Discount: ${discount.toFixed(2)}</p>
        <h2>Total: ${(total - discount).toFixed(2)}</h2>
        <button
          className="order-submit button-primary--large"
          onClick={submitOrder}
        >
          Submit Order
        </button>
      </div>
    </>
  );
};

export default Order;
