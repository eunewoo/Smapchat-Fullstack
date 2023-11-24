const mongodb = require("mongodb");
const UserSchema = require("../schema/User.js");
const bcrypt = require("bcryptjs");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

class UserModel {
  static async findAll() {
    const users = await UserSchema.find({}, "_id").exec();
    return users;
  }

  static async findByEmail(email) {
    return await UserSchema.findOne({ email: email }).exec();
  }

  static async findByID(id) {
    return await UserSchema.findOne({_id: id});
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
    const userId = newUser._id.toString();

    // Creating a new object with the desired structure
    const user = {
      userId: userId,
      email: newUser.email,
      username: newUser.username,
      avatar: newUser.avatar,
      isActive: newUser.isActive,
      mapList: newUser.mapList || [],
      userType: newUser.userType,
      isVerified: newUser.isVerified,
    };

    return user;
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
    return await UserSchema.findByIdAndDelete(userId);
  }

  static async findByIdAndUpdate(userId, updatedData, options) {
    try {
      const updatedUser = await UserSchema.findOneAndUpdate(
        { _id: new mongodb.ObjectId(userId) },
        { $set: updatedData },
        options,
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

  static async recoverPasswordByEmail(email) {
    try {
      const user = await UserSchema.findOne({ email: email }).exec();
      console.log("exist", user);
      if (!user) {
        throw new Error("User not found");
      }

      const resetLink = await admin.auth().generatePasswordResetLink(email);
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      };

      const info = transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // console.log("error in transporter: ", error);
          throw error;
        } else {
          // console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.error("Error in recoverPasswordByEmail:", error);
      throw error;
    }
  }
}

module.exports = UserModel;
