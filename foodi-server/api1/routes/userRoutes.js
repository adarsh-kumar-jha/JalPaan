const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// get all users
router.get('/', verifyToken, verifyAdmin, (req, res) => {
    userController.getAllUsers(req, res)
} )

// create a new user
router.post('/', userController.createUser )

// delete a user
router.delete('/:id',verifyToken, verifyAdmin, userController.deleteUser)

// get admin
router.get('/admin/:email',verifyToken, userController.getAdmin);

// make admin
router.patch('/admin/:id',verifyToken, verifyAdmin, userController.makeAdmin);

module.exports = router;
