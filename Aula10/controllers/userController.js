const {User, Loan, Book} = require('../models');

const userController = {

    index: async(req, res) => {
        try {            
            const users = await User.findAll({
                // inclui dados relacionados
                include: [{ model: Loan, as: 'loans', 
                    include: [{ model: Book, as: 'book',
                    }]
                }]
            });
            res.json(users);
        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },

    show: async(req,res) => {
        try {
            const {user_id} = req.params;

            const user = await User.findByPk(user_id);
            if(!user)
                return res.status(404).json({message: "utilizador não encontrado"});

            res.json(user);

        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});            
        }
    },

    strore: async(req,res) => {
        try {            
            const { first_name, last_name, email, address, phone_number} = req.body;
            // validação campos obrigatorios
            if( !first_name || !last_name || !email){
                res.status(400).json({message:"campos obrigatórios em falta"});
            }

            await User.create({
                first_name,
                last_name, 
                email, 
                address,
                phone_number,
            })
            
            res.json({message: 'utilizador criado'});            
        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },

    update: async (req,res) => {
        try {
            const {user_id }= req.params;

            const user = await User.findByPk(user_id);
            if(!user)
                return res.status(404).json({message: "utilizador não encontrado"});

            // criação compacta de updates:
            const allowedFields = ['first_name', 'last_name', 'email', 'address', 'phone_number'];
            const updates = Object.keys(req.body)
                .filter(key => allowedFields.includes(key) && req.body[key] !== undefined)
                .reduce((obj, key) => {
                    obj[key] = req.body[key];
                    return obj;
                }, {});
            
            await user.update(updates);
            res.json({ message: 'Utilizador atualizado com sucesso', user });

        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },

    delete: async (req,res) => {
        try {
            const {user_id }= req.params;

            const user = await User.findByPk(user_id);
            if(!user)
                return res.status(404).json({message: "utilizador não encontrado"});
            
            await user.destroy();
            res.json({ message: 'Utilizador eliminado com sucesso', user });

        } catch (error) {
            console.error("Erro interno:", error);
            res.status(500).json({message:'Erro interno'});
        }
    },
}

module.exports = userController;