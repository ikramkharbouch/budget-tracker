const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the current health status of the API server
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is healthy and running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     x-codegen-request-body-name: body
 */

router.get('/health', healthController.getHealth);

module.exports = router;
