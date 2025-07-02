/**
 * @swagger
 * components:
 *   schemas:
 *     IQuizCreateRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Kuis Dasar Pemrograman"
 *         description:
 *           type: string
 *           example: "Kuis tentang konsep dasar pemrograman"
 *         category:
 *           type: string
 *           example: general
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IQuizQuestion'
 *
 *     IQuizUpdateRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: "Judul Kuis Diperbarui"
 *         description:
 *           type: string
 *           example: "Deskripsi kuis diperbarui"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IQuizQuestion'
 *
 *     IQuizDeleteRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *
 *     IQuizFindDetailRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *
 *     IQuizFindAllRequest:
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
 *
 *     IQuizQuestion:
 *       type: object
 *       properties:
 *         questionText:
 *           type: string
 *           example: "Apa itu variabel?"
 *         options:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IQuizOption'
 *
 *     IQuizOption:
 *       type: object
 *       properties:
 *         optionText:
 *           type: string
 *           example: "Penampung nilai"
 *         isCorrect:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/v1/quizzes:
 *   get:
 *     summary: Get all quizzes with optional filters
 *     tags: [QUIZZES]
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
 *       - in: query
 *         name: category
 *         schema:
 *           type: sting
 *           enum: [personal, general]
 *     responses:
 *       200:
 *         description: List of quizzes
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/quizzes/detail/{id}:
 *   get:
 *     summary: Get quiz detail by ID
 *     tags: [QUIZZES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [personal, general]
 *     responses:
 *       200:
 *         description: Quiz detail
 *       404:
 *         description: Quiz not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/quizzes:
 *   post:
 *     summary: Create a new quiz with questions and options
 *     tags: [QUIZZES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IQuizCreateRequest'
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/quizzes:
 *   patch:
 *     summary: Update an existing quiz
 *     tags: [QUIZZES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IQuizUpdateRequest'
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       404:
 *         description: Quiz not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/quizzes/{id}:
 *   delete:
 *     summary: Delete a quiz by ID
 *     tags: [QUIZZES]
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
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
