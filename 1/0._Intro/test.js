/**
 * reccomended use such that no varisnble declaration is wrong
 */

"use strict";

const name = 0;
let msg = "Hello ";

function greet(firstName) {
    try {
        if (typeof firstName == typeof "")
            console.log("Hello " + firstName);
        else
            throw new TypeError(firstName + " is not string!");
    } catch (error) {
        console.log("Cannot greet", firstName, error);
    }
}

greet(name);

/**
 * don't use var in for loop
 */

for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
