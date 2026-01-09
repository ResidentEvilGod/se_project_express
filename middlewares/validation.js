const { celebrate, Joi, Segments } = require('celebrate');

const urlSchema = Joi.string().uri({ scheme: ['http', 'https'] });

const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: urlSchema.required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: urlSchema.required(),
  }),
});

const validateItemId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

const validateCreateItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    weather: Joi.string().valid('hot', 'warm', 'cold').required(),
    imageUrl: urlSchema.required(),
  }),
});

const validateUpdateItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    weather: Joi.string().valid('hot', 'warm', 'cold').required(),
    imageUrl: urlSchema.required(),
  }),
});

module.exports = {
  validateSignin,
  validateSignup,
  validateUpdateProfile,
  validateItemId,
  validateCreateItem,
  validateUpdateItem,
};

