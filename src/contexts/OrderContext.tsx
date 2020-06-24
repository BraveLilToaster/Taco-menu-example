import React, { createContext, useState, useEffect } from "react";
import { MenuItemInterface } from "../types/MenuItemInterface";
import { OrderItemInterface } from "../types/OrderItemInterface";
import { OrderContextInterface } from "../types/OrderContextIterface";

const OrderContext = createContext<OrderContextInterface>({
  order: [],
  discount: 0,
  total: 0,
  addToOrder: () => {},
});

const OrderProvider: React.FC = ({ children }) => {
  const [order, setOrder] = useState<OrderItemInterface[]>([]);

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const addToOrder = (item: MenuItemInterface) => {
    const isInOrder: boolean = order.some(
      (orderItem: OrderItemInterface) => orderItem.id === item.id
    );
    if (isInOrder) {
      const updatedOrder = order.map((orderItem) => {
        if (orderItem.id === item.id) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        }
        return orderItem;
      });
      setOrder(updatedOrder);
    } else {
      setOrder([...order, { quantity: 1, ...item }]);
    }
  };

  useEffect(() => {
    const newTotal = order.reduce(
      (
        previousValue: number,
        {
          price,
          quantity,
          discount_percent,
          discount_threshold,
        }: OrderItemInterface
      ): number => {
        // calculate item price with discount
        let itemPrice = price * quantity;
        let itemDiscount = 0;

        if (quantity >= discount_threshold) {
          itemDiscount = itemPrice * (discount_percent / 100);
          itemPrice = itemPrice - itemDiscount;
        }

        return previousValue + itemPrice;
      },
      0
    );
    setTotal(newTotal);
  }, [order, discount]);

  return (
    <OrderContext.Provider value={{ order, total, discount, addToOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider };

export default OrderContext;
