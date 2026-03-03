let andre = {
    name: "André Esteves",
    age: 27,
    gender: "M",
}

let str = JSON.stringify(andre);

console.log(str);
console.log(andre);

let newStr = '{"name":"Joana Fagundes","age":29,"gender":"F"}';

joana = JSON.parse(newStr);

console.log(newStr);
console.log(joana);