const sequelize = require('../sequelize');
const Books = sequelize.Books;
const Loans = sequelize.Loans;
const Users = sequelize.Users;

const bookController = {

    index: async(req, res) => {
        try {            
            const books = await Books.findAll({
                // inclui dados relacionados
                include: [{ model: Loans, as: 'loans', 
                    include: [{ model: Users, as: 'user',
                    }]
                }]
            });
            res.json(books);
        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },

    show: async(req,res) => {
        try {
            const {book_id} = req.params;

            const book = await Books.findByPk(book_id);
            if(!book)
                return res.status(404).json({message: "livro não encontrado"});

            res.json(book);

        } catch (error) {
            console.error("Erro interno:", error);
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

            await Books.create({
                title,
                author_name, 
                publication_date, 
                genre,
                available_copies: available_copies || 1,
            })
            
            res.json({message: 'livro criado'});            
        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },

    update: async (req,res) => {
        try {
            const {book_id}= req.params;

            const book = await Books.findByPk(book_id);
            if(!book)
                return res.status(404).json({message: "livro não encontrado"});

            // criação compacta de updates:
            const allowedFields = ['title', 'author_name', 'publication_date', 
                'genre', 'available_copies'];
            const updates = Object.keys(req.body)
                .filter(key => allowedFields.includes(key) && req.body[key] !== undefined)
                .reduce((obj, key) => {
                    obj[key] = req.body[key];
                    return obj;
                }, {});
            
            // const { title, author_name, publication_date, 
            //     genre, available_copies } = req.body;

            // let updates = {}
            // if(title)
            //     updates.title = title;
            // if(author_name)
            //     updates.author_name = author_name;
            // if(publication_date)
            //     updates.publication_date = publication_date;
            // if(genre)
            //     updates.genre = genre;
            // if(available_copies)
            //     updates.available_copies = available_copies;

            await book.update(updates);
            res.json({ message: 'Livro atualizado com sucesso', book });

        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },

    delete: async (req,res) => {
        try {
            const {book_id }= req.params;

            const book = await Books.findByPk(book_id);
            if(!book)
                return res.status(404).json({message: "livro não encontrado"});
            
            await book.destroy();
            res.json({ message: 'Livro eliminado com sucesso', book });

        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },
}

module.exports = bookController;