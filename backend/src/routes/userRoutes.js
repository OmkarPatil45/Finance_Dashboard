const express = require('express');
const { getAllUsers, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));   // Only Admin

router.get('/', getAllUsers);
router.patch('/:id', updateUser);

module.exports = router;