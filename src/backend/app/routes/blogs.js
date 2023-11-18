const express = require("express");
const multer = require("multer");
const {
  createBlog,
  getBlogs,
  updateBlog,
  getBlog,
  deleteBlog,
} = require("../controllers/blog");
const passport = require("../strategy/jwtStrategy");
const router = express.Router();

router.get("/", getBlogs);

router.get("/:id", getBlog);

router.post("/", passport.authenticate("jwt", { session: false }), createBlog);

router.patch("/", passport.authenticate("jwt", { session: false }), updateBlog);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteBlog
);
