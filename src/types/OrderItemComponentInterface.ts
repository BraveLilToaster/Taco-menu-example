import { MenuItemComponentInterface } from "./MenuItemComponentInterface";

export interface OrderItemComponentInterface
  extends MenuItemComponentInterface {
  quantity: number;
}
