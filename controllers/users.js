const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
  DEFAULT_ERROR,
  DUPLICATE_KEY_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(BAD_REQUEST).send({ message: "Invalid data passed." });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      // `select: false` doesn't apply to newly created docs, so remove password manually
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(201).send(userObj);
    })
    .catch((err) => {
      console.error(err);

      if (err.code === DUPLICATE_KEY_ERROR_CODE) {
        return res
          .status(CONFLICT)
          .send({ message: "A user with this email already exists" });
      }

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }

      return res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(BAD_REQUEST).send({ message: "Invalid data passed." });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);

      if (err.statusCode === UNAUTHORIZED) {
        return res.status(UNAUTHORIZED).send({ message: err.message });
      }

      return res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const getCurrentUser = (req, res) =>
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user id" });
      }

      return res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;

  // Only allow updating name and avatar
  const updateData = {};
  if (typeof name === "string") updateData.name = name;
  if (typeof avatar === "string") updateData.avatar = avatar;

  if (Object.keys(updateData).length === 0) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Invalid data passed to update profile" });
  }

  return User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }

      return res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
