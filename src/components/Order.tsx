import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import OrderContext from "../contexts/OrderContext";
import OrderItem from "./OrderItem";
import { OrderItemInterface } from "../types/OrderItemInterface";

interface OrderPostInterface {
  customerName: string;
  totalPrice: number;
  orders: OrderItemInterface[];
}

const Order = () => {
  const { order, total, discount } = useContext(OrderContext);
  const [customerName, setCustomerName] = useState("");

  const postOrder = ({
    customerName,
    totalPrice,
    orders,
  }: OrderPostInterface) =>
    fetch(
      `https://virtserver.swaggerhub.com/Detroit_Labs/Taco_Truck/1.0.0/order`,
      {
        method: `POST`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerName, totalPrice, orders }),
      }
    );

  const [mutate] = useMutation(postOrder);

  const onSubmitOrder = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      await mutate({
        customerName: customerName,
        totalPrice: total,
        orders: order,
      });
    } catch (error) {
      console.error(error);
    }
  };

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

        <form onSubmit={onSubmitOrder}>
          <input
            value={customerName}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCustomerName(e.target.value)
            }
            name="customerName"
            placeholder="Add Name to Order"
          />
          <button className="order-submit button-primary--large" type="submit">
            Submit Order
          </button>
        </form>
      </div>
    </>
  );
};

export default Order;
