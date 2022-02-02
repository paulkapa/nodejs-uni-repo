// --------------------------------------
// Objects
// --------------------------------------
console.log("// Exercise 1 - Retrieve value from object by key");

const alienMessage = {
    message: "Hello, earthling! I bring peace."
};

// Log the message

console.log(alienMessage.message);

// --------------------------------------
console.log("// Exercise 2 - Defining an object.");

// Create an object that has your name and age.

const person = {
    name: "Paul",
    age: 22
}
console.log(person);

// --------------------------------------
console.log("// Exercise 3 - Add a property");

const stackOverflow = {};

// make a rule called isAllowed and let the value be true

stackOverflow.isAllowed = true;

console.log(stackOverflow);

// --------------------------------------
// Exercise 4 - Remove a property

const thisSong = {
    description: "The best song in the world."
}

// remove the property "description" and add a property called "about" that should say "Just a tribute."

console.log(thisSong);
thisSong.description = null; // OR ? thisSong = null;
thisSong.about = "Just a tribute";
console.log(thisSong);

// --------------------------------------
