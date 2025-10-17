/**
 * @swagger
 * components:
 *   schemas:
 *     IDeviceCreateRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Sensor Pupuk 1"
 *         status:
 *           type: string
 *           enum: [active, inactive, maintenance]
 *           example: "active"
 *         fertilizerVolume:
 *           type: integer
 *           example: 500
 *         fertilizeType:
 *           type: string
 *           enum: [NPK, UREA, DOLOMIT, MOP, KIESERITE, ROCK PHOSPHATE]
 *           example: "NPK"
 *         speed:
 *           type: integer
 *           example: 10
 *         
 *       required:
 *          - name
 *          - status
 *          - fertilizerVolume
 *          - fertilizeType
 *          - speed
 * 
 *     IDeviceUpdateRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Sensor Pupuk 1 Diperbarui"
 *         status:
 *           type: string
 *           enum: [active, inactive, maintenance]
 *           example: "inactive"
 *         fertilizerVolume:
 *           type: integer
 *           example: 600
 *         fertilizeType:
 *           type: string
 *           enum: [NPK, UREA, DOLOMIT, MOP, KIESERITE, ROCK PHOSPHATE]
 *           example: "NPK"
 *         speed:
 *           type: integer
 *           example: 10
 *         
 *       required:
 *         - id

 *     IDeviceFindDetailRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *       required:
 *         - id

 *     IDeviceFindAllRequest:
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
 * /api/v1/devices:
 *   get:
 *     summary: Get all devices with optional filters
 *     tags: [DEVICES]
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
 * /api/v1/devices/detail/{id}:
 *   get:
 *     summary: Get device detail by ID
 *     tags: [DEVICES]
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
 * /api/v1/devices:
 *   post:
 *     summary: Create a new device
 *     tags: [DEVICES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IDeviceCreateRequest'
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

/**
 * @swagger
 * /api/v1/devices:
 *   patch:
 *     summary: Update an existing device
 *     tags: [DEVICES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IDeviceUpdateRequest'
 *     responses:
 *       200:
 *         description: Device updated successfully
 *       404:
 *         description: Device not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/devices/{id}:
 *   delete:
 *     summary: Delete a device by ID
 *     tags: [DEVICES]
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
 *         description: Device deleted successfully
 *       404:
 *         description: Device not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
