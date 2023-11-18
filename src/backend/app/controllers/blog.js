const createBlog = async (req, res, next) => {
  try {
    const { error } = validateBlog(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { title, content, slug } = req.body;
    const blog = new Blog({
      title,
      content,
      slug,
      author: req.user._id,
    });
    await blog.save();
    return res.status(201).send(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getBlogs = async (req, res, next) => {
  try {
    
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const getBlog = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateBlog = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteBlog = async (req, res, next) => {
  try {
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
};
