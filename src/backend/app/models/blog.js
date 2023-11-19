const mongoose = require("mongoose");
const Joi = require("joi");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    content: String,
    slug: String,
    author: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const validateBlog = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().label("title"),
    image: Joi.string().required().label("image"),
    content: Joi.string().required().label("content"),
    description: Joi.string().required().label("description"),
    slug: Joi.string().required().label("slug"),
    author: Joi.string().hex().length(24),
  });
  return schema.validate(data);
};

const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog, validateBlog };
