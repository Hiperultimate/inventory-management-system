// Temporary Item class
type Item = {
    id: number,
    name: string,
    count: number,
};

class Inventory {
    private size: number;
    private item_slots : Item[];

    constructor(size : number = 64, item_slots : Item[] = []){
        this.size = size;
        this.item_slots = item_slots;

    }

    addItem(item: Item) : void {
        if(this.item_slots.length <= this.size){
            throw new Error("Inventory full");
        }

        this.item_slots.push(item);
    }

    removeItem(item: Item): void {
        if(item.count > 1){
            item.count -= 1;
        }
        
    }
}

export default Inventory;