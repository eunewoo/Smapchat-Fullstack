const UserModel = require("../database/model/UserModel");
const bcrypt = require("bcryptjs");
const admin = require("firebase-admin");

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

exports.register = async (req, res, next) => {
  try {
    const existingUser = await UserModel.findByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const userRecord = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = await UserModel.createUser(
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.avatar
    );
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

    // If email verification is required, you can check here if the user is verified
    // if (!user.isVerified) {
    //   return res.status(403).json({ message: "User not verified" });
    // }

    // Here we can create a token or session
    // For example, using JWT (JSON Web Token):
    // const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });

    // And then return the token or a success message
    // res.status(200).json({ message: "Login successful", token });

    const userWithoutPassword = { ...user, password: undefined };

    // Placeholder response for this example
    res.status(200).json({ loggedIn: true, user: userWithoutPassword });
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
