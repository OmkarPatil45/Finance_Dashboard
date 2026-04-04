const express = require('express');
const { getDashboardSummary } = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);   // All roles can see dashboard summary
router.get('/summary', getDashboardSummary);

module.exports = router;