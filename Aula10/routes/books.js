const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.index);
router.get('/:book_id', bookController.show);
router.post('/', bookController.strore);
router.patch('/:book_id', bookController.update);
router.delete('/:book_id', bookController.delete);

module.exports = router;