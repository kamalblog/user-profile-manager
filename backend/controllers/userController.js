import db from "../db/lowdb.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, fullname, country, password } = req.body;

    if (!name || !email || !phone || !fullname || !country || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await db.read();

    const existingUser = db.data.users.find(
      (u) => u.email === email || u.phone === phone
    );

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      fullname,
      country,
      password: hashedPassword,
    };

    db.data.users.push(newUser);
    await db.write();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, name, email, phone, fullname, country },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    await db.read();

    const user = db.data.users.find((u) => u.email === email);

    if (!user)
      return res.status(401).json({ message: "User not found. Please register first." });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: `Welcome back, ${user.fullname}!`,
      token,
      user: { id: user.id, name: user.name, email: user.email, country: user.country },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    await db.read();
    const users = db.data.users.map(({ password, ...rest }) => rest);

    res.status(200).json({
      message: "All users fetched successfully",
      total: users.length,
      users,
    });
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
