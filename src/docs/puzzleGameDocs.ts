/**
 * @swagger
 * components:
 *   schemas:
 *     IGameEvaluationQuestion:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *           example: "Apa manfaat bermain puzzle?"
 *         category:
 *           type: string
 *           enum: [puzzle, word]
 *           example: "puzzle"

 *     IPuzzleGameCreateRequest:
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
 *           example: "https://example.com/module-image.png"
 *         gameEvaluationQuestion:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IGameEvaluationQuestion'
 *       required:
 *         - title
 *         - description

 *     IPuzzleGameUpdateRequest:
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
 *           example: "https://example.com/updated-module-image.png"
 *         gameEvaluationQuestion:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IGameEvaluationQuestion'
 *       required:
 *         - id

 *     IPuzzleGameFindDetailRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *       required:
 *         - id

 *     IPuzzleGameFindAllRequest:
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
 * /api/v1/games/puzzles:
 *   get:
 *     summary: Get all puzzle games with optional filters
 *     tags: [PUZZLE-GAME]
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
 *         description: List of puzzle games retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/games/puzzles/detail/{id}:
 *   get:
 *     summary: Get puzzle game detail by ID
 *     tags: [PUZZLE-GAME]
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
 *         description: Puzzle game detail retrieved successfully
 *       404:
 *         description: Puzzle game not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/games/puzzles:
 *   post:
 *     summary: Create a new puzzle game
 *     tags: [PUZZLE-GAME]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IPuzzleGameCreateRequest'
 *     responses:
 *       201:
 *         description: Puzzle game created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/games/puzzles:
 *   patch:
 *     summary: Update an existing puzzle game
 *     tags: [PUZZLE-GAME]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IPuzzleGameUpdateRequest'
 *     responses:
 *       200:
 *         description: Puzzle game updated successfully
 *       404:
 *         description: Puzzle game not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/games/puzzles/{id}:
 *   delete:
 *     summary: Delete a puzzle game by ID
 *     tags: [PUZZLE-GAME]
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
 *         description: Puzzle game deleted successfully
 *       404:
 *         description: Puzzle game not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
