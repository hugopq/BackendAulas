function Pessoa(first, last){
    this.firstname = first;
    this.lastname = last;
}

Pessoa.prototype.nomeCompleto = (titulo ) => {
        return titulo + ": " 
            + this.firstname + " " 
            + this.lastname;
    }

let joao = new Pessoa("João","Gomes");
let maria = new Pessoa("Maria","Mendes");


ana = {};
ana.firstname = "Ana";
ana.lastname= "Fernandes";
ana.nomeCompleto = function(titulo){
        return titulo + ": " 
            + this.firstname + " " 
            + this.lastname;
    }

console.log(joao.nomeCompleto())
console.log(ana.nomeCompleto());
console.log(maria.nomeCompleto());
