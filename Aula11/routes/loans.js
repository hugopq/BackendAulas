const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const  { authenticateTokenFromHeaders } = require('../midddleware/auth');

router.use(authenticateTokenFromHeaders);

router.get('/', loanController.index);
router.get('/:loan_id', loanController.show);
router.post('/', loanController.strore);
router.patch('/:loan_id', loanController.update);
router.delete('/:loan_id', loanController.delete);

module.exports = router;