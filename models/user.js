const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hashed_password: {
      type: String,
      required: true,
      minlength: 8,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// adding virtual and method to schema

userSchema
  .virtual("password")
  .set((password) => {
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

userSchema.methods = {
  encryptPassword: (password) => {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
