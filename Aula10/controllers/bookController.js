const {Book} = require('../models');

const bookController = {

    index: async(req, res) => {
        try {            
            const books = await Book.findAll({
                // inclui dados relacionados
                include: [{ model: Loan }]
            });
            res.json(books);
        } catch (error) {
            res.status(500).json({message:'Erro interno'});
        }
    },

    strore: async(req,res) => {
        try {            
            const { title, author_name, publication_date, 
                genre, available_copies} = req.body;
            // validação campos obrigatorios
            if( !title || !author_name || !publication_date|| !genre){
                res.status(400).json({message:"campos obrigatórios em falta"});
            }

            await Book.create({
                title,
                author_name, 
                publication_date, 
                genre,
                available_copies: available_copies || 1,
            })
            
            res.json({message: 'livro criado'});            
        } catch (error) {
            res.status(500).json({message:'Erro interno'});
        }
    }

    // TODO: delete e update
}

module.exports = bookController;