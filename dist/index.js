"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function createUser(name, age) {
    const id = (0, uuid_1.v4)();
    const userName = name;
    const userAge = age;
    let cart = [];
    return {
        id,
        name: userName,
        age: userAge,
        cart
    };
}
function createItem(name, price, description) {
    const id = (0, uuid_1.v4)();
    const itemName = name;
    const itemPrice = price;
    const itemDescription = description;
    return {
        id,
        name: itemName,
        price: itemPrice,
        description: itemDescription
    };
}
function addToCart(user, item) {
    user.cart.push(item);
}
function removeFromCart(user, item) {
    if (user.cart.includes(item)) {
        user.cart = user.cart.filter(cartItem => cartItem !== item);
    }
    else {
        console.log(`Item ${item.name} not in the cart!`);
    }
}
function removeQuantityFromCart(user, item, quantityToRemove) {
    let removedQuantity = 0;
    let itemFound = false;
    for (let i = 0; i < user.cart.length; i++) {
        const currentItem = user.cart[i];
        if (currentItem === item) {
            itemFound = true;
            if (removedQuantity < quantityToRemove) {
                user.cart.splice(i, 1);
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
function cartTotal(user) {
    let totalPrice = 0;
    for (let item of user.cart) {
        totalPrice += item.price;
    }
    return totalPrice;
}
function printCart(user) {
    for (let item of user.cart) {
        console.log(item);
    }
    ;
}
const user = createUser("John Doe", 30);
const itemA = createItem("Item A", 10, "Description of Item A");
const itemB = createItem("Item B", 20, "Description of Item B");
const itemC = createItem("Item C", 15, "Description of Item C");
addToCart(user, itemA);
printCart(user);
console.log("Total cart value: $" + cartTotal(user));
for (let i = 0; i < 3; i++) {
    addToCart(user, itemB);
}
console.log("\nAfter adding 3 Item B to the user's cart:");
printCart(user);
console.log("Total cart value: $" + cartTotal(user));
for (let i = 0; i < 3; i++) {
    addToCart(user, itemC);
}
console.log("\nAfter adding 3 Item C to the user's cart:");
printCart(user);
console.log("Total cart value: $" + cartTotal(user));
removeFromCart(user, itemB);
console.log("\nAfter removing all of Item B from the user's cart:");
printCart(user);
console.log(`Total cart value: $${cartTotal(user)}`);
removeQuantityFromCart(user, itemC, 2);
console.log("\nAfter removing 2 of Item C from the user's cart:");
printCart(user);
console.log(`Total cart value: $${cartTotal(user)}`);
//# sourceMappingURL=index.js.map