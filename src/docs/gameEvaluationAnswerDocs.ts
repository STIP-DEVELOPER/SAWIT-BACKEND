/**
 * @swagger
 * components:
 *   schemas:
 *     IGameEvaluationAnswerItem:
 *       type: object
 *       properties:
 *         answer:
 *           type: string
 *           example: "Puzzle dapat meningkatkan kemampuan kognitif."
 *         gameId:
 *           type: number
 *           example: 3
 *         questionId:
 *           type: number
 *           example: 7
 *         category:
 *           type: string
 *           enum: [puzzle, word]
 *           example: "puzzle"
 *       required:
 *         - answer
 *         - gameId
 *         - questionId
 *         - category
 *
 *     IGameEvaluationAnswerFindDetailRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *       required:
 *         - id
 *
 *     IGameEvaluationAnswerFindAllRequest:
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
 *           example: "edukasi"
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
 * /api/v1/games/evaluations/answers:
 *   post:
 *     summary: Bulk create game evaluation answers
 *     tags: [GAME-EVALUATION-ANSWER]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/IGameEvaluationAnswerItem'
 *             required:
 *               - answers
 *           example:
 *             answers:
 *               - answer: "Puzzle membantu fokus anak"
 *                 gameId: 1
 *                 questionId: 2
 *                 category: "puzzle"
 *               - answer: "Game edukasi meningkatkan logika"
 *                 gameId: 1
 *                 questionId: 3
 *                 category: "puzzle"
 *     responses:
 *       201:
 *         description: Answers created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/games/evaluations/answers/{id}:
 *   get:
 *     summary: Get detail of a game evaluation answer by ID
 *     tags: [GAME-EVALUATION-ANSWER]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Answer detail retrieved successfully
 *       404:
 *         description: Answer not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/games/evaluations/answers:
 *   get:
 *     summary: Get all game evaluation answers
 *     tags: [GAME-EVALUATION-ANSWER]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: size
 *         in: query
 *         schema:
 *           type: integer
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *       - name: pagination
 *         in: query
 *         schema:
 *           type: boolean
 *       - name: startDate
 *         in: query
 *         schema:
 *           type: string
 *       - name: endDate
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of answers retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
