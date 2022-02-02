// --------------------------------------
// Arrays, for loops
// --------------------------------------
console.log("// Exercise 1 - Array Positioning");

const letters = ["a", "b", "c"];
// show b in the console

console.log(letters[1]);
// --------------------------------------
console.log("// Exercise 2 - Array Positioning");

const friends = [];

// What a lonely array. Add at least 3 friend objects to it.

console.log("Array length: ", friends.push("Friend1"), " elements");
console.log("Array length: ", friends.push("Friend2"), " elements");
console.log("Array length: ", friends.push("Friend3"), " elements");

// --------------------------------------
console.log("// Exercise 3 - Get the index of first occurrence of that value.");

const significantMathNumbers = [0, 2.718, 3.14159, 1729];

// You want to programmatically find where the number 1729 is in the array.
// programmatically means that no finger counting allowed. There is a method for this (finding index based of value).

function findElementPosition(element) {
    if (significantMathNumbers.includes(element))
        return significantMathNumbers.indexOf(element);
    else
        return -1;
}

console.log(findElementPosition(1729));

// --------------------------------------
console.log("// Exercise 4 - Inserting elements");

const diet = ["tomato", "cucumber", "rocket"];

// You are a programmer. In one line (one statement) insert hamburger, soda and pizza between the elements cucumber and rocket

console.log(diet);
diet.push("hamburger", "soda", "pizza", diet.pop());
console.log(diet);

// --------------------------------------
console.log("// Exercise 5 - Remove element");

// Remove the LAST element of the array.
// Don't remove by index. You know in advance that it's the last in the array because you are too full already.

diet.pop();
console.log(diet);

// --------------------------------------
console.log("// Exercise 6 - Copy array");

// You really like your daily diet from last exercise. Copy it to a new array called dinnerTray so you can give it to a friend.

const dinnerTray = diet;
console.log(dinnerTray);

// --------------------------------------
console.log("// Exercise 7 - For loop");

const lettersExpanded = ["a", "b", "c", "d", "e", "f", "g", "h"];

// log every second char in the array starting from b

lettersExpanded.forEach((v, i, a) => {
    if (i >= a.indexOf("b") && (i - a.indexOf("b")) % 2 == 0)
        console.log(v);
});

// --------------------------------------
console.log("// Exercise 8 - For loop and if statement")

const numbers = [5, 3, 2, 7, 11, 12, 0, -20, 6];

const discardedNumbers = [];

// log the element if the number is above 6 or below 0
// else push them to the array discardedNumbers

let i = 0;
while (i < numbers.length) {
    if (numbers[i] > 6 || numbers[i] < 0) {
        console.log(numbers[i]);
        i++;
    }
    else {
        discardedNumbers.push(numbers.splice(i, 1));
    }
}
console.log(discardedNumbers);

// --------------------------------------
