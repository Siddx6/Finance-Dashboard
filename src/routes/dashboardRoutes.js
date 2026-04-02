const express = require('express');
const router = express.Router();
const { getSummary, getCategoryBreakdown, getMonthlyTrends, getRecentTransactions } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/rbac');

router.use(protect, authorizeRoles('analyst', 'admin'));

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Aggregated financial analytics (analyst + admin)
 */

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Total income, expenses and net balance
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Financial summary
 *       403:
 *         description: Forbidden
 */
router.get('/summary', getSummary);

/**
 * @swagger
 * /dashboard/category-breakdown:
 *   get:
 *     summary: Totals grouped by category
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Category breakdown
 *       403:
 *         description: Forbidden
 */
router.get('/category-breakdown', getCategoryBreakdown);

/**
 * @swagger
 * /dashboard/monthly-trends:
 *   get:
 *     summary: Income vs expenses per month (last 12 months)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Monthly trends
 *       403:
 *         description: Forbidden
 */
router.get('/monthly-trends', getMonthlyTrends);

/**
 * @swagger
 * /dashboard/recent-transactions:
 *   get:
 *     summary: Most recent transactions
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Recent transactions
 *       403:
 *         description: Forbidden
 */
router.get('/recent-transactions', getRecentTransactions);

module.exports = router;
