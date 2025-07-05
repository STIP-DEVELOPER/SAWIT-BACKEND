import { createQuizResult } from './create'
import { findAllQuizResult } from './findAll'
import { findDetailQuizResult } from './findDetail'
import { removeQuizResult } from './remove'
import { updateQuizResult } from './update'

export const quizResultController = {
  findAll: findAllQuizResult,
  findByDetail: findDetailQuizResult,
  create: createQuizResult,
  remove: removeQuizResult,
  update: updateQuizResult
}
