const express = require("express");
const multer = require("multer");
const {
  createBlog,
  getBlogs,
  updateBlog,
  getBlog,
  deleteBlog,
  getBlogByAuthor,
} = require("../controllers/blog");
const passport = require("../strategy/jwtStrategy");
const router = express.Router();

router.get("/", getBlogs);

router.get("/author", getBlogByAuthor);

router.get("/:id", getBlog);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  multer().single("image"),
  createBlog
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  multer().single("image"),
  updateBlog
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteBlog
);

module.exports = router;
