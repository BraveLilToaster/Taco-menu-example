import { MenuItemInterface } from "./MenuItemInterface";
import { OrderItemInterface } from "./OrderItemInterface";

export interface OrderContextInterface {
  order: OrderItemInterface[];
  total: number;
  discount: number;
  addToOrder: (item: MenuItemInterface) => void;
  submitOrder: () => void;
}
