import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

const registerController = async (req, res) => {
  let { email, username, password, DOB } = req.body;
  try {
    email = email?.trim().toLowerCase();
    username = username?.trim();

    if (!email || !username || !password || !DOB)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashPassword,
      DOB,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default registerController;
