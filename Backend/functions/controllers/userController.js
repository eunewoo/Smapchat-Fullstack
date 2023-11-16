const UserModel = require("../database/model/UserModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findByID(req.params.Id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getUserByEmail = async (req, res, next) => {
  try {
    const user = await UserModel.findByEmail(req.params.Email);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await UserModel.createUser(
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.avatar
    );
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.updateProfile(
      req.params.Id,
      req.body.updatedData
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateUserActivation = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.updateActivationStatus(
      req.params.Id,
      req.body.isActive
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await UserModel.deleteUserById(req.params.Id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
