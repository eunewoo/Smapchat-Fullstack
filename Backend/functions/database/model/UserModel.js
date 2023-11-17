const mongodb = require('mongodb');
const UserSchema = require('../schema/User.js');
const bcrypt = require("bcryptjs");

class UserModel {
  static async findAll() {
    const users = await UserSchema.find({}, "_id").exec();
    return users;
  }

  static async findByEmail(email) {
    return await UserSchema.findOne({ email: email }).exec();
  }

  static async findByID(id) {
    const value = await UserSchema.findOne({
      _id: new mongodb.ObjectId(id),
    }).exec();
    return value;
  }

  static async createUser(email, username, password, avatar) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserSchema({
      email,
      username,
      password: hashedPassword,
      avatar,
    });
    await newUser.save();
    return newUser;
  }

  static async updateProfile(userId, updatedData) {
    // This function assumes updatedData is an object containing the fields to be updated
    return findByIdAndUpdate(userId, updatedData, { new: true });
  }

  static async verifyCode(userId, code) {
    const user = await findById(userId);
    if (!user) throw new Error("User not found");

    if (user.verificationCode === code) {
      user.isVerified = true;
      user.verificationCode = null; // Clear the verification code
      await user.save();
      return true;
    }
    return false;
  }

  static async updateActivationStatus(userId, isActive) {
    return await findByIdAndUpdate(userId, { isActive }, { new: true });
  }

  static async deleteUserById(userId) {
    return await findByIdAndDelete(userId);
  }

  static async findByIdAndUpdate(userId, updatedData, options) {
    try {
      const updatedUser = await UserSchema.findOneAndUpdate(
        { _id: new mongodb.ObjectId(userId) },
        { $set: updatedData },
        options
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    } catch (error) {
      console.error("Error updating user by ID:", error);
      throw new Error(error.message);
    }
  }
}

module.exports = UserModel;
