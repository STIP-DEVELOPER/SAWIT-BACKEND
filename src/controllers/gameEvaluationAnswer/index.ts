import { createGameEvaluationAnswer } from './create'
import { findAllGameEvaluationAnswer } from './findAll'
import { findDetailGameEvaluationAnswer } from './findDetail'

export const gameEvaluationAnswerController = {
  findAll: findAllGameEvaluationAnswer,
  findByDetail: findDetailGameEvaluationAnswer,
  create: createGameEvaluationAnswer
}
