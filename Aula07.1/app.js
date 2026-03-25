const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// dados de ligação à BD
let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',              //127.0.0.1
    user: 'root',
    password: 'root',
    database: 'Aula7.1'
})

app.use(express.json());    //middleware para ler json do body


// criar endpoints
// definir endppint com PATH, e CALLBACK (req, res) 
// req - request: dados enviados pelo cliente
// res - resposta: dados que devolvermos ao cliente
app.get('/users', (req,res) =>{
    // tratam o endpoint
    // res.status()
    // res.redirect()
    // res.download
    pool.query('SELECT * FROM users',(err,result)=>{
       if(err){
            return res.status(500).end(error);
       }
        res.json(result);
    });
});

app.listen(port,() => {
    console.log("Server Started");
});
