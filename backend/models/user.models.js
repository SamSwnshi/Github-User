import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar_url: {
      type: String,
    },
    repos_url:{
      type: String,
    },
    url: {
      type: String,
    },
    html_url: {
      type: String,
    },
    followers_url: {
      type: String,
    },
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
    public_repos: {
      type: Number,
    },
    public_gists: {
      type: Number,
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

const User = mongoose.model("User", userSchema);

export default User;
