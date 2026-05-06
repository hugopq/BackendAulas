const Users = require('../sequelize').Users;

exports.getAll = async(req, res) => {
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
    }