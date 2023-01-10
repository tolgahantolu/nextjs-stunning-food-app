import categorySchema from "../../models/category.js";
import foodSchema from "../../models/food.js";
import userSchema from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    getFoods: async () => {
      try {
        const allFoods = await foodSchema.find();
        return allFoods;
      } catch (error) {
        //throw new Error(error.message);
        console.log(error.message);
      }
    },
    getFood: async (_, { foodId }) => {
      try {
        const getFood = await foodSchema.findById(foodId);
        return getFood;
      } catch (error) {
        //throw Error(error.message);
        console.log(error.message);
      }
    },
    getCategories: async () => {
      try {
        const allCategories = await categorySchema.find();
        return allCategories;
      } catch (error) {
        //throw Error(error.message);
        console.log(error.message);
      }
    },
    getUser: async (_, { userId }) => {
      try {
        const getUser = await userSchema.findById(userId);
        return getUser;
      } catch (error) {
        //throw Error(error.message);
        console.log(error.message);
      }
    },
  },
  Mutation: {
    registerUser: async (
      _,
      { registerInput: { name, surname, email, password } }
    ) => {
      const oldUser = userSchema.findOne({ email });

      if (oldUser) {
        throw new Error("Email is already in use: " + email);
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new userSchema({
        name,
        surname,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        {
          user_id: newUser._id,
          email,
        },
        "NEW USER",
        {
          algorithm: "HS512",
          expiresIn: "10h",
        }
      );

      newUser.token = token;

      // !SAVE
      const res = newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};

export default resolvers;
