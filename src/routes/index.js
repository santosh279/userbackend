const express = require('express');
let router = express.Router();

const { addUser, deleteUser } = require('../controllers');
const { verifyToken, userValidation, validateUserId } = require('../middleware');

router.post('/addUser', verifyToken, userValidation, addUser);
router.delete('/user/:id', verifyToken, validateUserId, deleteUser);

module.exports = router;
