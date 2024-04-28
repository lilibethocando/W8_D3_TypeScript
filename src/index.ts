import { v4 as uuidv4 } from 'uuid';

class Item {
    constructor(
        private _id: string = uuidv4(),
        private _name: string,
        private _price: number,
        private _description: string
    ) {}

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
}

class Shop {
    private items: Item[] = [];

    addItem(item: Item): void {
        this.items.push(item);
    }

    showItems(): void {
        this.items.forEach(item => {
            console.log(`Item: ${item.name}, Price: $${item.price}`);
        });
    }
}

class User {
    constructor(
        private _id: string = uuidv4(),
        private _name: string,
        private _age: number,
        public cart: Item[] = []
    ) {}

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }
}

class Cart {
    private items: Item[] = [];
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    addItem(item: Item): void {
        this.items.push(item);
    }

    showCart(): void {
        console.log(`User: ${this.user.name}'s Cart`);
        this.items.forEach(item => {
            console.log(`Item: ${item.name}, Price: $${item.price}`);
        });
    }

    checkout(): void {
        let total = 0;
        this.items.forEach(item => {
            total += item.price;
        });
        console.log(`Total: $${total.toFixed(2)}`);
    }
}

// Helper functions

function addToCart(user: User, item: Item): void {
    user.cart.push(item);
}

function removeFromCart(user: User, item: Item): void {
    const index = user.cart.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
        user.cart.splice(index, 1);
    } else {
        console.log(`Item ${item.name} not in the cart!`);
    }
}

function removeQuantityFromCart(
    user: User,
    item: Item,
    quantityToRemove: number
): void {
    for (let i = 0; i < quantityToRemove; i++) {
        removeFromCart(user, item);
    }
}

function cartTotal(user: User): number {
    return user.cart.reduce((total, item) => total + item.price, 0);
}

function printCart(user: User): void {
    user.cart.forEach(item => console.log(item));
}

// Example usage:

const user = new User(uuidv4(), 'John', 30);
const cart = new Cart(user);

const item1 = new Item(undefined, 'Product A', 10, 'Description A');
const item2 = new Item(undefined, 'Product B', 20, 'Description B');

cart.addItem(item1);
cart.addItem(item2);

cart.showCart();
cart.checkout();
