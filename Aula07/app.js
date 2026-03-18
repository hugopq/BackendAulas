// 1.a.
const express = require('express');
// 1.b. - no terminal: 
//          npm init -y
//          npm install express
// 1.c. - no terminal:
//          npm install mysql2
// no mysql cli / wrokbench / phpMyAdmin
// 2. CREATE DATABASE Aula7
// 2.a. CREATE TABLE `users` (
//            `id` INT NOT NULL AUTO_INCREMENT,
//            `Firstname` VARCHAR(100) NOT NULL,
//            `Lastname` VARCHAR(100) NOT NULL,
//            `Profession` VARCHAR(100) NOT NULL,
//            `Age` INT NOT NULL,
//            PRIMARY KEY (`id`)
//        );
// 2.b.
const host = 'localhost';
const username = 'root';
const password = 'root';
const database = 'Aula7';
// 2.c. INSERT INTO `users` (`Firstname`, `Lastname`, `Profession`, `Age`) VALUES
//          ('João', 'Silva', 'Engenheiro', 28),
//          ('Maria', 'Santos', 'Médica', 35),
//          ('Pedro', 'Oliveira', 'Professor', 42),
//          ('Ana', 'Costa', 'Advogada', 31),
//          ('Rui', 'Ferreira', 'Designer', 26);
// 3.
const app = express();
const port = 3000;


// 4.
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
});
// 4.a
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
// 4.b.i
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

// 4.b.ii
app.post('/users',(req,res)=>{

    console.log(req.body);

    const { Firstname, Lastname, Profession, Age } = req.body;
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


app.listen(port, ()=>{
    console.log("Server Started");
});