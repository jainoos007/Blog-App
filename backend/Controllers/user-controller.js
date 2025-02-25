import User from "../Models/user-model.js";
import bcrypt from "bcrypt";

//get all users info
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

//create a new user
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check for existing user with same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash the password
    const hashedPasword = await bcrypt.hash(password, 10);

    //Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPasword,
      blogs: [],
    });

    //save the user to the database
    try {
      await newUser.save();
    } catch (err) {
      console.log("Error saving user to database", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log("Error creating user", err);
    return res.status(404).json({ message: "internal server error" });
  }
};

//login an existing user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", data: user });
  } catch (err) {
    console.log("Error checking user", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
