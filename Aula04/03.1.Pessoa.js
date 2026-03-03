class Pessoa{

    constructor(fist, last){
        this.firstname = fist;
        this.lastname = last;        
    }
    
    greet() {
    console.log("Hello " 
        + this.firstname + " " + this.lastname);
    }
}

let joao = new Pessoa("joão", "Gomes");
let maria = new Pessoa("maria", "Silva");

joao.greet();
maria.greet()

console.log(joao.__proto__ == maria.__proto__);
console.log(maria.__proto__);