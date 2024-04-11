import { v4 as uuidv4 } from "uuid";

// Types

type Item = {
    readonly id: string,
    name: string,
    price: number,
    description: string
}

type User = {
    readonly id?: string,
    name: string,
    age: number,
    cart: Item[]
}

function createUser(name:string, age:number): User {
    const id: string = uuidv4()
    const userName: string = name
    const userAge: number = age
    let cart: Item[] = []
    return {
        id,
        name: userName,
        age: userAge,
        cart
    };
}


function createItem(name:string, price:number, description:string): Item {
    const id: string = uuidv4()
    const itemName: string = name
    const itemPrice: number = price
    const itemDescription: string = description
    return {
        id, 
        name: itemName,
        price: itemPrice,
        description: itemDescription
    };
}


function addToCart(user:User, item:Item): void {
    user.cart.push(item);
}

function removeFromCart(user:User, item:Item): void {
    if (user.cart.includes(item)) {
        user.cart = user.cart.filter(cartItem => cartItem !== item);
    } else {
        console.log(`Item ${item.name} not in the cart!`)
    }
}


function removeQuantityFromCart(user: User, item: Item, quantityToRemove: number): void {
    let removedQuantity = 0;
    let itemFound = false;

    for (let i = 0; i < user.cart.length; i++) {
        const currentItem = user.cart[i];
        if (currentItem === item) {
            itemFound = true;
            if (removedQuantity < quantityToRemove) {
                user.cart.splice(i, 1);
                removedQuantity++;
                i--; // Adjust the index after removing an item
            } else {
                break; // Stop iterating if the specified quantity has been removed
            }
        }
    }

    if (!itemFound) {
        console.log(`Error: The item (${item.name}) is not in the cart.`);
    } else if (removedQuantity < quantityToRemove) {
        console.log(`Error: Quantity to remove (${quantityToRemove}) exceeds the quantity of ${item.name} in the cart.`);
    }
}




function cartTotal(user:User): number {
    let totalPrice = 0;
    for (let item of user.cart) {
        totalPrice += item.price;
    }
    return totalPrice;
}

function printCart(user:User): void {
    for (let item of user.cart) {
        console.log(item);
    };
}

// Example usage
// Create a User
const user = createUser("John Doe", 30);

// Create Items
const itemA = createItem("Item A", 10, "Description of Item A");
const itemB = createItem("Item B", 20, "Description of Item B");
const itemC = createItem("Item C", 15, "Description of Item C");

// Add Item A to the user's cart
addToCart(user, itemA);

// Print the contents of the user's cart
printCart(user);

// Print the total of the user's cart
console.log("Total cart value: $" + cartTotal(user));

// Create 3 Item B and add them to the user's cart
for (let i = 0; i < 3; i++) {
    addToCart(user, itemB);
}

// Print the contents of the user's cart
console.log("\nAfter adding 3 Item B to the user's cart:");
printCart(user);

// Print the total of the user's cart
console.log("Total cart value: $" + cartTotal(user));

// Create 3 Item C and add them to the user's cart
for (let i = 0; i < 3; i++) {
    addToCart(user, itemC);
}

// Print the contents of the user's cart
console.log("\nAfter adding 3 Item C to the user's cart:");
printCart(user);

// Print the total of the user's cart
console.log("Total cart value: $" + cartTotal(user));

// Remove all of Item B from the user's cart
removeFromCart(user, itemB)

// Print the contents of the user's cart
console.log("\nAfter removing all of Item B from the user's cart:");
printCart(user);

// Print the total of the user's cart
console.log(`Total cart value: $${cartTotal(user)}`);

// Remove 2 of Item C from the user's cart using the removeQuantityFromCart function
removeQuantityFromCart(user, itemC, 2);

// Print the contents of the user's cart
console.log("\nAfter removing 2 of Item C from the user's cart:");
printCart(user);

// Print the total of the user's cart
console.log(`Total cart value: $${cartTotal(user)}`);
