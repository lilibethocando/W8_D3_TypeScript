"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Item {
    constructor(name, price, description) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._price = price;
        this._description = description;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get description() {
        return this._description;
    }
    set name(name) {
        this._name = name;
    }
    set price(price) {
        this._price = price;
    }
    set description(description) {
        this._description = description;
    }
}
class User {
    constructor(name, age, cart = []) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._age = age;
        this._cart = cart;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get age() {
        return this._age;
    }
    get cart() {
        return this._cart;
    }
    set name(name) {
        this._name = name;
    }
    set age(age) {
        this._age = age;
    }
    set cart(cart) {
        this._cart = cart;
    }
    addToCart(item) {
        this.cart.push(item);
    }
    removeFromCart(item) {
        if (this.cart.includes(item)) {
            this.cart = this.cart.filter((cartItem) => cartItem !== item);
        }
        else {
            console.log(`Item ${item.name} not in the cart!`);
        }
    }
    removeQuantityFromCart(item, quantityToRemove) {
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
                }
                else {
                    break;
                }
            }
        }
        if (!itemFound) {
            console.log(`Error: The item (${item.name}) is not in the cart.`);
        }
        else if (removedQuantity < quantityToRemove) {
            console.log(`Error: Quantity to remove (${quantityToRemove}) exceeds the quantity of ${item.name} in the cart.`);
        }
    }
    cartTotal() {
        let totalPrice = 0;
        for (let item of this.cart) {
            totalPrice += item.price;
        }
        return totalPrice;
    }
    printCart() {
        console.log("Items in the cart:");
        for (let item of this.cart) {
            console.log(item);
        }
    }
}
class Shop {
    constructor(name, items = []) {
        this._name = name;
        const itemA = new Item("Item A", 10, "Description of Item A");
        const itemB = new Item("Item B", 20, "Description of Item B");
        const itemC = new Item("Item C", 15, "Description of Item C");
        this._items = [itemA, itemB, itemC, ...items];
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = items;
    }
    describe() {
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
//# sourceMappingURL=index.js.map