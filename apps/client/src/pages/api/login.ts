// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import User from "../../lib/usermodel"; // Import the User model
import mongoose from "mongoose";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key";

// Check if there is an existing connection, otherwise establish a connection
if (mongoose.connection.readyState === 0) {
  mongoose.connect(
    "mongodb+srv://harsh:harsh131120@cluster0.qvbje4n.mongodb.net/" || ""
  );
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    // Find the correct user using the User model
    const user = await User.findOne({ email });

    if (!user || !validatePassword(password, user.salt, user.hash)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, passwordHash: user.hash },
      secretKey
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to validate password using bcrypt
const validatePassword = (
  password: string,
  salt: string,
  passwordHash: string
): boolean => {
  const formattedSalt = `$2b$${salt}`;
  const hashedPassword = bcrypt.hashSync(password, formattedSalt);
  return hashedPassword === passwordHash;
};
