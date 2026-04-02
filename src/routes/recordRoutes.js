const express = require('express');
const router = express.Router();
const { createRecord, getRecords, updateRecord, deleteRecord } = require('../controllers/recordController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/rbac');
const { validate, createRecordSchema, updateRecordSchema, recordQuerySchema } = require('../utils/validators');

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Financial record management
 */

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a financial record (admin only)
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, type, category]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *                 example: Salary
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-01
 *               notes:
 *                 type: string
 *                 example: Monthly salary
 *     responses:
 *       201:
 *         description: Record created
 *       403:
 *         description: Forbidden
 */
router.post('/', protect, authorizeRoles('admin'), validate(createRecordSchema), createRecord);

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get paginated and filtered records (all roles)
 *     tags: [Records]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date, amount, createdAt]
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Paginated list of records
 */
router.get('/', protect, authorizeRoles('viewer', 'analyst', 'admin'), validate(recordQuerySchema, 'query'), getRecords);

/**
 * @swagger
 * /records/{id}:
 *   put:
 *     summary: Update a financial record (admin only)
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated
 *       404:
 *         description: Not found
 */
router.put('/:id', protect, authorizeRoles('admin'), validate(updateRecordSchema), updateRecord);

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     summary: Soft-delete a record (admin only)
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', protect, authorizeRoles('admin'), deleteRecord);

module.exports = router;