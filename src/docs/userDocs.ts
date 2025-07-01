/**
 * @swagger
 * components:
 *   schemas:
 *     IUserRegisterRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         whatsappNumber:
 *           type: string
 *           example: 6284455334434
 *         password:
 *           type: string
 *           example: secret123
 *         role:
 *           type: string
 *           example: user
 *     IUserLoginRequest:
 *       type: object
 *       properties:
 *         whatsappNumber:
 *           type: string
 *           example: 6284455334434
 *         password:
 *           type: string
 *           example: secret123
 *     IUserUpdateRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Updated Name
 *         whatsappNumber:
 *           type: string
 *           example: updated@example.com
 *         password:
 *           type: string
 *           example: newpassword123
 *         role:
 *           type: string
 *           example: admin
 */

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     summary: Get all users
 *     tags: [USERS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
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
 *         description: List of users
 */

/**
 * @swagger
 * /api/v1/users/detail/{userId}:
 *   get:
 *     summary: Get user detail by ID
 *     tags: [USERS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User detail
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/v1/users/:
 *   patch:
 *     summary: Update a user
 *     tags: [USERS]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IUserUpdateRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/v1/users/:
 *   delete:
 *     summary: Delete a user
 *     tags: [USERS]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [USERS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IUserLoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [USERS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IUserRegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
