import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
    },
    bio: {
      tye: String,
    },
    public_repos: {
      type: String,
    },
    public_gists: {
      type: String,
    },
    followers: {
      type: Number,
      required: true,
    },
    following: {
      type: Number,
      required: true,
    },
    blog: {
      type: String,
    },
    soft_deleted: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema);

export default User;
