const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Please add a password'],
    },
    cart: {
      type: Array,
      defaut: [1],

    }
  },
  {
    timestamps: true,
  }
)

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, 'abc123', {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model('User', userSchema)

module.exports = User
