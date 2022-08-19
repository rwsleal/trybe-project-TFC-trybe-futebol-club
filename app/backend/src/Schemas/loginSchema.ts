import * as Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().not().empty()
    .required(),
  password: Joi.string().min(7).not().empty()
    .required(),
}).messages({
  'string.required': '400|All fields must be filled',
  'string.empty': '400|All fields must be filled',
  'string.email': '401|Incorrect email or password',
  'string.min': '401|Incorrect email or password',
});
