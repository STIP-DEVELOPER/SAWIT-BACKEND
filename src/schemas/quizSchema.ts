import Joi from 'joi'

export const createQuizSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  items: Joi.array()
    .items(
      Joi.object({
        questionText: Joi.string().required(),
        options: Joi.array()
          .items(
            Joi.object({
              optionText: Joi.string().required(),
              isCorrect: Joi.boolean().required()
            }).required()
          )
          .min(1)
          .required()
      }).required()
    )
    .min(1)
    .required()
})
