import React, { useContext } from "react";
import OrderContext from "../contexts/OrderContext";
import { MenuItemInterface } from "../types/MenuItemInterface";

type Props = {
  price: number;
  name: string;
  data: MenuItemInterface;
};

const MenuItem = ({ price, name, data }: Props) => {
  const context = useContext(OrderContext);
  return (
    <div className="menu-item">
      <h2>{name}</h2>
      <p>$ {price}</p>
      <button onClick={() => context?.addToOrder(data)}>Add to Cart</button>
    </div>
  );
};

export default MenuItem;
