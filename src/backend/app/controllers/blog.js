const { Blog } = require("../models/blog");
const { validateBlog } = require("../models/blog");
const fs = require("fs");
const path = require("path");

const createBlog = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file provided" });
    }
    // Assuming you have a 'static' folder where you want to save the file
    const staticFolderPath = path.join(__dirname, "../static/images");
    // Create the folder if it doesn't exist
    if (!fs.existsSync(staticFolderPath)) {
      fs.mkdirSync(staticFolderPath);
    }
    // Get the file name and path where you want to save it
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const filePath = path.join(staticFolderPath, fileName);
    // Use fs.writeFile to save the file
    fs.writeFile(filePath, req.file.buffer, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: "Error saving the file" });
      }
      let blog = {
        ...req.body,
        image: fileName,
        author: req.user._id.toString(),
      };
      const { error } = validateBlog(blog);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
      const newBlog = await Blog(blog).save();
      // Perform other actions like saving to the database or sending a response
      return res.status(201).send({ message: "Blog created", blog: newBlog });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getBlogs = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 6;

    const blogs = await Blog.find()
      .populate("author", "-password")
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).send(blogs);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author", "-password");
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    return res.status(200).send(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getBlogByAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogs = await Blog.find({ author: id }).populate(
      "author",
      "-password"
    );
    return res.status(200).send(blogs);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateBlog = async (req, res, next) => {
  try {
    let updateBlog = {};
    if (req.file) {
      let staticFolderPath = path.join(__dirname, "../static/images");
      // Get the file name and path where you want to save it
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const filePath = path.join(staticFolderPath, fileName);
      // Use fs.writeFile to save the file
      await fs.promises.writeFile(filePath, req.file.buffer);
      let blog = {
        ...req.body,
        image: fileName,
      };
      const newBlog = await Blog.findOneAndUpdate({ _id: req.body.id }, blog, {
        returnOriginal: false,
      });
      // Perform other actions like saving to the database or sending a response
      console.log(newBlog);
      return res.status(201).send({ message: "Blog updated", blog: newBlog });
    } else if (req.body) {
      updateBlog = await Blog.findOneAndUpdate({ _id: req.body.id }, req.body, {
        returnOriginal: false,
      });
      return res.status(200).send({ message: "Blog updated", blog: newBlog });
    }
    return res.status(400).send({ message: "No data to update" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    return res.status(200).send({ message: "Blog deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getBlogByAuthor,
};
