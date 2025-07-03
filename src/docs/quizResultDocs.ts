/**
 * @swagger
 * components:
 *   schemas:
 *     IQuizResultCreateRequest:
 *       type: object
 *       properties:
 *         quizId:
 *           type: number
 *           example: 4
 *         score:
 *           type: number
 *           example: 2
 *       required:
 *         - quizId
 *         - score
 *
 *     IQuizResultFindAllRequest:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         size:
 *           type: integer
 *           example: 10
 *         pagination:
 *           type: boolean
 *
 *
 *     IQuizResultFindDetailRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *       required:
 *         - id
 *
 *     IQuizResultRemoveRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/IQuizResultFindDetailRequest'
 *
 *     IQuizResultUpdateRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         quizId:
 *           type: number
 *           example: 4
 *         score:
 *           type: number
 *           example: 3
 *       required:
 *         - id
 */

/**
 * @swagger
 * /api/v1/quizzes/results:
 *   post:
 *     summary: Submit quiz result after user finishes a quiz
 *     tags: [QUIZ RESULTS]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IQuizResultCreateRequest'
 *     responses:
 *       201:
 *         description: Quiz result created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/quizzes/results:
 *   get:
 *     summary: Get all quiz results with pagination
 *     tags: [QUIZ RESULTS]
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
 *         name: pagination
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of quiz results
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/quizzes/results/{id}:
 *   get:
 *     summary: Get detail quiz result by ID
 *     tags: [QUIZ RESULTS]
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
 *         description: Quiz result detail
 *       404:
 *         description: Quiz result not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/quizzes/results/{id}:
 *   patch:
 *     summary: Update quiz result (admin only)
 *     tags: [QUIZ RESULTS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IQuizResultUpdateRequest'
 *     responses:
 *       200:
 *         description: Quiz result updated successfully
 *       404:
 *         description: Quiz result not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/quizzes/results/{id}:
 *   delete:
 *     summary: Delete a quiz result (soft delete)
 *     tags: [QUIZ RESULTS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IQuizResultRemoveRequest'
 *     responses:
 *       200:
 *         description: Quiz result deleted successfully
 *       404:
 *         description: Quiz result not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
