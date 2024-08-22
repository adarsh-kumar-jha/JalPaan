const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuControllers');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// GET all menu items
router.get('/', menuController.getAllMenuItems);

router.get('/:id', menuController.getMenuItem);
// POST a new menu item
router.post('/', verifyToken, verifyAdmin, menuController.postMenuItem);

// DELETE a menu item
router.delete('/:id', verifyToken, verifyAdmin, menuController.deleteMenuItem);

// PATCH (update) a menu item
router.patch('/:id', verifyToken, verifyAdmin, menuController.updateMenuItem);

module.exports = router;
