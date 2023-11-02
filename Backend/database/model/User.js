import mongodb from 'mongodb';
import UserModel from '../schema/User.js';
import bcrypt from "bcryptjs";

class User {
  static async findByEmail(email) {
    return await UserModel.findOne({ 'email' : email }).exec();
  }

  static async findByID(id) {
    const value = await UserModel.findOne({ '_id' : new mongodb.ObjectId(id) }).exec();
    return value;
  }

  static async createUser(email, username, password, avatar) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
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
    return await findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    );
  }

  static async deleteUserById(userId) {
    return await findByIdAndDelete(userId);
  }
}

export default User;
