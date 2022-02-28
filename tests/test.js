const variable = { "key": "value", "key1": "value1" };
console.log(variable);
const variable2 = { "key": "new-value" };
console.log(variable2);

console.log({ ...variable, ...variable2 });
