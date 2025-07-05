import type { Express } from 'express'
import appCheckRoutes from './appCheck.routes'
import userRoutes from './user.routes'
import quizRoutes from './quiz.routes'
import quizResultRoutes from './quizResult.routes'
import authRoutes from './auth.routes'
import moduleRoutes from './module.routes'
import puzzleGameRoutes from './puzzleGame.routes'
import gameEvaluationQuestionRoutes from './gameEvaluationQuestion.routes'
import gameEvaluationAnswerRoutes from './gameEvaluationAnswer.routes'
import myProfileRoutes from './myProfile.routes'

export const appRouterV1 = (app: Express): void => {
  app.use('/api/v1', appCheckRoutes)
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/quizzes', quizRoutes)
  app.use('/api/v1/quizzes/results', quizResultRoutes)
  app.use('/api/v1/modules', moduleRoutes)
  app.use('/api/v1/games/puzzles', puzzleGameRoutes)
  app.use('/api/v1/games/evaluations/questions', gameEvaluationQuestionRoutes)
  app.use('/api/v1/games/evaluations/answers', gameEvaluationAnswerRoutes)
  app.use('/api/v1/my-profiles', myProfileRoutes)
}
