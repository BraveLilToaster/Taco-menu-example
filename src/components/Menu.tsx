import React from "react";
import { useQuery } from "react-query";
import MenuItem from "./MenuItem";
import { MenuItemInterface } from "../types/MenuItemInterface";

const Menu = () => {
  const fetchMenu = () =>
    fetch(
      `https://virtserver.swaggerhub.com/Detroit_Labs/Taco_Truck/1.0.0/menu`
    ).then((res) => res.json());

  const { status, data, error } = useQuery(`menu`, fetchMenu);

  if (status === "loading") {
    return <p>loading...</p>;
  }

  if (error) {
    return (
      <>
        <p>Uh oh, something went wrong.</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </>
    );
  }

  return (
    <>
      <h1>Menu</h1>
      <ul className="menu-list">
        {data.map(({ id, price, name, ...rest }: MenuItemInterface) => (
          <MenuItem
            key={id}
            name={name}
            price={price}
            data={{ id, name, price, ...rest }}
          />
        ))}
      </ul>
    </>
  );
};

export default Menu;
