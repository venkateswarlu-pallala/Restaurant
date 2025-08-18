const express = require('express');
const router = express.Router();
const { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getMenuItems).post(protect, admin, addMenuItem);
router.route('/:id').put(protect, admin, updateMenuItem).delete(protect, admin, deleteMenuItem);

module.exports = router;