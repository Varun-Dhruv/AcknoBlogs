const argon2 = require("argon2");
const {
  User,
  validateSignup,
  validateLogin,
  generateAuthToken,
} = require("../models/user");
const signin = async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { email, password } = req.body;
    const user = await User.findOne(
      { email: email },
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    user.password = undefined;
    const token = generateAuthToken(user);
    return res.status(200).send({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const signup = async (req, res, next) => {
  try {
    const { error } = validateSignup(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ message: "User with the given email already exists" });
    }
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    newUser.password = undefined;
    const token = generateAuthToken(newUser);
    return res.status(200).send({ user: newUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { signin, signup };
