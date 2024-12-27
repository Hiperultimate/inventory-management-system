type IItem = {
  id: number; // Unique identifier required for all objects
  [key: string]: any;
};

type IInvItem = {
  stackAmount: number; // Number of the same item on this slot
} & IItem;

class InventorySystem {
  private totalSize: number;
  private slotStackSize: number;
  private inventory: (IInvItem | undefined)[];

  constructor(
    totalSize: number = 30,
    slotStackSize: number = 64
    // inventory: IInvItem[] = []   // Create load existing inventory functionality later on
  ) {
    this.totalSize = totalSize;
    this.slotStackSize = slotStackSize;

    this.inventory = new Array(totalSize);
    this.inventory.fill(undefined);
  }

  getInventorySize(): number {
    return this.totalSize;
  }

  getStackSize(): number {
    return this.slotStackSize;
  }

  getInventory() {
    return this.inventory;
  }

  isSpaceEmpty(position: number) {
    if (this.inventory[position] && this.inventory[position].id !== undefined) {
      return false;
    }
    return true;
  }

  getNearestEmptySlot(): number{
    for(let i = 0 ; i < this.totalSize; i++){
      if(this.inventory[i] === undefined) return i;
    }
    return -1;
  }

  // get total number of filled slots inside the inventory
  getCurrentlyFilledSlots() {
    let filledSlots = 0;
    for(let i = 0; i < this.totalSize; i++){
      if(this.inventory[i]) filledSlots++;
    }
    return filledSlots;
  }

  // get starting three items in the inventory
  getTopInventoryItems(topItemAmount: number) {
    if (topItemAmount > this.totalSize) {
      throw new Error(`Received a number which exceeds total inventory size`);
    }
    return this.inventory.slice(0, topItemAmount);
  }

  removeItemFromPosition(itemPosition: number) {
    if (itemPosition < 0 || itemPosition > this.totalSize) {
      throw new Error(
        `Invalid position received, inventory position is from ${0}-${
          this.totalSize
        }. Received ${itemPosition}`
      );
    }
  }

  // remove item from the inventory
  removeItemFromPositionByAmount(
    itemPosition: number,
    amount: number = 1
  ): number {
    if (itemPosition < 0 || itemPosition > this.totalSize) {
      throw new Error(
        `Invalid position received, inventory position is from ${0}-${
          this.totalSize
        }. Received ${itemPosition}`
      );
    }

    if (this.isSpaceEmpty(itemPosition)) {
      // Slot already empty
      return itemPosition;
    }

    if (
      this.inventory[itemPosition] &&
      (this.inventory[itemPosition].slotStackSize === 1 ||
        this.inventory[itemPosition].slotStackSize <= amount)
    ) {
      this.inventory[itemPosition] = undefined;
      return itemPosition;
    }

    if (this.inventory[itemPosition] === undefined) {
      return itemPosition;
    }

    this.inventory[itemPosition].slotStackSize -= amount;
    return itemPosition;
  }

  // add item to the inventory
  addItem(itemObject: IItem, amount: number = 1) {
    if (amount > this.slotStackSize) {
      throw new Error(
        `Stack limit exceeded, currently set to ${this.slotStackSize}`
      );
    }

    const newInventoryItem = {
      ...itemObject,
      stackAmount: amount,
    };

    const positionToAdd = this.getNearestEmptySlot();

    if(positionToAdd === -1){
      throw new Error("Inventory is currently full");
    }

    this.inventory[positionToAdd] = newInventoryItem;
  }

  // add item to specific position
}

export default InventorySystem;
