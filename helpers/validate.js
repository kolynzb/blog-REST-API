const joi = require("joi");

const registerCheck = (data) => {
  const schema = joi
    .object({
      username: joi.string().min(3).max(25).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    })
    .unknown(); //allows other things to come through unauthenticated
  return schema.validate(data);
};

const loginCheck = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const updateCheck = (data) => {
  const schema = joi.object({
    name: joi.string().min(6),
    email: joi.string().email(),
  });
  return schema.validate(data);
};
module.exports = { registerCheck, loginCheck, updateCheck };
