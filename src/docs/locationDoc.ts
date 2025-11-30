/**
 * @swagger
 * components:
 *   schemas:
 *     ILocationCreateRequest:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         latitude:
 *           type: string
 *         longitude:
 *           type: string
 *         
 *       required:
 *          - token
 *          - latitude
 *          - longitude
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

 *     ILocationFindAllRequest:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         size:
 *           type: integer
 *           example: 10
 *         search:
 *           type: string
 *           example: "sensor"
 *         pagination:
 *           type: boolean
 *           example: true
 *         startDate:
 *           type: string
 *           example: "2024-01-01T00:00:00Z"
 *         endDate:
 *           type: string
 *           example: "2024-12-31T23:59:59Z"
 */

/**
 * @swagger
 * /api/v1/locations:
 *   get:
 *     summary: Get all devices with optional filters
 *     tags: [LOCATION]
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
 * /api/v1/locations/detail/{id}:
 *   get:
 *     summary: Get device detail by ID
 *     tags: [LOCATION]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Device detail retrieved successfully
 *       404:
 *         description: Device not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/locations/latest:
 *   get:
 *     summary: Get all devices latest locations
 *     tags: [LOCATION]
 *     security:
 *       - BearerAuth: []
 *     parameters:
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
 *         description: List of devices latest locations retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/locations:
 *   post:
 *     summary: Create a new device
 *     tags: [LOCATION]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ILocationCreateRequest'
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
