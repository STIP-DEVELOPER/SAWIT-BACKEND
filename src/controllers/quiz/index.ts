import { createQuiz } from './create'
import { findAllQuiz } from './findAll'
import { findDetailQuiz } from './findDetail'
import { removeQuiz } from './remove'
import { updateQuiz } from './update'

export const quizController = {
  findAll: findAllQuiz,
  findByDetail: findDetailQuiz,
  create: createQuiz,
  remove: removeQuiz,
  update: updateQuiz
}
