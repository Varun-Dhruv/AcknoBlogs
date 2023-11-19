const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    timestamps: true,
  }
);

const generateAuthToken = (payload) => {
  const token =
    "Bearer " +
    jwt.sign(JSON.parse(JSON.stringify(payload)), process.env.JWTPRIVATEKEY, {
      expiresIn: "7d",
    });
  return token;
};

const validateSignup = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("firstName"),
    lastName: Joi.string().required().label("lastName"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("password")
  });
  return schema.validate(data);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, generateAuthToken, validateSignup, validateLogin };
