import { createGameEvaluationQuestion } from './create'
import { findAllGameEvaluationQuestion } from './findAll'
import { findDetailGameEvaluationQuestion } from './findDetail'
import { removeGameEvaluationQuestion } from './remove'
import { updateGameEvaluationQuestion } from './update'

export const gameEvaluationQuestionController = {
  findAll: findAllGameEvaluationQuestion,
  findByDetail: findDetailGameEvaluationQuestion,
  create: createGameEvaluationQuestion,
  remove: removeGameEvaluationQuestion,
  update: updateGameEvaluationQuestion
}
