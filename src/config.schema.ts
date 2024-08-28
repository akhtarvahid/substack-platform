const Joi = require('joi'); // CommonJS

export const configValidationSchema = Joi.object({
    STAGE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required()
  })