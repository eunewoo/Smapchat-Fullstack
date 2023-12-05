const UserModel = require("../database/model/UserModel");
const bcrypt = require("bcryptjs");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const RatingModel = require("../database/model/RatingModel");
const CommentModel = require("../database/model/CommentModel");
const MapModel = require("../database/model/MapModel");

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

exports.session = async (req, res) => {
  if (req.user) {
    var sessionUser = await UserModel.findByID(req.user);
    sessionUser.password = undefined;

    return res.status(201).json({ loggedIn: true, user: sessionUser });
  } else {
    return res.status(200).json({ loggedIn: false, user: null });
  }
};

exports.register = async (req, res, next) => {
  try {
    const existingUser = await UserModel.findByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    /*
    const userRecord = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });*/

    const newUser = await UserModel.createUser(
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.avatar
    );

    const token = jwt.sign(
      { id: newUser._id },
      "asd12341254sFt1tHDSy75367GDwe4ty2352eFDSFTwet",
      { expiresIn: "24h" }
    );
    res.cookie("authentication", token, { httpOnly: false, secure: false });

    res.status(201).json({ loggedIn: true, user: newUser });
  } catch (error) {
    console.error(error);
    if (error.code === "auth/email-already-in-use") {
      return res
        .status(400)
        .json({ message: "Email already in use in Firebase" });
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await UserModel.findByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // TODO: Change secret
    const token = jwt.sign(
      { id: user._id },
      "asd12341254sFt1tHDSy75367GDwe4ty2352eFDSFTwet",
      { expiresIn: "24h" }
    );
    res.cookie("authentication", token, { httpOnly: false, secure: false });

    user.password = undefined;

    res.status(200).json({ loggedIn: true, user: user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("authentication", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out!" });
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.updateProfile(req.params.Id, req.body);
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
    const user = await UserModel.findByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // delete user's rating
    await RatingModel.deleteRate(user._id);

    // delete user's comments and  maps
    const maps = await MapModel.getUserMaps("date", 1, null, user._id);
    // console.log("deleteUser map", maps);
    for (const map of maps) {
      const comments = await CommentModel.getCommentByMapId(map._id, 1, null);
      for (const comment of comments) {
        await CommentModel.deleteComment(comment._id);
      }
      await MapModel.deleteMap(map._id, user._id);
    }

    // Then delete the user
    await UserModel.deleteUserById(user._id);

    res.status(200).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    await UserModel.recoverPasswordByEmail(req.body.email);
    res
      .status(200)
      .json({ successMessage: "Password recovery email sent successfully." });
  } catch (error) {
    console.error(error);
    if (error.message === "User not found") {
      res.status(404).json({ errorMessage: "User not found" });
    } else {
      res
        .status(500)
        .json({ errorMessage: "An error occurred during password recovery." });
    }
  }
};

exports.verifyResetCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const isCodeValid = await UserModel.verifyResetPasswordCode(email, code);

    if (isCodeValid) {
      res.status(200).json({
        successMessage: "Reset code verified successfully.",
        email: email,
      });
    } else {
      // This case might not be reached due to the method throwing errors instead
      res.status(400).json({ errorMessage: "Invalid or expired reset code." });
    }
  } catch (error) {
    console.error(error);
    switch (error.message) {
      case "User not found":
        res.status(404).json({ errorMessage: "User not found" });
        break;
      case "Invalid reset code":
        res.status(400).json({ errorMessage: error.message });
        break;
      case "Reset Password Code has expired":
        res.status(400).json({ errorMessage: error.message });
        break;
      default:
        res.status(500).json({
          errorMessage: "An error occurred during code verification.",
        });
    }
  }
};

exports.updatePasswordWithCode = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;

    const result = await UserModel.updatePasswordByCode(
      email,
      code,
      newPassword
    );

    if (result) {
      res
        .status(200)
        .json({
          successMessage: "Password updated successfully.",
          email: email,
        });
    } else {
      // This branch might not be reached if errors are thrown in the method
      res.status(400).json({ errorMessage: "Unable to update password." });
    }
  } catch (error) {
    console.error(error);
    switch (error.message) {
      case "User not found":
        res.status(404).json({ errorMessage: "User not found" });
        break;
      case "Reset Password Code has expired":
      case "Invalid reset code":
        res.status(400).json({ errorMessage: error.message });
        break;
      default:
        res
          .status(500)
          .json({ errorMessage: "An error occurred during password update." });
    }
  }
};
