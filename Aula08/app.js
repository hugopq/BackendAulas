const express = require('express');

// 3.a. Adicione as dependências para o swagger-autogen e o swagger-ui-express
// autogen não é necessário, apenas para geração do output (ficheiro swagger.js)
const swaggerUi = require('swagger-ui-express');

const host = 'localhost';
const username = 'root';
const password = 'root';
const database = 'Aula7';

const app = express();
const port = 3000;

// 3.b. Adicione o código necessário para utilizar o 
// swagger-ui-express como middleware
const swaggerDocs = require('./swagger_output.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
});

connection.connect((err)=>{
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        return;
    }
    console.log('connection established to MySql');
});

// middleware
app.use(express.json()); // middleware para fazer parse do body JSON

// rotas
app.get('/users',(req,res)=>{
    const query = "SELECT * FROM users";
    connection.query(query,(err,rows)=>{
        if (err) {
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro");
        }
        res.send(rows);

    });
})

app.post('/users',(req,res) => {

    const { Firstname, Lastname, Profession, Age } = req.body;

    if( !Firstname || !Lastname || !Profession || !Age){
        return res.status(400).end("Dados obrigatórios em falta");
    }
    // const Firstname = req.body.Firstname;
    const query = "INSERT INTO users "
        + "(Firstname, Lastname, Profession, Age) "
        + "VALUES (?, ?, ?, ?)";
    connection.query(query,[Firstname, Lastname, Profession, Age],
        (err,result)=>{
        if (err) {
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro");
        }
        res.json({ linhasAfetadas: result.affectedRows });
    })
});

app.delete('/users',(req,res) => {
    const { id } = req.body;

    const query = "DELETE FROM users WHERE id = ?";

    connection.query(query,[id],(err, result) =>{
        if (err) {
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro");
        }
        res.json({ linhasAfetadas: result.affectedRows });
    });
});

app.delete('/users/:id',(req,res) => {
    const id  = req.params.id;

    const query = "DELETE FROM users WHERE id = ?";

    connection.query(query,[id],(err, result) =>{
        if (err) {
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro");
        }
        res.json({ linhasAfetadas: result.affectedRows });
    });
});

app.get('/users/:id',(req,res) => {
    const id = req.params.id;   //buscar id aos parametros
    const query = "SELECT * FROM users WHERE id = ?";   //criar query

    connection.query(query,[id],(err, result) =>{   //establecer ligação 
        if (err) {  
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro");
        }

        // caso não exista
        if(!result.length){
            return res.status(404).end("user não encontrado");
        }

        res.json({ resultado: result[0]});
    });
});

app.get('/users/:age/:profession',(req,res) => {
    const { age, profession } = req.params;
    const query = "SELECT * FROM users WHERE Age = ? AND Profession = ?";  

    connection.query(query,[age, profession],(err, result) =>{
        if (err) {  
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro");
        }

        // caso não exista
        if(!result.length){
            return res.status(404).end("não existem utilizadores com essa idade e profissão");
        }
        
        res.json({ resultado: result});
    });
});

app.put('/users/:id',(req,res)=>{
    const id = req.params.id;
    const { Firstname, Lastname, Profession, Age } = req.body;

    const query = "UPDATE users SET "
        + "Firstname = ?,"
        + "Lastname = ?,"
        + "Profession = ?,"
        + "Age = ? "
        +"WHERE id = ?";

    connection.query(query,[Firstname, Lastname, Profession, Age, id],(err, result) =>{
        if (err) {  
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro");
        }

        res.redirect('/users/' + id);
    });    
});

app.listen(port, ()=>{
    console.log("Server Started");
});