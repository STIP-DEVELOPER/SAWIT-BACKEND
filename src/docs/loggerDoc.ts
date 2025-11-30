/**
 * @swagger
 * components:
 *   schemas:
 *     ILoggerCreateRequest:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         message:
 *           type: string
 *         level:
 *           type: string
 *
 *       required:
 *          - token
 *          - message
 *          - level
 *
 *
 *     IFindDetailRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *       required:
 *         - id
 */

/**
 * @swagger
 * /api/v1/loggers:
 *   get:
 *     summary: Get all devices with optional filters
 *     tags: [LOGGER]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of devices retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/loggers:
 *   post:
 *     summary: Create a new logger
 *     tags: [LOGGER]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ILoggerCreateRequest'
 *     responses:
 *       201:
 *         description: Device created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
