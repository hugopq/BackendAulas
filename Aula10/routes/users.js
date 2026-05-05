const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.index);
router.get('/:user_id', userController.show);
router.post('/', userController.strore);
router.patch('/:user_id', userController.update);
router.delete('/:user_id', userController.delete);

module.exports = router;