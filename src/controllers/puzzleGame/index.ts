import { createPuzzleGame } from './create'
import { findAllPuzzleGame } from './findAll'
import { findDetailPuzzleGame } from './findDetail'
import { removePuzzleGame } from './remove'
import { updatePuzzleGame } from './update'

export const puzzleGameController = {
  findAll: findAllPuzzleGame,
  findByDetail: findDetailPuzzleGame,
  create: createPuzzleGame,
  remove: removePuzzleGame,
  update: updatePuzzleGame
}
