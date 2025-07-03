/**
 * @swagger
 * components:
 *   schemas:
 *     IModuleCreateRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Modul Dasar Pemrograman"
 *         description:
 *           type: string
 *           example: "Modul tentang konsep dasar pemrograman"
 *         image:
 *           type: string
 *           example: "https://example.com/module-image.png "
 *       required:
 *         - title
 *         - description
 *
 *     IModuleUpdateRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: "Modul Dasar Pemrograman Diperbarui"
 *         description:
 *           type: string
 *           example: "Deskripsi diperbarui"
 *         image:
 *           type: string
 *           example: "https://example.com/updated-module-image.png "
 *       required:
 *         - id
 *
 *     IModuleFindDetailRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *       required:
 *         - id
 *
 *     IModuleFindAllRequest:
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
 *           example: "pemrograman"
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
 * /api/v1/modules:
 *   get:
 *     summary: Get all modules with optional filters
 *     tags: [MODULES]
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
 *         description: List of modules retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/modules/detail/{id}:
 *   get:
 *     summary: Get module detail by ID
 *     tags: [MODULES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Module detail retrieved successfully
 *       404:
 *         description: Module not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/modules:
 *   post:
 *     summary: Create a new module
 *     tags: [MODULES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IModuleCreateRequest'
 *     responses:
 *       201:
 *         description: Module created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/modules:
 *   patch:
 *     summary: Update an existing module
 *     tags: [MODULES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IModuleUpdateRequest'
 *     responses:
 *       200:
 *         description: Module updated successfully
 *       404:
 *         description: Module not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/modules/{id}:
 *   delete:
 *     summary: Delete a module by ID
 *     tags: [MODULES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Module deleted successfully
 *       404:
 *         description: Module not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
