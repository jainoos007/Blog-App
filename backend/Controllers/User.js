import User from "../Models/User.js";

//get all users info
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
    console.log(users);
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

//create a new user profile
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check for existing user with same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Create a new user
    const newUser = new User({ name, email, password });

    //save the user to the database
    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log("Error creating user", err);
    return res.status(404).json({ message: "internal server error" });
  }
};
