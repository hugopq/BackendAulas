const {Loan, Book, User} = require('../models');

const loanController = {

    index: async(req, res) => {
        try {            
            const loans = await Loan.findAll({
                // inclui dados relacionados
                include: [
                    { model: Book, as: 'book' },
                    { model: User, as: 'user' }
                ]
            });
            res.json(loans);
        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },

    show: async(req,res) => {
        try {
            const {loan_id} = req.params;

            const loan = await Loan.findByPk(loan_id, {
                include: [
                    { model: Book, as: 'book' },
                    { model: User, as: 'user' }
                ]
            });
            if(!loan)
                return res.status(404).json({message: "empréstimo não encontrado"});

            res.json(loan);

        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});            
        }
    },

    strore: async(req,res) => {
        try {            
            const { user_id, book_id, loan_date, return_date} = req.body;
            // validação campos obrigatorios
            if( !user_id || !book_id || !loan_date){
                res.status(400).json({message:"campos obrigatórios em falta"});
            }

            // verificar se o livro existe
            const book = await Book.findByPk(book_id);
            if(!book)
                return res.status(404).json({message: "livro não encontrado"});

            // verificar se o utilizador existe
            const user = await User.findByPk(user_id);
            if(!user)
                return res.status(404).json({message: "utilizador não encontrado"});

            await Loan.create({
                user_id,
                book_id, 
                loan_date, 
                return_date,
            })
            
            res.json({message: 'empréstimo criado'});            
        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },

    update: async (req,res) => {
        try {
            const {loan_id }= req.params;

            const loan = await Loan.findByPk(loan_id);
            if(!loan)
                return res.status(404).json({message: "empréstimo não encontrado"});

            // criação compacta de updates:
            const allowedFields = ['user_id', 'book_id', 'loan_date', 'return_date'];
            const updates = Object.keys(req.body)
                .filter(key => allowedFields.includes(key) && req.body[key] !== undefined)
                .reduce((obj, key) => {
                    obj[key] = req.body[key];
                    return obj;
                }, {});
            
            await loan.update(updates);
            res.json({ message: 'Empréstimo atualizado com sucesso', loan });

        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },

    delete: async (req,res) => {
        try {
            const {loan_id }= req.params;

            const loan = await Loan.findByPk(loan_id);
            if(!loan)
                return res.status(404).json({message: "empréstimo não encontrado"});
            
            await loan.destroy();
            res.json({ message: 'Empréstimo eliminado com sucesso', loan });

        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },
}

module.exports = loanController;