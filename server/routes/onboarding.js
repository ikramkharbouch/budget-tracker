const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/onboardingController');

/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Health check endpoints
 *   - name: Onboarding
 *     description: User onboarding flow management - session-based onboarding process
 */

/**
 * @swagger
 * /api/v1/onboarding/start:
 *   post:
 *     summary: Start a new onboarding session
 *     description: Initiates a new onboarding process and creates a session for the user
 *     tags:
 *       - Onboarding
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StartOnboardingRequest'
 *     responses:
 *       201:
 *         description: Onboarding session started successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StartOnboardingResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         description: User already has an active onboarding session
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ErrorResponse'
 *                 - properties:
 *                     error:
 *                       properties:
 *                         code:
 *                           example: SESSION_EXISTS
 *                         message:
 *                           example: User already has an active onboarding session
 *       429:
 *         $ref: '#/components/responses/RateLimitExceeded'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/v1/onboarding/categories:
 *   get:
 *     summary: Get onboarding categories
 *     description: Retrieves all available onboarding categories with their fields and configuration
 *     tags:
 *       - Onboarding
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       429:
 *         $ref: '#/components/responses/RateLimitExceeded'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/v1/onboarding/{sessionId}:
 *   get:
 *     summary: Get onboarding progress
 *     description: Retrieves the current progress and data for an onboarding session
 *     tags:
 *       - Onboarding
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Onboarding session ID
 *         example: session_789abc123
 *     responses:
 *       200:
 *         description: Progress retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OnboardingProgress'
 *       404:
 *         $ref: '#/components/responses/SessionNotFound'
 *       429:
 *         $ref: '#/components/responses/RateLimitExceeded'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/v1/onboarding/{sessionId}/progress:
 *   put:
 *     summary: Save onboarding progress
 *     description: Updates the progress data for a specific onboarding session
 *     tags:
 *       - Onboarding
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Onboarding session ID
 *         example: session_789abc123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveProgressRequest'
 *     responses:
 *       200:
 *         description: Progress saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OnboardingProgress'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/SessionNotFound'
 *       429:
 *         $ref: '#/components/responses/RateLimitExceeded'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/v1/onboarding/{sessionId}/complete:
 *   post:
 *     summary: Complete onboarding
 *     description: Marks the onboarding session as complete and finalizes the user data
 *     tags:
 *       - Onboarding
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Onboarding session ID
 *         example: session_789abc123
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               finalData:
 *                 type: object
 *                 description: Any final data to include
 *                 example:
 *                   completionNote: "Onboarding completed successfully"
 *     responses:
 *       200:
 *         description: Onboarding completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompleteOnboardingResponse'
 *       400:
 *         description: Onboarding session is not ready for completion
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ErrorResponse'
 *                 - properties:
 *                     error:
 *                       properties:
 *                         code:
 *                           example: INCOMPLETE_ONBOARDING
 *                         message:
 *                           example: Onboarding session is not ready for completion
 *       404:
 *         $ref: '#/components/responses/SessionNotFound'
 *       429:
 *         $ref: '#/components/responses/RateLimitExceeded'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/v1/onboarding/{sessionId}:
 *   delete:
 *     summary: Reset onboarding session
 *     description: Deletes/resets an onboarding session and all associated progress data
 *     tags:
 *       - Onboarding
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Onboarding session ID
 *         example: session_789abc123
 *     responses:
 *       200:
 *         description: Onboarding session reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Onboarding session reset successfully
 *                     sessionId:
 *                       type: string
 *                       example: session_789abc123
 *                     resetAt:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-01-01T14:00:00.000Z'
 *       404:
 *         $ref: '#/components/responses/SessionNotFound'
 *       429:
 *         $ref: '#/components/responses/RateLimitExceeded'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */


router.post('/start',onboardingController.startOnboarding);
router.get('/categories', onboardingController.getCategories);
router.get('/:sessionId', onboardingController.getProgress);
router.put('/:sessionId/progress', onboardingController.saveProgress);
router.post('/:sessionId/complete', onboardingController.completeOnboarding);
router.delete('/:sessionId', onboardingController.resetOnboarding);

module.exports = router;
