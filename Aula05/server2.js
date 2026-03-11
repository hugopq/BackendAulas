// import 
const express = require('express'); //express
const fs = require('fs');           //filesystem
// criar a minha app
const app = express();
// definir a porta
const port = 3000;
const file = "persons.json";

// guardar pessoas em memória (variável global)
// let pessoas = null;
// let lastId = 0;

// função para ler o ficheiro
function lerPessoas(){
    let dados = fs.readFileSync(file, "utf8");
    return JSON.parse(dados).Data;
}

function guardarPessoas(dados){
  let dadosEscrita = {Data: dados};
  fs.writeFileSync(file, JSON.stringify(dadosEscrita));
}

// middleware
app.use(express.json()); // middleware para fazer parse do body JSON

// rotas
// primeira rota
app.get('/', (req, res) => {
  res.send("Hello World");
});

//  /users      GET     empty         Show list of all the persons.
app.get('/users', (req, res) => {
  let pessoas = lerPessoas();
  res.send(pessoas);
});

//  /users      POST    JSON String   Add details of new person. 
app.post('/users', (req, res) => {
  let pessoas = lerPessoas();
  //required
    const { firstname, lastname, gender, age, profession } = req.body;

    // validação
    if (!firstname || !lastname || !gender || !age || !profession) {
      res.status(400).send("Erro: O pedido não está no formato correto");
    }
    lastId++;
    pessoas.push({ id: lastId, firstname, lastname, gender, age, profession });

    guardarPessoas(pessoas);
    res.send(pessoas);
});

//  /users/:id  DELETE  empty         Delete an existing person.
app.delete('/users/:id', (req, res) => {
  let pessoas = lerPessoas();
  const id = Number(req.params.id);

  // filtrar pessoas com id diferente do pedido
  const pessoas2 = pessoas.filter(p => p.id !== id);

  // verificar se alguma foi eliminada
  if(pessoas2.length === pessoas.length){
    res.status(400).send("Erro: A pessoas indicada não existe");  
  }
  else{
    // pessoas = pessoas2;
    guardarPessoas(pessoas2);
    res.send(pessoas2);
  }
});

//  /users/:id  GET     empty         Show details of a person.
app.get('/users/:id', (req, res) => {
  let pessoas = lerPessoas();
  const id = Number(req.params.id);
  let pessoa = pessoas.filter(p => p.id === id)[0];

  if(pessoa === undefined){
    res.status(400).send("Erro: A pessoas indicada não existe");  
  }
  else{
    res.send(pessoa);
  }
});
//  /users/:id  PUT     JSON String   Update details of a person.
app.put('/users/:id',(req, res) => {
  let pessoas = lerPessoas();
  const id = Number(req.params.id);

  // ir buscar a pessoa pelo id
  const pessoa = pessoas.filter(p => p.id === id)[0];
  
  const { firstname, lastname, gender, age, profession } = req.body;
  // validação
  if (!firstname || !lastname || !gender || !age || !profession) {
    res.status(400).send("Erro: O pedido não está no formato correto");
  }

  if(pessoa === undefined){
    res.status(400).send("Erro: A pessoas indicada não existe");  
  }
  else{

    pessoa.firstname = firstname;
    pessoa.lastname = lastname;
    pessoa.gender = gender;
    pessoa.age = age;
    pessoa.profession = profession;

    guardarPessoas(pessoas);
    res.send(pessoa);
  }
});

// executar servidor.
app.listen(port, () => {
  // chamar a função que lê o ficheiro
  pessoas = lerPessoas();
  console.log("Lidas " + pessoas.length + " pessoas");
  // leio o id maximo
  lastId = Math.max(...pessoas.map(p => p.id));  
  console.log("ultimo ID lido: " + lastId);
  
  console.log(`Example app listening on port ${port}`);
  // console.log(pessoas);
})
