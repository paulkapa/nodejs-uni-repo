function doingSomething(anyFunctionReference, name) {
    // a lot of things can happen here first...
    return anyFunctionReference(name);
}

const running = name => `${name} is running`;

const result = doingSomething(running, "Paul");

console.log(result)

// call two functions

const drinking = name => `${name} is drinking`;
const hidding = name => `${name} is hidding`;

console.log(`${doingSomething(drinking, "Paul")} and ${doingSomething(hidding, "Paul")}`);
