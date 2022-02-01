const name = 0;
let msg = "Hello ";

function greet(firstName) {
    try {
        if (typeof firstName == typeof "")
            console.log("Hello " + firstName);
        else
            throw new TypeError("Type is not string!");
    } catch (error) { console.log("Cannot greet -", error) }
}

greet(name);
