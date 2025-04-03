import User from "../Models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//generate token
const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "12h" });
};

//get all users info || api/user
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

//create a new user || api/user/signup
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

    //generate token
    const token = generateToken(newUser._id, newUser.email);

    res.status(200).json({ message: "User created successfully", token });
  } catch (err) {
    console.log("Error creating user", err);
    return res.status(404).json({ message: "Internal server error" });
  }
};

//login an existing user || api/user/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    //generate token
    const token = generateToken(user._id, user.email);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    console.log("Error checking user", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//updat user by ID || api/user/update/id
export const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, email, password } = req.body;

    let updateFiels = { name, email };

    if (password) {
      //hash the password
      const hashedPasword = await bcrypt.hash(password, 10);
      updateFiels.password = hashedPasword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFiels, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //generate token
    const token = generateToken(updatedUser._id, updatedUser.email);
    return res
      .status(200)
      .json({ message: "User updated successfully", token, user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
