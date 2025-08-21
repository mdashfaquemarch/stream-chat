import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { Config } from "../config/server-config.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    avatar: {
      type: String,
    }, 
    role: { type: String, enum: ['admin'], default: 'admin' }
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  user.avatar = `https://robohash.org/${user.name}`;

  // if (!this.isModified("password")) return next();
  // user.password = bcrypt.hashSync(this.password, 10);
  next();
});


userSchema.methods.generateAccessToken = async function(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    Config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: Config.ACCESS_TOKEN_EXPIRY,
      algorithm: "HS256"
    }
  )
}

const User = mongoose.model("User", userSchema);

export default User;
