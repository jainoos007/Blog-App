import User from "../Models/User";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.error(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.json({ users: users });
};
