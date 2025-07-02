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
 *             $ref: '#/components/schemas/IQuizQuestionWithOptionalId'
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
 *     IQuizQuestionWithOptionalId:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         questionText:
 *           type: string
 *           example: "Apa itu variabel?"
 *         options:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IQuizOptionWithOptionalId'
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
 *
 *     IQuizOptionWithOptionalId:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         optionText:
 *           type: string
 *           example: "Penampung nilai"
 *         isCorrect:
 *           type: boolean
 *           example: true
 */
