import { v4 as uuidv4 } from "uuid";

class Item {
    private _id: string;
    private _name: string;
    private _price: number;
    private _description: string;

    constructor(name: string, price: number, description: string) {
        this._id = uuidv4();
        this._name = name;
        this._price = price;
        this._description = description;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get description(): string {
        return this._description;
    }

    set name(name: string) {
        this._name = name;
    }

    set price(price: number) {
        this._price = price;
    }

    set description(description: string) {
        this._description = description;
    }
}

class User {
    private _id: string;
    private _name: string;
    private _age: number;
    private _cart: Item[];

    constructor(name: string, age: number, cart: Item[] = []) {
        this._id = uuidv4();
        this._name = name;
        this._age = age;
        this._cart = cart;
    }


    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    get cart(): Item[] {
        return this._cart;
    }


    set name(name: string) {
        this._name = name;
    }

    set age(age: number) {
        this._age = age;
    }

    set cart(cart: Item[]) {
        this._cart = cart;
    }


    addToCart(item: Item): void {
        this.cart.push(item);
    }


    removeFromCart(item: Item): void {
        if (this.cart.includes(item)) {
            this.cart = this.cart.filter((cartItem) => cartItem !== item);
        } else {
            console.log(`Item ${item.name} not in the cart!`);
        }
    }

    removeQuantityFromCart(item: Item, quantityToRemove: number): void {
        let removedQuantity = 0;
        let itemFound = false;

        for (let i = 0; i < this.cart.length; i++) {
            const currentItem = this.cart[i];
            if (currentItem === item) {
                itemFound = true;
                if (removedQuantity < quantityToRemove) {
                    this.cart.splice(i, 1);
                    removedQuantity++;
                    i--;
                } else {
                    break;
                }
            }
        }

        if (!itemFound) {
            console.log(`Error: The item (${item.name}) is not in the cart.`);
        } else if (removedQuantity < quantityToRemove) {
            console.log(
                `Error: Quantity to remove (${quantityToRemove}) exceeds the quantity of ${item.name} in the cart.`
            );
        }
    }

    cartTotal(): number {
        let totalPrice = 0;
        for (let item of this.cart) {
            totalPrice += item.price;
        }
        return totalPrice;
    }

    printCart(): void {
        console.log("Items in the cart:");
        for (let item of this.cart) {
            console.log(item);
        }
    }
}


class Shop {
    private _name: string;
    private _items: Item[];

    constructor(name: string, items: Item[] = []) {
        this._name = name;
        
        const itemA = new Item("Item A", 10, "Description of Item A");
        const itemB = new Item("Item B", 20, "Description of Item B");
        const itemC = new Item("Item C", 15, "Description of Item C");

        this._items = [itemA, itemB, itemC, ...items];
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get items(): Item[] {
        return this._items;
    }

    set items(items: Item[]) {
        this._items = items;
    }

    describe(): void {
        console.log(`Shop Name: ${this._name}`);
        console.log("Items in the shop:");
        this._items.forEach(item => {
            console.log(`- ${item.name}: $${item.price}`);
        });
    }
}


const shop = new Shop("My Shop");

const user = new User("John Doe", 30);

user.addToCart(shop.items[0]); 
user.addToCart(shop.items[1]); 
user.addToCart(shop.items[1]); 
user.addToCart(shop.items[2]); 

user.printCart();


user.removeFromCart(shop.items[1]);

user.printCart();

user.removeQuantityFromCart(shop.items[2], 1); 

user.printCart();

console.log("Cart total:", user.cartTotal());
