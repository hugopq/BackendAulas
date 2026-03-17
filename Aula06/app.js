const express = require('express');
const fs = require('fs');   // para ler e escrever ficheiros
const app = express();
const port = 3000;
const file = "logs.txt";

// função para ler ficheiro de logs
function readLogs(){
    let logs = "";
    if(fs.existsSync(file)){
        logs = fs.readFileSync(file, 'utf-8');
    }
    return logs;
}

// função para guardar o ficheiro
function writeLogs(dados){
    fs.writeFileSync(file,dados);
}

// 3. criar middleware de registo
app.use((req, res, next) => {    
    // let ficheiro
    let logs = readLogs();
    // adicionar novo log
    // 6. colocar no log data, methos e path separados por virgulas
    logs += "\n" + new Date().toISOString() + ",\t" +  req.method 
        + ",\t" + req.path + ", ";
    // voltar a guardar ficheiro
    writeLogs(logs);
    
    console.log(logs);
    // continua para as rotas
    next();
});

app.get('/',(req,res)=>{
    // 4.a.
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('<h1>Olá mundo<h1>');
});

app.get('/html',(req,res)=>{
    // 4.b.
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>olá mundo</h1>');
});

app.get('/html2',(req,res)=>{
    // 4.c.
    const htmlContents = fs.readFileSync('./index.html','utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContents);
});
app.get('/html3',(req,res)=>{
    // 4.e. 
    let htmlContents = fs.readFileSync('./index.html','utf8');
    // substituir os conteudos {{data}} ➡️ Data do servidor
    // E atualizar a variável
    htmlContents = htmlContents.replace('{{data}}',
        new Date().toISOString());
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContents);
});

app.get('/users/:name/:idade',(req,res)=>{
    // 5.a. via parametro
    res.send("Olá " + req.params.name + " tens " + req.params.idade);
});

app.get('/users',(req,res)=>{
    // 5.a. via query
    res.send("olá" + req.query.name + " tens " + req.query.idade);
});

// 7. logs
app.get('/logs',(req,res)=>{
    const logs = readLogs();
    // res.send(logs);
    res.writeHead(200, {  'Content-Type': 'text/plain' })
    res.end(logs);
});

// 8. logs download via writeHEad
app.get('/logsDL',(req,res)=>{
    const logs = readLogs();
    // res.send(logs);
    res.writeHead(200, {  
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="ficheiroDeLogs.txt"'
     })
    res.end(logs);
});

// 8. logs download via download
app.get('/logsDL2',(req,res)=>{
    // const logs = readLogs();
    res.download(file,'ficheiroDeLogs.txt');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})