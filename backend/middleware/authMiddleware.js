import jwt from "jsonwebtoken";
import User from "../Models/user-model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; //extract bearer token

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); //attach user info to request
    next(); //continue to next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token or expired token" });
  }
};
