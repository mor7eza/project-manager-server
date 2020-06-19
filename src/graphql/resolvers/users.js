const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const { SECRET_KEY } = require("../../../config");

const {
  createUserValidator,
  loginValidator
} = require("../../utils/validators");

module.exports = {
  Query: {
    login: async (_, { email, password }) => {
      const { error } = loginValidator.validate({
        email,
        password
      });
      if (error) {
        let joiErrors;
        error.details.forEach((detail) => {
          const errObj = { [detail.path[0]]: detail.message };
          joiErrors = { ...joiErrors, ...errObj };
        });
        throw new UserInputError("Bad request", {
          errors: joiErrors
        });
      }

      const user = await User.findOne({ email });
      if (!user)
        throw new UserInputError("Email not found", {
          errors: { email: "Email not found" }
        });

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        throw new UserInputError("incorrect password", {
          errors: { password: "incorrect password" }
        });

      const token = jwt.sign({ user_id: user.id }, SECRET_KEY, {
        expiresIn: "1h"
      });
      return { token };
    }
  },
  Mutation: {
    createUser: async (_, { inputUser, sysAdmin }) => {
      if (!inputUser) throw new UserInputError("Bad request");
      const { fullName, email, password, confirmPassword } = inputUser;
      const { error } = createUserValidator.validate({
        fullName,
        email,
        password,
        confirmPassword
      });

      if (error) {
        let joiErrors;
        error.details.forEach((detail) => {
          const errObj = { [detail.path[0]]: detail.message };
          joiErrors = { ...joiErrors, ...errObj };
        });
        throw new UserInputError("Bad input data", {
          errors: joiErrors
        });
      }

      if (password !== confirmPassword) {
        throw new UserInputError("Password and ConfirmPassword must match", {
          errors: {
            confirmPassword: "Passwords must match"
          }
        });
      }

      const userCheck = await User.findOne({ email });
      if (userCheck) {
        throw new UserInputError("Email is already exists", {
          errors: { email: "This email already exists" }
        });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      let user = new User({ fullName, email, password: hashedPassword });

      if (sysAdmin && sysAdmin === true) {
        user._doc = { ...user._doc, sysAdmin: true };
      }

      await user.save();

      const token = jwt.sign({ user_id: user.id }, SECRET_KEY, {
        expiresIn: "1h"
      });

      return { token };
    }
  }
};
