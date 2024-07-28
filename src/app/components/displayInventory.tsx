"use client";

import { useState } from "react";
import Inventory from "../../../entities/inventory";

const DisplayInventory = () => {
  const [init_inventory, set_init_inventory] = useState(new Inventory());
  const [displayInvent, setDisplayInvent] = useState(
    init_inventory.getCurrentItems()
  );

  function giveBall() {
    init_inventory.addItem({
      id: Number((Math.random() * 100).toFixed()),
      name: "Ball",
      count: 2,
    });
    set_init_inventory(init_inventory);
    setDisplayInvent([...init_inventory.getCurrentItems()]);
  }

  return (
    <div>
      <h3>Displaying Inventory</h3>
      <div>{JSON.stringify(displayInvent)}</div>
      <button
        onClick={() => {
          console.log("Add another ball");
          giveBall();
          
        }}
        className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition-colors"
      >
        Get a ball
      </button>
    </div>
  );
};

export default DisplayInventory;
