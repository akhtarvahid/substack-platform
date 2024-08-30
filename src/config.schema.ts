const Joi = require('joi'); // CommonJS

export const configValidationSchema = Joi.object({
    STAGE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.string().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    JWT_SECRET: Joi.string().required()
  })