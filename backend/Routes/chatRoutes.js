const express = require('express');
const { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatController');
const { protect } = require('../Middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChat);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/group-remove').put(protect, removeFromGroup);
router.route('/group-add').put(protect, addToGroup);

module.exports = router;