import User from "../models/user.models.js";
import axios from "axios";
export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,{
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      }
    );

    const userProfile = response.data;
    res.status(200).json(userProfile);
  } catch (error) {
    console.log("Error in Getting getUserProfile", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const saveProfile = async (req, res) => {
  const { username } = req.params;
  let user = await User.findOne({ username });

  if (!user) {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      });
      const gitHub = response.data;

      user = new User({
        username: gitHub.login,
        location: gitHub.location,
        blog: gitHub.blog,
        public_gists: gitHub.public_gists,
        public_repos: gitHub.public_repos,
        followers: gitHub.followers,
        following: gitHub.following,
      });

      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.log("Error in Saving userProfile", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(200).json(user);
  }
};
export const createUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await saveProfile(username);
    res.status(201).json(user);
  } catch (error) {
    console.log("Error in Creating user", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      { username },
      { soft_deleted: true }
    );
  } catch (error) {
    console.log("Error in Deleting userProfile", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { username } = req.params;
  const updates = req.body;
  try {
    const user = await User.findOneAndUpdate({ username }, updates, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    console.log("Error in Updating userProfile", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const findMutualFriends = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    const followersData = await axios.get(
      `https://api.github.com/users/${username}/followers_url`
    );
    const followingData = await axios.get(
      `https://api.github.com/users/${username}/following_url`
    );

    const followers = followersData.data.map((user) => user.login);
    const following = following.data.map((user) => user.login);

    const mutualFriend = followers.filter((follower) =>
      following.include(follower)
    );

    user.friends = mutualFriend;

    await user.save();

    res.json(mutualFriend);
  } catch (error) {
    console.log("Error in findingMutual userProfile", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
