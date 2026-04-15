const express = require('express');
const conn = require('./dbconfig');
const port = 3000;

const app = express();

app.use(express.json());

// Parte A:
// a. Listar todos os livros existentes na tabela e devolver na resposta.
app.get('/books',(req,res)=>{
    try {
        // Para a parte B adaptar para receber o queryParameter
        const {id} = req.query;
        let query = "";
        const params = [id];
        if(id){
            query = "SELECT * FROM Book WHERE id = ?";
        } else {
            query = "SELECT * FROM Book";
        }
        conn.query(query,params,(error,rows)=>{
            if(error){
                return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
            }
            res.send(rows);
        });

    } catch (error) {
        res.status(500).send("Erro do servidor");
    }    
});

// e. Listar todos os livros publicados antes de uma data (via params) e devolver a lista na resposta.
app.get('/books/before/:date', (req, res) => {
    const { date } = req.params;

    // Validação de formato com regex
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).end(
            'Formato de data inválido. Use YYYY-MM-DD.');
    }

    // Validação de data real
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).end('Data inválida.');
    }

    const query = "SELECT * FROM Book WHERE published < ?"
    conn.query(query, [parsedDate], (error,rows) =>{
        if(error){
            return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
        }
        res.send(rows);
    });
});


// b. Adicionar um novo livro à base de dados. Deverá ser enviada uma mensagem de sucesso na resposta indicando o ID do livro adicionado. (2 valores)
app.post('/books',(req, res) => {
    const {title, isbn, genre, review, synopsis, pages, price, published, comment} = req.body;
    // validaçao de campos obrigatórios:
    if(!title || !isbn || !genre || !review || !synopsis || !pages 
        || !price || !published || !comment){
        return res.status(400).end('Campos obrigatórios em falta');
    }
    // insert
    const query = "INSERT INTO Book "
        +"(title, isbn, genre, review, synopsis, pages, price, published, comment) "
        +"VALUES (?,?,?,?,?,?,?,?,?)";
    conn.query(query,[title, isbn, genre, review, synopsis, pages, price, published, comment], (error,result) => {
        if(error){
                return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
        }
        res.send({registos_inseridos: result.affectedRows});
    });
});

// c. Selecionar todos os livros de um determinado género (via params) e devolver essa lista na resposta.
app.get('/books/:genre',(req,res)=>{
    const genre = req.params.genre;
    const query = "SELECT * FROM Book WHERE genre = ?";
    conn.query(query,[genre], (error,rows)=>{
        if(error){
            return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
        }
        res.send(rows);
    });
});

// d. Aplicar um desconto em percentagem no preço de um livro (via query) e atualizar a entrada. Devolver a mensagem de sucesso ou erro.
app.put('/books/:id/discount', (req, res) => {
    const { id } = req.params;
    const { percentage } = req.query;

    // Validação
    if (!percentage || isNaN(percentage) 
        || percentage <= 0 || percentage > 100) {
        return res.status(400).json({ 
            message: 'Percentagem inválida. Deve ser um número entre 0 e 100.' 
        });
    }

    // Buscar o livro
    const query = 'SELECT * FROM Book WHERE id = ?';
    conn.query(query, [id], (error,rows) =>{
        if(error){
            return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
        }
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }        
        // aplica percentagem
        const book = rows[0];
        const newPrice = book.price - (book.price*percentage/100);
        // atualiza        
        const query = "UPDATE Book SET price = ? WHERE id = ?"
        conn.query(query, [newPrice, id], (error,result) =>{
            if(error){
                return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
            }
            res.send({registos_atualizados: result.affectedRows});
        });
    });
});


// Parte B:
// a.Selecionar apenas um livro pelo seu ID (via query) e devolver o mesmo 
// na resposta.
//  ---- Feito na alinea a. da Parte A
// b. Apagar um livro existente (via params) e atualizar a tabela, indicar 
// mensagem de erro se o ID do livro a apagar não existir ou mensagem de 
// sucesso caso seja apagado.
app.delete('/books/:id', (req,res) => {
    const {id} = req.params;
    if(isNaN(id))
        return res.status(400).end('id inválido');
    
    const query = "DELETE FROM Book WHERE id = ?"
    conn.query(query,[id],(error,result)=>{
        if(error){
            return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
        }
        res.send({registos_eliminados:result.affectedRows});
    });
})

// c. Filtrar todos os livros com palavras-chave (via body), existentes 
// na sinopse e devolver essa lista na resposta.
// opção 1 - keywords é uma palavra a pesquisar
app.post('/books/filter1',(req,res) => {
    const { keyword }= req.body;    
    if(!keyword)
        res.status(400).end("keyword é obrigadoria");

    query = "SELECT * FROM Book WHERE synopsis LIKE ?";
    conn.query(query, [`%${keyword}%`], (error,rows) =>{
        if(error){
            return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
        }
        res.send(rows);
    });
});

// opção 2 - keywords é um array de palavras a pesquisar (usando filter)
app.post('/books/filter3',(req,res) => {
    const { keywords }= req.body;    
    if(!keywords)
        res.status(400).end("keywords é obrigadoria");

    // Validação
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
        return res.status(400).json({ 
            message: 'Keywords deve ser um array não vazio.' 
        });
    }

    query = "SELECT * FROM Book";
    conn.query(query, (error,rows) =>{
        if(error){
            return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
        }
        const filtered = rows.filter(book =>
            // keywords.every(keyword =>           //todas as palavras (AND)
            keywords.some(keyword =>            //uma das palavras (OR)   
                book.synopsis.toLowerCase().includes(keyword.toLowerCase())
            )
        );
        res.send(filtered);
    });
});

// opção 3 - keywords é um array de palavras a pesquisar (usando SQL)
app.post('/books/filter2',(req,res) => {
    const { keywords }= req.body;    
    if(!keywords)
        res.status(400).end("keywords é obrigadoria");

    // Validação
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
        return res.status(400).json({ 
            message: 'Keywords deve ser um array não vazio.' 
        });
    }

    const conditions = keywords.map(() => 'synopsis LIKE ?').join(' OR ');
    const values = keywords.map(k => `%${k}%`);

    query = `SELECT * FROM Book WHERE ${conditions}`;
    conn.query(query, values, (error,rows) =>{
        if(error){
            return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
        }
        res.send(rows);
    });
});

// d. Adicionar um comentário a um determinado livro (mantendo os 
// anteriores) pelo seu ID e atualizar a tabela. Devolver a entrada 
// atualizada na resposta.
app.post('/books/:id/comment', (req,res)=>{
    const  {id} = req.params;
    const {user, text, rating } = req.body;

    if(!user || !text || !rating)
        return res.status(400).end('campos obrigatórios em falta')

    const query = "SELECT * FROM Book WHERE id = ?"
    conn.query(query,[id], (error,rows) => {
        if(error){
            return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
        }
        const comments = rows[0];
        let array;
        if(Array.isArray(comments.comment))
            array = comments.comment;
        else array = [ comments.comment];

        array.push({user, text, rating});

        const updateQuery = "UPDATE Book SET comment = ? WHERE id = ?";
        conn.query(updateQuery, [JSON.stringify(array), id], (error) => {
            if(error){
                return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
            }
            conn.query("SELECT * FROM Book WHERE id = ?", [id], (error, rows) => {
                if(error){
                    return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
                }
                res.send(rows[0]);
            });
        });
    });
});

// e. Listar todos os livros ordenados por ordem crescente de preço e devolver
//  a lista ordenada na resposta. A ordenação terá que ser efetuada em 
// Javascript.

app.get('/book/orderprice',(req,res)=>{
    // PAra a parte B adaptar para receber o queryParameter
    const {id} = req.query;
    let query = "";
    const params = [id];
    if(id){
        query = "SELECT * FROM Book WHERE id = ?";
    } else {
        query = "SELECT * FROM Book";
    }
    conn.query(query,params,(error,rows)=>{
        if(error){
            return res.status(500).end("Ocorreu um erro ao aceder à base de dados")
        }
        rows.sort((a, b) => a.price - b.price);
        res.send(rows);
    });
})

app.listen(port,() =>{
    console.log("Servidor express a correr na porta " + port + " ➡️");
});

