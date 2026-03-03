function Person(first, last){
    this.firstname = first;
    this.lastname = last;
}

Person.prototype.greet = function(){
    // console.log("Hello " + this.firstname + " " + this.lastname);
    console.log(`Hello ${this.firstname} ${this.lastname} (${this.age})`);
}

joao = new Person("joao", "mateus");
francisco = new Person("francisco", "alves");

Person.prototype.age = 30;
joao.age = 25;

joao.greet();
francisco.greet();

console.log(joao.__proto__);
console.log(francisco.__proto__);