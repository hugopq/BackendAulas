const array = [];

array.push(() => console.log("Hello world 1"));
array.push(() => console.log("Hello world 2"));
array.push(() => console.log("Hello world 3"));

for (let i = 0; i < array.length; i++) {
    array[i]();    
}

array.forEach(element => {
    element();
});