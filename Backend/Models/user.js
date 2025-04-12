const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },

  aadharnumber: {
    type: Number,
    required: true,
  },

  phone: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },

  isVoted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  // when user not creates new user or modified his own password the next() function is called and not hashing is done
  if (!user.isModified("password")) return next();
  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hashedPassword = await bcrypt.hash(user.password, salt);
    // assign hashed password to simple text password
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
